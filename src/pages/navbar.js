import {Box , Button , Flex , HStack,VStack} from '@chakra-ui/react';
import {Menu,MenuButton, MenuList,MenuItem} from '@chakra-ui/react'

import { Link } from "react-router-dom";

const Navbar = ({accounts,connectwallet}) => {
    const iswalletconnected = Boolean(accounts[0]);
    return (

        <Flex justify= "space-between"  padding="4px" bgColor="rgb(12, 20, 69)" borderWidth={2} borderColor="blue.900" >
                <HStack spacing="600" justify="space-between" position= "sticky" >
                    <Flex as={Link} to= "/" fontWeight='extrabold' fontSize="38px" bgClip='text'  bgGradient='linear(to-r, cyan.500, pink.600)' ml={2} >
                        Predicta
                    </Flex>
                    
                    <HStack spacing="50" justify="space-between"  position= "absolute" >
                        <Button as={Link} varient="link" backgroundColor= "rgb(12, 20, 69)" color="blue.100" colorScheme="blue" to="/" fontSize="20px" fontWeight="bold" >Home</Button>
                        <Menu >
                            <MenuButton as={Button} 
                                varient="link" backgroundColor= "rgb(12, 20, 69)"  
                                color="blue.100" 
                                colorScheme="blue" 
                                fontSize="20px" 
                                fontWeight="bold" 
                            >
                                Events
                            </MenuButton>
                            <MenuList bgColor="rgb(12, 20, 69)" >
                                <MenuItem as={Link}
                                
                                     varient="link"   
                                     color="blue.200" 
                                     bgColor="rgb(12, 20, 69)"
                                     colorScheme="blue" 
                                     to="/createevents" 
                                     fontSize="20px" 
                                     fontWeight="bold" 
                                >Create Events
                                </MenuItem>

                                <MenuItem as={Link}
                                     varient="link"   
                                     color="blue.200" 
                                     bgColor="rgb(12, 20, 69)"
                                     colorScheme="blue" 
                                     to="/exploreevents" 
                                     fontSize="20px" 
                                     fontWeight="bold" 
                                >Explore Events
                                </MenuItem>

                            </MenuList>
                        </Menu>
                        <Button as={Link} varient="link" backgroundColor= "rgb(12, 20, 69)"  color="blue.100" colorScheme="blue" to="/workingmechanism" fontSize="20px" fontWeight="bold" > How it works ?</Button>
                        <Button as={Link} varient="link" backgroundColor= "rgb(12, 20, 69)" color="blue.100" colorScheme="blue" to="/pricing" fontSize="20px" fontWeight="bold"> Pricing plans</Button>
                    </HStack>
                </HStack>
                    
                    {iswalletconnected ? (
                        <HStack>
                            <Box as='button' backgroundColor="lightblue" borderRadius= "100px" width="170px" height="60px" fontStyle="extrabold" fontSize={20} > {accounts[0].slice(0, 5) + '...' + accounts[0].slice(38, 42)}</Box>
                        </HStack>
                    ): (
                        <Button 
                        backgroundColor="blue.600"
                        colorScheme='teal' 
                        variant='solid'
                        borderRadius= "100px"
                        width="170px" 
                        height="60px"
                        fontSize={21}
                        
                        onClick={connectwallet}>Connect Wallet</Button>
                    )}

               

        </Flex>
        

    );
};

export default Navbar;