import {Box , StackDivider , Flex , HStack,VStack,Image,SimpleGrid,Text, Button,Container,Select,Link as Linkexternal} from '@chakra-ui/react';
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, FormControl , FormLabel, Input} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { useState ,useEffect } from 'react';
import { useToast } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { ethers } from 'ethers';
import homeimage from './images/homeimage.png';



const HOME = ({accounts,predictatokencontract,nftsubscriptionplanscontract}) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const iswalletconnected = Boolean(accounts[0]);
    const [balance, setbalance] = useState();
    const [balancestatment, setbalancestatment] = useState("");


    function Feature({ desc, ...rest }) {
        return (
          <Flex p={4}  borderWidth='2px' {...rest} boxSize={270} height={257} borderColor="blue.700"       >
            <Text p={2} color="white" fontSize="24px" bgClip='text'  bgGradient='linear(to-r,cyan.200, blue.200)' fontWeight='bold' fontFamily="Book Antiqua	"  >{desc}</Text>
          </Flex>
        )
      }

    const earnpredictatoken = async() =>{
        const ptamount = document.getElementById('ptamount').value;
        const ptamount_ethformat = ethers.utils.parseEther(ptamount.toString());

        const getpt = await (await predictatokencontract.GetSomePredictaTestTokens(ptamount_ethformat)).wait();
        if ( getpt.hash ||getpt.transactionHash){
            toast({
                title: 'Earning success',
                description: "You have earned Predicta test tokens ",
                status: 'success',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
           
        }

        const ptbalance = await predictatokencontract.balanceOf(accounts[0]);
        const balance = Number(ptbalance)/1e18;
        setbalancestatment ("Your $PT balance is ");
        setbalance(balance);
        

    }
 
  

    return (

        <VStack
        divider={<StackDivider borderColor='white' />}
        spacing={2}
        align='stretch'
        >   
          <Box bgGradient='linear(179.4deg, rgb(12, 20, 69) -2.9%, rgb(71, 30, 84) 310%)' height="1890px">
                  <VStack
                  align='stretch'
                  >  
                  <Box h='580px'>
                   
                   

                   <HStack spacing="10px" p={4}>
                       <Box w='800px' h='600px'ml={35} >
                                <br></br><br></br><br></br><br></br><br></br>
                               <Flex fontFamily=" Garamond"  fontWeight='extrabold' fontSize="95px" bgClip='text' height={305}  color="blue.100">
                                  Analyze, Predict, and Earn
                               </Flex>
                               <Box fontSize="33px" fontFamily=" Papyrus" fontWeight="bold" bgClip='text' width={820} bgGradient='linear(to-r,cyan.100, blue.100)'>
                                    Predicta is a decentralized prediction and earning application that users can subscribe to it by minting NFTS and predict different markets. Predicta is deployed on Mumbai Polygon network.
                               </Box>
                       </Box>
                       <Box>
                           <Flex >
                               <Image  src={homeimage} alt="home-image"  height={500} width={550} ml={320} mt={55}  />
                           </Flex>
                       </Box>
                     
                      
                   </HStack>  
               </Box>
    



<br></br><br></br><br></br><br></br>
              <Box h="610px" justify="center" >
                      <Flex justify="center" fontFamily=" Garamond"  fontWeight='extrabold' fontSize="50px" bgClip='text'  color="blue.200" padding={10} mt={40}>
                          Predicta Features
                      </Flex>
                      <Flex justify="center" >

                      <SimpleGrid columns={4} spacingX='40px' spacingY='20px ' >

                      <Feature
                          
                          desc='Predicta Users can predict different markets and earn its own ERC-20 token ($PT).  '
                      />
                         <Feature
                          
                          desc='  Users can subscribe by minting NFTs (Basic, Intermediate, and Premium plans).'
                      />
                         <Feature
                          
                          desc='Users can have different voting power on different markets (Financial, sport, and social).'
                      />
                         <Feature
                          
                          desc='Each user has maximum voting count on different events based on his subscription plan. '
                      />
                      
                     
                  
                    
                    
                       
                      </SimpleGrid>
                      </Flex>

              </Box>

              <Box h="512px" justify="center">
                      <Flex justify="center" fontFamily=" Garamond"  fontWeight='extrabold' fontSize="50px" bgClip='text'  color="blue.200" padding={10}>
                          Explore Predicta
                      </Flex>
                      <Flex justify="center"  fontSize="38px" fontFamily=" Papyrus" fontWeight="bold" bgClip='text'  bgGradient='linear(to-r,cyan.100, blue.100)' >
                            To partcipate in events, users have to mint NFTS by paying with Predicta token ($PT). 
                      </Flex>
                      <Flex justify="center"  fontSize="38px" fontFamily=" Papyrus" fontWeight="bold" bgClip='text'  bgGradient='linear(to-r,cyan.100, blue.100)' >
                            You can earn test matic and $PT.
                      </Flex>
                      <br></br>
                      <Flex justify="center">
                            <Box width={250}>
                            <Button 
                            backgroundColor="blue.700"
                            colorScheme='teal' 
                            variant='solid'
                            borderRadius= "100px"
                            width="210px" 
                            height="80px"
                            fontSize={30}
                            fontWeight="extrabold"
                            fontFamily=" Garamond"
                            as={Link} 
                            varient="link" 
                            to="/exploreevents"
                        >Explore</Button>

                        </Box>
                        
                        <Button 
                            backgroundColor="blue.700"
                            colorScheme='teal' 
                            variant='solid'
                            borderRadius= "100px"
                            width="210px" 
                            height="80px"
                            fontSize={30}
                            fontWeight="extrabold"
                            fontFamily=" Garamond"
                            onClick={onOpen}
                        >Earn tokens</Button>
                        

                       
                      </Flex>
                      <Modal isOpen={isOpen} onClose={onClose} size="xl"  >
                        <ModalOverlay />
                        <ModalContent>
                        <ModalHeader fontSize={22} fontWeight="bold">Earn test tokens for the demo</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody >
                        <Tabs variant='unstyled' isFitted>
                            <TabList>
                                <Tab _selected={{ color: 'white', bg: 'blue.700' }} fontSize={20}> Predita test tokens </Tab>
                                <Tab _selected={{ color: 'white', bg: 'blue.700' }} fontSize={20}> MATIC mumbai polygon</Tab>
                            </TabList>
                    <TabPanels>
                        <TabPanel>
                            <br></br>
                            <Container  border='1px' color="black"  borderColor='cyan.800' height="305px" borderWidth={2} borderRadius= "50px">
                    <FormControl justify="center">
                    {iswalletconnected?
                    <VStack
                        divider={<StackDivider borderColor='azure' />}
                        spacing={4}
                        align='stretch'
                        >
                        <br></br>
                        <Box h='80px' bg='white'>
                        <FormLabel for="amountin" fontSize={23} > Amount</FormLabel>
                        <HStack spacing='24px'>
                            <Box w='350px' h='60px' bg='white'>
                                <Input id="ptamount" variant='outline' placeholder='0.0' height="60px" width="450px" borderWidth={1}  fontSize={25} />
                            </Box>
                          
                           
                        </HStack>
                   
                        
                                                
                        </Box>
                        
                        <Box bg='white' mt={1}>
                            <Button 
                              backgroundColor="blue.700"
                              fontWeight='extrabold'
                              fontSize="26px"
                              colorScheme='blue' 
                              variant='solid'
                              borderRadius= "100px"
                              width="140px"
                              height="65px"
                              ml="165px"
                              
                              type="submit"
                              onClick={earnpredictatoken}
                              
                             
                              >Earn
                            </Button>
                            <br></br><br></br>
                            <Flex bg='white' fontSize={15} fontFamily="Lucida Console" fontWeight="bold" justify="center">
                                {balancestatment} {balance}
                            </Flex>

                        </Box>
                        
                      
                            

                    </VStack>
                    :
                    <VStack
                    divider={<StackDivider borderColor='azure' />}
                    spacing={4}
                    align='stretch'
                    >
                   <Box>
                    <br></br><br></br><br></br><br></br>
                        <Flex justify = "center" fontFamily="Lucida Console"  fontSize="22px" fontWeight="extrabold" >
                            Connect Wallet 
                        </Flex>
                        <Flex justify = "center" fontFamily="Lucida Console"  fontSize="20px" fontWeight="extrabold" >
                            To earn $PT tokens to test Predicta.
                        </Flex>
                 
                    </Box>
                


                    </VStack>
            }
                    </FormControl>
                  </Container>
                       

                        
                    </TabPanel>
                        <TabPanel>
                        <br></br>
                    
                            <VStack
                                divider={<StackDivider borderColor='azure' />}
                                spacing={4}
                                align='stretch'
                                >
                                    <Box fontFamily="Lucida Console" fontSize="15px" fontWeight="extrabold" >
                                        Earn MATIC for Mumbai Polygon Network From  <Linkexternal href= "https://faucet.polygon.technology/" color="blue" > here</Linkexternal>
                                    </Box>
                                    <Box fontFamily="Lucida Console" fontSize="15px" fontWeight="extrabold">
                                        Choose Mumbai Network and Matic Token
                                    </Box>
                                    <Box fontFamily="Lucida Console" fontSize="15px" fontWeight="extrabold">
                                        Then Paste your MetaMask wallet address
                                    </Box>
                        
                     
                            </VStack>

                

                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' backgroundColor="blue.700" mr={3} onClick={onClose}>
                Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
      


              </Box>



              
             <Box fontSize="20px" fontWeight="bold" >
                  <Flex justify="center" color="blue.100" >
                      Made with {"\u2665" } By: Eidoox
                  </Flex>
                      <HStack spacing='24px' justify="center" color="blue.100" >
                          <a href="https://www.linkedin.com/in/eidoox/">Linkedin</a> 
                          <a href="https://github.com/Eidoox/">GitHub</a>
                          <a href="https://eidoox.hashnode.dev/"> Blogs</a>
                      </HStack>
              </Box>


             </VStack>          
          </Box>



      </VStack>

        

    );
};

export default HOME;