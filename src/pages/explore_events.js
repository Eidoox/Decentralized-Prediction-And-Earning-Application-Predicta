import {Box , Button , Flex , HStack,VStack,StackDivider,SimpleGrid,Text,Select} from '@chakra-ui/react';
import { useState,useEffect } from 'react';
import { Spinner } from '@chakra-ui/react'
import { Card,Col } from "react-bootstrap";
import { Badge } from '@chakra-ui/react'
import {Menu,MenuButton,MenuList,MenuItem} from '@chakra-ui/react'
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, FormControl , FormLabel, Input} from '@chakra-ui/react'

import { IconButton } from '@chakra-ui/react'
import { HamburgerIcon} from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'


const EXPLOREEVENTS = ({accounts,predictacontract}) => {
  const iswalletconnected = Boolean(accounts[0]);
  const [allmarketevents,setallmarketevents] = useState([]);
  const [currenteventid,setcurrenteventid] = useState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const exploreevents = async()=> {
    const events = await predictacontract.GetAllEvents();
    const eventslength = events.length;
    let allevents = [];
    for (let i = 0 ; i < eventslength ; i++){
        let  eventcategorymarket;
        const eventcreator = events[i].EventCreator;
        const eventid = events[i].EventId;
        const eventname = events[i].EventName;
        const eventdescription = events[i].EventDescription;
        const eventcategory = events[i].EventCategory;
        const eventyesvotes = events[i].YesVotes;
        const eventnovotes = events[i].NoVotes;
        let eventisended = events[i].IsEnded;
       
        let eventyespercentage = ((Number(eventyesvotes) / (Number(eventyesvotes) + Number(eventnovotes))) *100).toFixed(2);;

        let eventnopercentage = ((Number(eventnovotes) / (Number(eventyesvotes) + Number(eventnovotes))) *100).toFixed(2);;

        if (Number.isNaN(Number(eventyespercentage)) == true){
            eventyespercentage = 0 ;
        }
        if (Number.isNaN(Number(eventnopercentage)) == true){
            eventnopercentage = 0 ;
        }

        if (Number(eventcategory) == 1){
             eventcategorymarket = "Financial";
        }
        if (Number(eventcategory) == 2){
             eventcategorymarket = "Sport";
        }
        if (Number(eventcategory) == 3){
             eventcategorymarket = "Social";
        }

     
        allevents.push({eventcreator : eventcreator ,eventid:Number(eventid) , eventname:eventname , eventdescription:eventdescription , eventcategory: eventcategorymarket , eventyesvotes: eventyespercentage , eventnovotes:eventnopercentage , eventisended: eventisended});
    }
    setallmarketevents(allevents);
  }

  const voteoneventsYes = async(eventid)=>{
        try{
            const voteyestx = await (await predictacontract.VoteOnEvents(eventid,1)).wait();
            if ( voteyestx.hash || voteyestx.transactionHash){
                toast({
                    title: 'Voting on Event Success',
                    description: "You have voted on event with (Yes) successfully ",
                    status: 'success',
                    duration: 2600,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
        }
        catch(error){
            if (error.reason === "execution reverted: You need to subscribe on predicta to vote on events"){
                toast({
                    title: 'Voting on Event failed',
                    description: "You need to subscribe on predicta to vote on events",
                    status: 'error',
                    duration: 2600,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
            if (error.reason === "execution reverted: You have voted on that event before"){
                toast({
                    title: 'Voting on Event failed',
                    description: "You have voted on that event before",
                    status: 'error',
                    duration: 2600,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
            if (error.reason === "execution reverted: the event is ended"){
                toast({
                    title: 'Voting on Event failed',
                    description: "The event was ended",
                    status: 'error',
                    duration: 2600,
                    isClosable: true,
                    position: 'top-left',   
                });
            }

        }
    }
    
  const voteoneventsNo = async(eventid)=>{
    try{
        const votenotx = await (await predictacontract.VoteOnEvents(eventid,0)).wait();
        if ( votenotx.hash || votenotx.transactionHash){
            toast({
                title: 'Voting on Event Success',
                description: "You have voted on event with (No) successfully ",
                status: 'success',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
        }
    }
    catch(error){
        if (error.reason === "execution reverted: You need to subscribe on predicta to vote on events"){
            toast({
                title: 'Voting on Event failed',
                description: "You need to subscribe on predicta to vote on events",
                status: 'error',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
        }
        if (error.reason === "execution reverted: You have voted on that event before"){
            toast({
                title: 'Voting on Event failed',
                description: "You have voted on that event before",
                status: 'error',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
        }
        if (error.reason === "execution reverted: the event is ended"){
            toast({
                title: 'Voting on Event failed',
                description: "The event was ended",
                status: 'error',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
        }

    }
    }
 

 

 

  const endevents = async (eventid) =>{
    try {

        const yesornoending = document.getElementById("chooseyesornoending");
        var correctvote = yesornoending.options[yesornoending.selectedIndex].value;
        if (correctvote === "yes"){
            const endeventyestx = await (await predictacontract.EndEvent(eventid,1)).wait();
            if ( endeventyestx.hash || endeventyestx.transactionHash){
                toast({
                    title: 'End Event success',
                    description: "You have ended the event with Yes correct vote ",
                    status: 'success',
                    duration: 2600,
                    isClosable: true,
                    position: 'top-left',   
                });
            }

        }
        if (correctvote === "no"){
            const endeventynotx = await (await predictacontract.EndEvent(eventid,0)).wait();
            if ( endeventynotx.hash || endeventynotx.transactionHash){
                toast({
                    title: 'End Event success',
                    description: "You have ended the event with No correct vote ",
                    status: 'success',
                    duration: 2600,
                    isClosable: true,
                    position: 'top-left',   
                });
            }

        }
        exploreevents();


    }
    catch (error){
        
        if (error.reason === "execution reverted: You could not end that event, you are not the event's creator"){
            toast({
                title: 'Ending event failed',
                description: "You are not the event creator",
                status: 'error',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
        }
    }
  }

  useEffect(()=>{
    exploreevents();
  
  },[]);



    return (

        <VStack
        divider={<StackDivider borderColor='white' />}
        spacing={2}
        align='stretch'
        >   
          <Box bgGradient='linear(179.4deg, rgb(12, 20, 69) -5%, rgb(71, 30, 84) 290.9%)' height="3000px" p={10}>
          { iswalletconnected ? (
            
                        <Flex padding={3} >
                                 <VStack
        divider={<StackDivider borderColor='white' />}
        spacing={2}
        align='stretch'
        > 
        <Flex>
    
                            {  allmarketevents.length > 0 ? (
                                <SimpleGrid columns={4} spacingX='75px' spacingY='25px'>
                                    { allmarketevents.map((event,idx) => (
                                        <Col >
                                                <br></br>
                                                p
                                                <Box  border="2px" borderColor='blue.500' borderRadius="15px" padding={4} pb={1}  width="400px" height="430px">
                                                    <Card key={idx}   >
                                                        <VStack
                                                        divider={<StackDivider borderColor='rgb(12, 20, 70)' />}
                                                        spacing={1}
                                                        align='stretch'
                                                        >

                                                        <Card.Body ml="150px">
                                                            <Box height="40px">
                                                                <Card.Title>
                                                                    <HStack >
                                                                        <Box width={500}>
                                                                            <Text fontSize={20} ml="15px" fontWeight="bold" color="blue.200"> {event.eventname} 
                                                                            </Text>
                                                                        </Box>
                                                                        {
                                                                            event.eventisended ? (
                                                                        
                                                                        <Box>
                                                                            <Badge  fontSize={16} variant='outline' colorScheme='red'>
                                                                                Ended
                                                                            </Badge>
                                                                        </Box>
                                                                        )
                                                                        : (
                                                                            <Box>
                                                                                <Badge  fontSize={16} variant='outline' colorScheme='green'>
                                                                                    Live
                                                                                </Badge>
                                                                            </Box>
                                                                        )
                                                                        }
                                                                        <Menu >
                                                                            <MenuButton
                                                                                as={IconButton}
                                                                                aria-label='Options'
                                                                                icon={<HamburgerIcon />}
                                                                                color="blue.300"
                                                                                bgColor="rgb(12, 20, 70)"
                                                                                colorScheme="blue"
                                                                              
                                                                            />
                                                                            <MenuList bgColor="rgb(12, 20, 70)">
                                                                                <MenuItem as={Button}
                                                                                fontSize={20}
                                                                                bgColor="rgb(12, 20, 70)"
                                                                                color="blue.100"
                                                                                
                                                                                colorScheme='grey' 
                                                                                variant='solid'
                                                                                onClick={ ()=>{               
                                                                                    setcurrenteventid(event.eventid);
                                                                                    onOpen();
                                                                                }} >
                                                                                    End Event
                                                                                </MenuItem>
                     
                                                                            </MenuList>
                                                                            
                                                                        </Menu>

 
      
                                                                    </HStack>
                                                                </Card.Title>
                                                            </Box>
                                                            <Card.Text>
                                                                <Box height="70px" width="350px">
                                                                    <Text  fontSize={20}  ml="15px"  color="blue.200">
                                                                        {event.eventdescription}
                                                                    </Text>
                                                                </Box>
                                                                                                                        

                                                                <Box height="40px" width="320px">
                                                                    <Text  fontSize={20}  ml="15px"  color="blue.200">
                                                                        Category: {event.eventcategory}
                                                                    </Text>
                                                                </Box>
                                                                <Box height="40px" width="320px">
                                                                    <Text  fontSize={20}  ml="15px"  color="blue.200">
                                                                        Yes Votes: {event.eventyesvotes} %
                                                                    </Text>
                                                                </Box>
                                                                <Box height="45px" width="320px">
                                                                    <Text  fontSize={20}  ml="15px"  color="blue.200">
                                                                        No Votes: {event.eventnovotes} %
                                                                    </Text>
                                                                </Box>
                                                                <Box height="45px" width="320px">
                                                                    <Text  fontSize={20}  ml="15px"  color="blue.200">
                                                                        Creator: {event.eventcreator.slice(0, 5) + '...' + event.eventcreator.slice(38, 42)}
                                                                    </Text>
                                                                </Box>
                                                          
                                                          
                                                            </Card.Text>                                                       
                                                        </Card.Body>
                                                       
                                                        <Card.Footer>

                                                          
                                                            
                                                            <Flex justify="center">
                                                            <HStack spacing={10}>
                                                                <Button 
                                                                    backgroundColor="blue.700"
                                                                    fontWeight='bold'
                                                                    textColor="cyan.100"
                                                                    colorScheme='blue' 
                                                                    variant='solid'
                                                                    borderRadius= "30px"
                                                                    width="150px"
                                                                    height="75px"
                                                                    fontSize={30}
                                                                    onClick={ ()=>{
                                                                        voteoneventsYes(event.eventid)
                                                                        

                                                                    }
                                                                        }
                                                                    >Yes
                                                                </Button>
                                                                
                                                                <Button 
                                                                    backgroundColor="blue.700"
                                                                    fontWeight='bold'
                                                                    textColor="cyan.100"
                                                                    colorScheme='blue' 
                                                                    variant='solid'
                                                                    borderRadius= "30px"
                                                                    width="150px"
                                                                    height="75px"
                                                                    fontSize={30}
                                                                    onClick={ ()=>{
                                                                        voteoneventsNo(event.eventid)
                                                                        

                                                                    }
                                                                        }
                                                                    >No
                                                                </Button>
                                                                </HStack>
                                                            </Flex>
                                                        
                                                             
                                                            
                                                         
                                                            
                                                            
                                                        </Card.Footer>
                                                        
                                                        <br></br>
                                                        
                                                        </VStack>
                                                    </Card>
                                                    
                                                </Box>
                                                
                                        </Col>
                                        
                                    ))}
                                    
                                    <Modal isOpen={isOpen} onClose={onClose} size="lg"  >
                                        <ModalOverlay />
                                        <ModalContent>
                                        <ModalHeader  fontSize={22} fontWeight="bold">End Event</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <VStack
                                            divider={<StackDivider borderColor='azure' />}
                                            spacing={4}
                                            align='stretch'
                                            >
                                          
                                            <Box h='80px' bg='white'>
                                                <FormLabel  fontSize={25} > Correct Vote</FormLabel>
                                                <HStack spacing='24px'>
                                                    <Box w='350px' h='60px' bg='white'>
                                                        <Select id="chooseyesornoending" fontSize={21} height="65px" width="465px" borderWidth={2} borderColor="black" color="black"    >
                                                            <option value="" disabled selected hidden>Choose correct vote</option>
                                                            <option  value='yes'  > Yes</option>
                                                            <option value='no'>No</option>
        
                                                        </Select>
                                                    </Box>
                                                
                                                
                                                </HStack>
                   
                        
                                                
                                            </Box>
                        
                                            <Box bg='white' mt={5}>
                                                <Button 
                                                backgroundColor="blue.700"
                                                fontWeight='extrabold'
                                                fontSize="26px"
                                                colorScheme='blue' 
                                                variant='solid'
                                                borderRadius= "100px"
                                                width="140px"
                                                height="75px"
                                                ml="165px"
                                                
                                                type="submit"
                                                onClick={ ()=>{
                                                    endevents(currenteventid)

                                                }
                                                    }
                                            
                                                
                                                
                                                >End
                                                </Button>
                                            

                                            </Box>

                                        </VStack>


                                        </ModalBody>

                                        <ModalFooter >
                                            <Button colorScheme='blue' backgroundColor="blue.700" mr={3} onClick={onClose}>
                                            Close
                                            </Button>
                                        </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </SimpleGrid>
                                
                                
                        ): (

                                <VStack
                                divider={<StackDivider  borderColor='rgb(12, 20, 70)' />}
                                spacing={1}
                                align='stretch'
                                >
                                    <Flex justify="center"  fontWeight='extrabold'fontSize="58px" fontFamily=" Papyrus"   ml ={780} bgClip='text' bgGradient='linear(to-r,blue.400, cyan.100)' padding={50} >
                                        Loading..
                                    </Flex>

                                    <Flex justify="center" fontWeight='extrabold' fontSize="43px" ml={320} bgClip='text'  bgGradient='linear(to-r, cyan.800, pink.800,cyan.800,)'   >
                                    <Spinner
                                        thickness='4px'
                                        speed='0.65s'
                                        emptyColor='cyan.200'
                                        color='blue.800'
                                        size='xl'
                                        ml={430}
                                       
                                        />
                                    </Flex>

                                 
                                </VStack>
                        )
                        }
                        </Flex>
   
                        </VStack>
                         </Flex>
                         
                         
                    ) : (
                        
                        <Flex  justify="center"  fontSize="50px" fontFamily=" Papyrus" fontWeight="bold" bgClip='text' bgGradient='linear(to-r,blue.400, cyan.100)' padding={100} >
                            Connect Wallet to view  Events
                        </Flex>
    
     
                    )
                
                
                    }           
                
                    
              
            

                        
          </Box>
      
      </VStack>
        

    );
};

export default EXPLOREEVENTS;