// SPDX-License-Identifier: MTI
pragma solidity >=0.7.0 <0.9.0;

import "./NFTSubscriptionPlans.sol";

contract Predicta {
    NFTSubscriptionPlans private nftsubscriptionplans;
    address private ContractOwner;
    address private predictatokenaddress;
    uint256 CurrentEventId;
    mapping (address => mapping (uint256 => uint256)) private MaxVotesPerUsers; // user address > his plan id (basic or intermediate or premium) > count of votes
    mapping (address => mapping (uint256 => bool)) private IsVoted; // user address > Event id > is voted or not 
    mapping (address => mapping (uint256 => bool)) private IsCreatedThatEvent; // user address > Event id >  is created that event or not
    mapping (uint256 => address []) private UsersVotedYes;  // Event id > array of user address
    mapping (uint256 => address []) private UsersVotedNo;   // Event id > array of user address

    constructor (address _NFTSubscriptionPlansAddress , address _PredictaTokenAddress){
        nftsubscriptionplans = NFTSubscriptionPlans(_NFTSubscriptionPlansAddress);
        predictatokenaddress = _PredictaTokenAddress;
        ContractOwner = msg.sender;
    }   
    struct Event {
        address EventCreator;
        uint256 EventId;
        string EventName;
        string EventDescription;
        uint256 EventCategory; // 1 for financial   2 for sport   3 for social 
        uint256 YesVotes;
        uint256 NoVotes;
        bool IsEnded;
    }

    Event []  Events;

    // Function to create events 
    // Owner of contract can create the events 
    // Premium Users only can also create events.
    function CreateEvent (string memory _EventName , string memory _EventDescription , uint256 _EventCategory) public {
        // Check the caller is a premium user or not
        address CallerAddress = msg.sender;
        require ( nftsubscriptionplans.GetNFTCategoryOfSpecificUser(CallerAddress) == 3 , "YOu have to be contract owner or premium user to create events"); 
        CurrentEventId ++;
        Event memory newevent = Event (msg.sender,CurrentEventId,_EventName,_EventDescription,_EventCategory,0,0,false);
        Events.push(newevent);
        IsCreatedThatEvent[msg.sender][CurrentEventId]= true;

    }

    // Function resposnsible for ending events, leaderboard, and sending rewards to users who voted correctly
    function EndEvent (uint256 _EventId, uint256 _EventCorrectVote) public {
        // _EventCorrectVote is 0 or 1 : 0 for No  or  1 for Yes
        require (IsCreatedThatEvent[msg.sender][_EventId] == true , "You could not end that event, you are not the event's creator");
        for (uint256 i = 0 ; i < Events.length ; i++){
            Event storage CurrentEvent = Events[i];
            if (CurrentEvent.EventId == _EventId ){
                require (CurrentEvent.IsEnded == false , "You can not end an ended event");
                CurrentEvent.IsEnded = true;
            }
        }
        // If correct vote is NO
        if (_EventCorrectVote == 0 ){
            address [] memory usersvotedno = UsersVotedNo[_EventId];
            for (uint256 i = 0 ; i < usersvotedno.length ; i++ ){
                address UserAddress = usersvotedno[i];
                // If Basic user 
                if (nftsubscriptionplans.GetNFTCategoryOfSpecificUser(UserAddress) == 1){
                    IERC20(predictatokenaddress).transfer(UserAddress,10 * 10**18);
                }
                // If Intermediate user 
                if (nftsubscriptionplans.GetNFTCategoryOfSpecificUser(UserAddress) == 2){
                    IERC20(predictatokenaddress).transfer(UserAddress,20 * 10**18);
                }
                // If Premium user 
                if (nftsubscriptionplans.GetNFTCategoryOfSpecificUser(UserAddress) == 3){
                    IERC20(predictatokenaddress).transfer(UserAddress,30 * 10**18);
                }
            }
        }
        // If correct vote is Yes
        if (_EventCorrectVote == 1 ){
            address [] memory usersvotedyes = UsersVotedYes[_EventId];
                       for (uint256 i = 0 ; i < usersvotedyes.length ; i++ ){
                address UserAddress = usersvotedyes[i];
                // If Basic user 
                if (nftsubscriptionplans.GetNFTCategoryOfSpecificUser(UserAddress) == 1){
                    IERC20(predictatokenaddress).transfer(UserAddress,10 * 10**18);
                }
                // If Intermediate user 
                if (nftsubscriptionplans.GetNFTCategoryOfSpecificUser(UserAddress) == 2){
                    IERC20(predictatokenaddress).transfer(UserAddress,20 * 10**18);
                }
                // If Premium user 
                if (nftsubscriptionplans.GetNFTCategoryOfSpecificUser(UserAddress) == 3){
                    IERC20(predictatokenaddress).transfer(UserAddress,30 * 10**18);
                }
            }
            
        }
    }

    // Function to vote on events 
    function VoteOnEvents (uint256 _EventId, uint256 _YesOrNo) public {
        // _EventId is the event id 
        // _YesOrNo is 1 or 0
        address CallerAddress = msg.sender;
        require ( nftsubscriptionplans.GetNFTCategoryOfSpecificUser(CallerAddress) == 1 || nftsubscriptionplans.GetNFTCategoryOfSpecificUser(CallerAddress) == 2 || nftsubscriptionplans.GetNFTCategoryOfSpecificUser(CallerAddress) == 3 , "You need to subscribe on predicta to vote on events");
        // if basic user
        require(IsVoted[msg.sender][_EventId] == false,"You have voted on that event before");
        for (uint256 i=0 ; i< Events.length ; i++){
            if (Events[i].EventId == _EventId){
               require ( Events[i].IsEnded == false ,"the event is ended");
                Event storage TargetEvent = Events[i];
                // Basic users
                if (nftsubscriptionplans.GetNFTCategoryOfSpecificUser(CallerAddress) == 1){
                    require(MaxVotesPerUsers[msg.sender][1] <= 5, "Basic user can only vote 5 votes on events");
                    // Basic users have voting power of 1
                    if (_YesOrNo == 0){
                        TargetEvent.NoVotes ++ ;
                        UsersVotedNo[_EventId].push(msg.sender);
                    }
                    if (_YesOrNo == 1){
                        TargetEvent.YesVotes ++ ;
                        UsersVotedYes[_EventId].push(msg.sender);
                    }
             
                    MaxVotesPerUsers[msg.sender][1] ++;
                    
                }
                // Intermediate users
                if (nftsubscriptionplans.GetNFTCategoryOfSpecificUser(CallerAddress) == 2){
                    require(MaxVotesPerUsers[msg.sender][2] <= 10, "Intermediate user can only vote 10 votes on events");
                    // Intermediate users have voting power of 2
                    if (_YesOrNo == 0){
                        TargetEvent.NoVotes = TargetEvent.NoVotes + 2 ;
                        UsersVotedNo[_EventId].push(msg.sender);
                    }
                    if (_YesOrNo == 1){
                        TargetEvent.YesVotes = TargetEvent.YesVotes + 2 ;
                        UsersVotedYes[_EventId].push(msg.sender);
                    }
                    MaxVotesPerUsers[msg.sender][2] ++;
                }
                // Premium users
                if (nftsubscriptionplans.GetNFTCategoryOfSpecificUser(CallerAddress) == 3){
                    require(MaxVotesPerUsers[msg.sender][1] <= 20, "Premium user can only vote 20 votes on events");
                    // Premium users have voting power of 3
                    if (_YesOrNo == 0){
                        TargetEvent.NoVotes = TargetEvent.NoVotes + 3 ;
                        UsersVotedNo[_EventId].push(msg.sender);
                    }
                    if (_YesOrNo == 1){
                        TargetEvent.YesVotes = TargetEvent.YesVotes + 3  ;
                        UsersVotedYes[_EventId].push(msg.sender);
                    }
                    MaxVotesPerUsers[msg.sender][3] ++;
                }
            }
        }
        IsVoted[msg.sender][_EventId] = true;
    }

    // Function to get the Events array
    function GetAllEvents () public view returns (Event [] memory){
        return Events;
    }

}
