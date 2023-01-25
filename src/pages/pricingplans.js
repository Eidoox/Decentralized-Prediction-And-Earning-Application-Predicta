import {Box , Button , Flex , HStack,VStack,StackDivider,SimpleGrid,Text} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react'

import { Link } from "react-router-dom";

const PRICINGPLANS = ({predictatokencontract,nftsubscriptionplanscontract}) => {
  const [basicminting , setbasicminiting] = useState("Mint");
  const [intermediateminting , setintermediateminting] = useState("Mint");
  const [premiumminting , setpremiumminting] = useState("Mint");
  const [basicfees,setbasicfees] = useState();
  const [intermediatefees,setintermediatefees] = useState();
  const [premiumfees,setpremiumfees] = useState();
  const [issubscribedbasic,setissubscribedbasic] = useState();
  const [issubscribedintermediate,setissubscribedintermediate] = useState();
  const [issubscribedpremium,setissubscribedpremium] = useState();


  const toast = useToast();



  useEffect(()=>{
    getsubscribitonfees();
    getmynftcategory();
  },[])

  const getsubscribitonfees = async ()=>{
    const basicnftfees = await nftsubscriptionplanscontract.GetBasicMintingFees();
    const intermediatenftfees = await nftsubscriptionplanscontract.GetIntermediateMintingFees();
    const premiumnftfees = await nftsubscriptionplanscontract.GetPremiumMintingFees();
    setbasicfees(basicnftfees);
    setintermediatefees(intermediatenftfees);
    setpremiumfees(premiumnftfees);
  }

  const getmynftcategory = async ()=>{
    const mycategory = await nftsubscriptionplanscontract.GetNFTCategoryOfUser();
    if (Number(mycategory) == 1){
      setbasicminiting("Cancel");
      setissubscribedbasic(1);
    }
    if (Number(mycategory) == 2){
      setintermediateminting("Cancel");
      setissubscribedintermediate(1);
    }
    if (Number(mycategory) == 3){
      setpremiumminting("Cancel");
      setissubscribedpremium(1);
    }
 
  }





  const subscribeandcancelbasicplan = async () =>{
    try{
      if (basicminting === "Mint"){
        if (issubscribedintermediate == 1){
          toast({
            title: 'Subscription failed',
            description: "Error! You are aleardy in intermediate plan",
            status: 'error',
            duration: 2600,
            isClosable: true,
            position: 'top-left',   
        });
        }
        else if (issubscribedpremium == 1){
          toast({
            title: 'Subscription failed',
            description: "Error! You are aleardy in premium plan",
            status: 'error',
            duration: 2600,
            isClosable: true,
            position: 'top-left',   
        });
        }
        else {
          const predictaapproval =  await (await predictatokencontract.approve(nftsubscriptionplanscontract.address,basicfees ) ).wait();
          if ( predictaapproval.hash ||predictaapproval.transactionHash){
            toast({
                title: 'Predicta token Aprroval Success',
                description: "Wait for next MetaMask confirmations to complete minting process",
                status: 'success',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
          }
          const mintbasicnft =  await (await nftsubscriptionplanscontract.MintNFT(1) ).wait();
          if ( mintbasicnft.hash || mintbasicnft.transactionHash){
            toast({
                title: 'Subscription success',
                description: "Congratulations! You have subscribed to basic plan",
                status: 'success',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
            
          }
        }
    }
    if(basicminting==="Cancel"){
      
      const cancelbasic =  await (await nftsubscriptionplanscontract.CancelCurrentPlan(1) ).wait();
      if ( cancelbasic.hash || cancelbasic.transactionHash){
        toast({
            title: 'Subscription cancellation success',
            description: " You have canceled your subscription to basic plan",
            status: 'success',
            duration: 2600,
            isClosable: true,
            position: 'top-left',   
        });
        
      }
    }
    }
    catch(error){
      console.log(error)
    }


  }



  const subscribeandcancelintermediateplan = async () =>{
    try{
      if (intermediateminting === "Mint"){
        if (issubscribedbasic == 1){
          toast({
            title: 'Subscription failed',
            description: "Error! You are aleardy in basic plan",
            status: 'error',
            duration: 2600,
            isClosable: true,
            position: 'top-left',   
        });
        }
        else if (issubscribedpremium == 1){
          toast({
            title: 'Subscription failed',
            description: "Error! You are aleardy in premium plan",
            status: 'error',
            duration: 2600,
            isClosable: true,
            position: 'top-left',   
        });
        }
        else {
          const predictaapproval =  await (await predictatokencontract.approve(nftsubscriptionplanscontract.address,intermediatefees ) ).wait();
          if ( predictaapproval.hash ||predictaapproval.transactionHash){
            toast({
                title: 'Predicta token Aprroval Success',
                description: "Wait for next MetaMask confirmations to complete minting process",
                status: 'success',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
          }
          const mintintermediatenft =  await (await nftsubscriptionplanscontract.MintNFT(2) ).wait();
          if ( mintintermediatenft.hash || mintintermediatenft.transactionHash){
            toast({
                title: 'Subscription success',
                description: "Congratulations! You have subscribed to intermediate plan",
                status: 'success',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });

            
          }
        }
    }
    if (intermediateminting === "Cancel"){
      const cancelintermediate=  await (await nftsubscriptionplanscontract.CancelCurrentPlan(2) ).wait();
      if ( cancelintermediate.hash || cancelintermediate.transactionHash){
        toast({
            title: 'Subscription cancellation success',
            description: " You have canceled your subscription to intermediate plan",
            status: 'success',
            duration: 2600,
            isClosable: true,
            position: 'top-left',   
        });
        
      }
    }
    }
    catch(error){
      console.log(error)
    }
  }



  const subscribeandcancelpremiumplan = async () =>{
    try{
      if (premiumminting === "Mint"){
        if (issubscribedbasic == 1){
          toast({
            title: 'Subscription failed',
            description: "Error! You are aleardy in basic plan",
            status: 'error',
            duration: 2600,
            isClosable: true,
            position: 'top-left',   
        });
        }
        else if (issubscribedintermediate == 1){
          toast({
            title: 'Subscription failed',
            description: "Error! You are aleardy in intermediate plan",
            status: 'error',
            duration: 2600,
            isClosable: true,
            position: 'top-left',   
        });
        }
        else {
          const predictaapproval =  await (await predictatokencontract.approve(nftsubscriptionplanscontract.address,premiumfees ) ).wait();
          if ( predictaapproval.hash ||predictaapproval.transactionHash){
            toast({
                title: 'Predicta token Aprroval Success',
                description: "Wait for next MetaMask confirmations to complete minting process",
                status: 'success',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
          }
          const mintpremiumnft =  await (await nftsubscriptionplanscontract.MintNFT(3) ).wait();
          if ( mintpremiumnft.hash || mintpremiumnft.transactionHash){
            toast({
                title: 'Subscription success',
                description: "Congratulations! You have subscribed to premium plan",
                status: 'success',
                duration: 2600,
                isClosable: true,
                position: 'top-left',   
            });
            
          }
        }
    }
      if (premiumminting === "Cancel"){
        const cancelpremium=  await (await nftsubscriptionplanscontract.CancelCurrentPlan(3) ).wait();
        if ( cancelpremium.hash || cancelpremium.transactionHash){
          toast({
              title: 'Subscription cancellation success',
              description: " You have canceled your subscription to premium plan",
              status: 'success',
              duration: 2600,
              isClosable: true,
              position: 'top-left',   
          });
          
        }
      }

    }
    catch(error){
      if (error.reason === "execution reverted: ERC20: transfer amount exceeds balance"){
        toast({
            title: 'Minting NFT failed',
            description: "You don't have enough balance of $PT",
            status: 'error',
            duration: 2600,
            isClosable: true,
            position: 'top-left',   
        });
    }
      
    }
 
  }

   
  

    return (

        <VStack
        divider={<StackDivider borderColor='white' />}
        spacing={2}
        align='stretch'
        >   
          <Box bgGradient='linear(179.4deg, rgb(12, 20, 69) -10%, rgb(71, 30, 84) 280%)' height="897px">
                  <VStack
                  divider={<StackDivider borderColor='rgb(12, 20, 69)' />}
                  spacing={2}
                  align='stretch'
                  >  
                  <Box>
                      <Flex justify="center" fontFamily=" Nirmala UI" fontWeight='extrabold' fontSize="77px" bgClip='text'  bgGradient='linear(to-r, cyan.400, red.600)' padding={10}>
                          Subscribe to Predicta by Minting NFTs
                      </Flex>
                  </Box>
            <br></br>
              <Box h="500px" justify="center">
                     
                      <Flex justify="center">

                      <SimpleGrid columns={3} spacingX='40px' spacingY='30px' >
                        <Box  p={3} shadow='lg' borderWidth='3px'  boxSize={350} borderColor="blue.600" >
                          <VStack
                          divider={<StackDivider borderColor='rgb(12, 20, 69)' />}
                          spacing={4}
                          align='stretch'
                          >  
                            <Flex h={8} w="180px" justify="center" >
                              <Text mt={1} fontSize="35px" fontWeight='extrabold' fontFamily=" Nirmala UI" color="blue.300" ml="75%">Basic</Text>
                            </Flex>
                            <Flex h={5} w="320px" justify="center">
                              <Text mt={1} fontSize="22px" color="blue.200" fontWeight="bold">Mint for: 20 $Predicta</Text>
                            </Flex>
                            <Flex h={5} w="320px" justify="center">
                              <Text mt={1} fontSize="19px" color="blue.200" fontWeight="bold">5 Maximum votes</Text>
                            </Flex>
                            <Flex h={8} w="320px" justify="center">
                              <Text mt={1} fontSize="19px" color="blue.200" fontWeight="bold">No events creation</Text>
                            </Flex>
                            <Button 
                              backgroundColor="blue.600"
                              colorScheme='teal' 
                              variant='solid'
                              fontFamily=" Nirmala UI"
                              borderRadius= "100px"
                              width="170px" 
                              height="70px"
                              fontSize={23}
                              ml="25%"
                              onClick={subscribeandcancelbasicplan}
                            >{basicminting} </Button>
                          </VStack>
                        </Box>



                        <Box  p={3} shadow='lg' borderWidth='3px'  boxSize={350} borderColor="blue.600" >
                          <VStack
                          divider={<StackDivider borderColor='rgb(12, 20, 69)' />}
                          spacing={4}
                          align='stretch'
                          >  
                            <Flex h={8} w="180px" justify="center">
                              <Text mt={1} fontSize="35px" fontWeight='extrabold' fontFamily=" Nirmala UI" color="blue.300" ml="75%">Intermediate</Text>
                            </Flex>
                           <Flex h={5} w="320px" justify="center">
                              <Text mt={1} fontSize="22px" color="blue.200" fontWeight="bold">Mint for: 50 $Predicta</Text>
                          </Flex>
                          <Flex h={5} w="320px" justify="center">
                              <Text mt={1} fontSize="19px" color="blue.200" fontWeight="bold">10 Maximum votes</Text>
                            </Flex>
                          <Flex h={8} w="320px" justify="center">
                              <Text mt={1} fontSize="19px" color="blue.200" fontWeight="bold">No events creation</Text>
                          </Flex>
                            <Button 
                              backgroundColor="blue.600"
                              colorScheme='teal' 
                              variant='solid'
                              fontFamily=" Nirmala UI"
                              borderRadius= "100px"
                              width="170px" 
                              height="70px"
                              fontSize={23}
                              ml="25%"
                              onClick={subscribeandcancelintermediateplan}
                            >{intermediateminting}</Button>
                          </VStack>
                        </Box>



                        <Box  p={3} shadow='lg' borderWidth='3px'  boxSize={350} borderColor="blue.600" >
                          <VStack
                          divider={<StackDivider borderColor='rgb(12, 20, 69)' />}
                          spacing={4}
                          align='stretch'
                          >  
                            <Flex h={8} w="180px" justify="center">
                              <Text mt={1} fontSize="35px" fontWeight='extrabold' fontFamily=" Nirmala UI" color="blue.300" ml="75%">Premium</Text>
                            </Flex>
                            <Flex h={5} w="320px" justify="center">
                              <Text mt={1} fontSize="22px" color="blue.200" fontWeight="bold">Mint for: 100 $Predicta</Text>
                            </Flex>
                            <Flex h={5} w="320px" justify="center">
                              <Text mt={1} fontSize="19px" color="blue.200" fontWeight="bold">20 Maximum votes</Text>
                            </Flex>
                          <Flex h={8} w="320px" justify="center">
                              <Text mt={1} fontSize="19px" color="blue.200" fontWeight="bold"> Events creation</Text>
                          </Flex>

                            <Button 
                              backgroundColor="blue.600"
                              colorScheme='teal' 
                              variant='solid'
                              fontFamily=" Nirmala UI"
                              borderRadius= "100px"
                              width="170px" 
                              height="70px"
                              fontSize={23}
                              ml="25%"
                              onClick={subscribeandcancelpremiumplan}
                            >{premiumminting} </Button>
                          </VStack>
                        </Box>


                    

                        

                        

                     
                      </SimpleGrid>
                      </Flex>
              </Box>


             </VStack>          
          </Box>
      
      </VStack>
        

    );
};

export default PRICINGPLANS;