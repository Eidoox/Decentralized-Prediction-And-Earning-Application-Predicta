import {Box , Button , Flex , FormLabel,VStack,StackDivider,Container,Input,FormControl,Select,Text} from '@chakra-ui/react';
import {Alert,AlertIcon,AlertTitle,AlertDescription} from '@chakra-ui/react'
import { useState ,useEffect} from 'react';
import { useToast } from '@chakra-ui/react'


const CREATEEVENTS = ({accounts,predictacontract}) => {
    const iswalletconnected = Boolean(accounts[0]);
    const toast = useToast(); 

    useEffect(() => {
      
        if (iswalletconnected == false) {
            toast({
                title: 'Connect Wallet',
                description: "You have to Connect your MetaMask Wallet to create events",
                status: 'info',
                duration: 2400,
                isClosable: true,
                position: 'top',   
              });
            

        }
      }, [])

    const createevents = async ()=>{
        try{
            const eventname = document.getElementById('eventname').value;
            const eventdescription = document.getElementById('eventdescription').value;
            const category = document.getElementById("chooseeventcategory");
            var categoryname = category.options[category.selectedIndex].value;
            // Financial category
            if (categoryname === "financial"){
                const createfinanicaltx = await (await predictacontract.CreateEvent(eventname,eventdescription,1)).wait();
                if ( createfinanicaltx.hash ||createfinanicaltx.transactionHash){
                    toast({
                        title: 'Creating Event success',
                        description: "You have created event successfully ",
                        status: 'success',
                        duration: 2600,
                        isClosable: true,
                        position: 'top-left',   
                    });
                
                }

            }

            // Sport category
            if (categoryname === "sport"){
                const createsporttx = await (await predictacontract.CreateEvent(eventname,eventdescription,2)).wait();
                if ( createsporttx.hash ||createsporttx.transactionHash){
                    toast({
                        title: 'Creating Event success',
                        description: "You have created event successfully ",
                        status: 'success',
                        duration: 2600,
                        isClosable: true,
                        position: 'top-left',   
                    });
                
                }
                
            }

            // Social category
            if (categoryname === "social"){
                    const createsocialtx = await (await predictacontract.CreateEvent(eventname,eventdescription,3)).wait();
                    if ( createsocialtx.hash ||createsocialtx.transactionHash){
                        toast({
                            title: 'Creating Event success',
                            description: "You have created event successfully ",
                            status: 'success',
                            duration: 2600,
                            isClosable: true,
                            position: 'top-left',   
                        });
                    
                    }
                    
                
                
            }
        }
        catch(error){
            if (error.reason === "execution reverted: YOu have to be contract owner or premium user to create events"){
                toast({
                    title: 'Creating Event failed',
                    description: "You are not premium user!",
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
          <Box bgGradient='linear(179.4deg, rgb(12, 20, 69) -5%, rgb(71, 30, 84) 225.9%)' height="897px">
            <br></br> <br></br> <br></br> <br></br> <br></br>
          <Container  border='1px'  height="580px" borderWidth={3} borderColor="blue.600" borderRadius= "30px">
                <FormControl justify="center"  >
                    <br></br>
                    <FormLabel htmlfor= "eventname" color="blue.400"  fontSize="24px" fontWeight="bold" >Name</FormLabel>
                    <Input id = "eventname" color="blue.200" type='text' maxLength="20" placeholder="Event name" variant='outline' borderWidth={2} borderColor="blue.800" fontSize={22}   height="60px"   />
                    <br></br><br></br>
                    <FormLabel htmlfor= "eventdescription"  color="blue.400"  fontSize="24px" fontWeight="bold" >Description</FormLabel>
                    <Input id = "eventdescription" type='text' color="blue.200" maxLength="65"  borderWidth={2} borderColor="blue.800" placeholder="Event description" height="90px" variant='outline' fontSize={22}/>
                    <br></br><br></br>
                    
                    <FormLabel  htmlfor= "eventcategory" color="blue.400"  fontSize="24px" fontWeight="bold">Category</FormLabel>
                    <Select id="chooseeventcategory" fontSize={20} height="60px" width="485px" borderWidth={2} borderColor="blue.800" color="blue.500"    >
                                    
                                    <option value="" disabled selected hidden>Choose Event Category</option>
                                    <option  value='financial'  > Financial</option>
                                    <option value='sport'>Sport</option>
                                    <option value='social'>Social</option>
                                  
                    </Select>
                    <br></br>
          
                    <br></br>
                    <Flex justify="center">
                        <Button 
                            backgroundColor="blue.700"
                            fontWeight='extrabold'
                            colorScheme='blue' 
                            variant='solid'
                            borderRadius= "30px"
                            width="230px"
                            height="90px"
                            fontSize={30}
                        
                            type='submit'
                            onClick={createevents}
                            
                            >Create Event
                        </Button>
                    </Flex>


                </FormControl>
            </Container>
                       
          </Box>
      
      </VStack>
        

    );
};

export default CREATEEVENTS;