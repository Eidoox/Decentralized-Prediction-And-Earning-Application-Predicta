// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTSubscriptionPlans is ERC721URIStorage{
    // TokenURI of each category
    string private BasicTokenURI;
    string private IntermediateTokenURI;
    string private PremiumTokenURI;

    // Predicta token address
    address PredictaTokenAddress;

    // Minting Fees
    uint256 BasicMintingFees = 20 * 10**18;
    uint256 IntermediateMintingFees = 50 * 10**18;
    uint256 PremiumMintingFees = 100 * 10**18;

    mapping (uint256 => string) private NFTsCategoriesNames; // category id > category names
    mapping (address => uint256) private NFTOwnedPerUser; //address > cateogry id
    mapping (address => mapping (uint256 => uint256)) private MaxPerCatoegoryOfOneUser; // maximum of minting nfts per category of one user is 1
    mapping (uint256 => uint256) private CountUsersPerCategory; // cateogry id > Count of users
    mapping (address => uint256) private OwnedNFT; // user address > NFT token id
    uint256 currentNFTid;
    constructor (string memory _categoryone, string memory _categorytwo , string memory _categorythree , address _PredictaTokenAddress ) ERC721 ("NFTAuthenticationAuthorization","NFTAA"){
        NFTsCategoriesNames[1] = _categoryone;  //  Basic user
        NFTsCategoriesNames[2] = _categorytwo; // Intermediate user
        NFTsCategoriesNames[3] = _categorythree; // Premium user
        BasicTokenURI= "https://ipfs.io/ipfs/bafyreiebj6o3hfslbiwwb6gofhbe6p6qk7plhqpn4xxxftnnlxd7vccyam/metadata.json";
        IntermediateTokenURI= "https://ipfs.io/ipfs/bafyreihntmxssaalewqqqvj2aq7hsoimyari2zlsjb5qnajuf6obf3rkn4/metadata.json";
        PremiumTokenURI= "https://ipfs.io/ipfs/bafyreigfobdkn6a2idrbaqs2vyhuvvdvdlbsbl2bpard3lnz7hv2v7htx4/metadata.json";
        PredictaTokenAddress = _PredictaTokenAddress;
    }

    // Minting NFT function
    function MintNFT (uint256 _categoryid) public {
        require (_categoryid >= 1 && _categoryid <=3,"Wrong category id");
        currentNFTid ++;
        // Basic
        if (_categoryid == 1){
            require (MaxPerCatoegoryOfOneUser[msg.sender][2] == 0 && MaxPerCatoegoryOfOneUser[msg.sender][3] == 0 , "You have already in another plan, why you need the basic ?");
            require(MaxPerCatoegoryOfOneUser[msg.sender][1] < 1 , "User should have one nft per category (Basic)");
            IERC20(PredictaTokenAddress).transferFrom(msg.sender, address(this), BasicMintingFees);
            _safeMint(msg.sender, currentNFTid);
            _setTokenURI(currentNFTid, BasicTokenURI);
            NFTOwnedPerUser[msg.sender] = 1;
            OwnedNFT[msg.sender] = currentNFTid;
            MaxPerCatoegoryOfOneUser[msg.sender][1] ++;
            CountUsersPerCategory[1] ++;
        } 
        // Intermediate
        if (_categoryid == 2){
            require (MaxPerCatoegoryOfOneUser[msg.sender][1] == 0 && MaxPerCatoegoryOfOneUser[msg.sender][3] == 0 , "You have already in another plan, why you need the Intermediate ?");
            require(MaxPerCatoegoryOfOneUser[msg.sender][2] < 1 , "User should have one nft per category (Intermediate)");
            IERC20(PredictaTokenAddress).transferFrom(msg.sender, address(this), IntermediateMintingFees);
            _safeMint(msg.sender, currentNFTid);
            _setTokenURI(currentNFTid, IntermediateTokenURI);
            NFTOwnedPerUser[msg.sender] = 2;
            OwnedNFT[msg.sender] = currentNFTid;
            MaxPerCatoegoryOfOneUser[msg.sender][2] ++;
            CountUsersPerCategory[2] ++;
        } 
        // Premium
        if (_categoryid == 3){
            require (MaxPerCatoegoryOfOneUser[msg.sender][1] == 0 && MaxPerCatoegoryOfOneUser[msg.sender][2] == 0 , "You have already in another plan, why you need the Premium ?");
            require(MaxPerCatoegoryOfOneUser[msg.sender][3] < 1 , "User should have one nft per category (Premium)");
            IERC20(PredictaTokenAddress).transferFrom(msg.sender, address(this), PremiumMintingFees);
            _safeMint(msg.sender, currentNFTid);
            _setTokenURI(currentNFTid, IntermediateTokenURI);
            NFTOwnedPerUser[msg.sender] = 3;
            OwnedNFT[msg.sender] = currentNFTid;
            MaxPerCatoegoryOfOneUser[msg.sender][3] ++;
            CountUsersPerCategory[3] ++;
        } 
    }

    // Function to cancel current plan
    function CancelCurrentPlan (uint256 _categoryid) public {
        // Basic
        if (_categoryid == 1){
            require(NFTOwnedPerUser[msg.sender] == _categoryid , "you do not own basic nft");
            uint256 ownedtokeid = GetMyNFTTokenId();
            _burn(ownedtokeid);
            delete NFTOwnedPerUser[msg.sender];
            delete OwnedNFT[msg.sender];
            MaxPerCatoegoryOfOneUser[msg.sender][1] --;
            CountUsersPerCategory[1] --;
        } 
        // Intermediate
        if (_categoryid == 2){
            require(NFTOwnedPerUser[msg.sender] == _categoryid , "you do not own intermediate nft");
            uint256 ownedtokeid = GetMyNFTTokenId();
            _burn(ownedtokeid);
            delete NFTOwnedPerUser[msg.sender];
            delete OwnedNFT[msg.sender];
            MaxPerCatoegoryOfOneUser[msg.sender][2] --;
            CountUsersPerCategory[2] --;
        }
        // Premium 
        if (_categoryid == 3){
            require (NFTOwnedPerUser[msg.sender] == _categoryid , "you do not own premium nft");
            uint256 ownedtokeid = GetMyNFTTokenId();
            _burn(ownedtokeid);
            delete NFTOwnedPerUser[msg.sender];
            delete OwnedNFT[msg.sender];
            MaxPerCatoegoryOfOneUser[msg.sender][3] --;
            CountUsersPerCategory[3] --;
        } 
    }
    
    // Function to retrieve which nft category that a msg.sender user have
    function GetNFTCategoryOfUser () public view returns (uint256){
        return NFTOwnedPerUser[msg.sender];
    } 

    // Function to retrieve which nft category that a msg.sender user have
    function GetNFTCategoryOfSpecificUser(address _UserAddress) public view returns (uint256){
        return NFTOwnedPerUser[_UserAddress];
    }

    // Function to retrieve which nft token id that a msg.sender user have

    function GetMyNFTTokenId () public view returns (uint256){
        return OwnedNFT[msg.sender];
    } 
    
    // Function to retrieve the cateogry name 
    function GetCategoryName (uint256 _categoryid) public view returns (string memory){
        return NFTsCategoriesNames[_categoryid];
    }

    // Function to retrieve the basic minting fees
    function GetBasicMintingFees () public view returns (uint256){
        return BasicMintingFees;
    }
    // Function to retrieve the Intermediate minting fees
    function GetIntermediateMintingFees () public view returns (uint256){
        return IntermediateMintingFees;
    }
       // Function to retrieve the Premium minting fees
    function GetPremiumMintingFees () public view returns (uint256){
        return PremiumMintingFees;
    }

}