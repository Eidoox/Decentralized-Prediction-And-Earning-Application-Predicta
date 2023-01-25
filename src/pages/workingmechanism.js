import {Box , Image , Flex , HStack,VStack,StackDivider,SimpleGrid,Text} from '@chakra-ui/react';

import nftimage from './images/nftimage.png';
import premiumuserimage from './images/premiumuser.png';
import earntokensimage from './images/earningtokens.png';
import votingimage from './images/votingimage.png';


const WORKINGMECHANISM = () => {
   
  

    return (

        <VStack
        divider={<StackDivider borderColor='white' />}
        spacing={2}
        align='stretch'
        >   
          <Box bgGradient='linear(179.4deg, rgb(12, 20, 69) -4%, rgb(71, 30, 84) 290.9%)' height="100%">
              <VStack
                spacing={2}
                align='stretch'
              > 
                <Box  height="500px" p={7}>
                  <HStack spacing="10px" >
                    <Box fontSize="33px" fontFamily=" Papyrus" fontWeight="bold" bgClip='text' width={950} bgGradient='linear(to-r,cyan.100, blue.100)' ml={10} >
                                    Predicta users can subscribe to one of the three subscription plans (Basic, Intermediate, and Premium). They can subscribe by minting NFT by paying some $PT tokens.
                    </Box>
                    <Flex >
                        <Image  src={nftimage} alt="nftimage"  height={500} width={500} ml={220}   />
                    </Flex>
                    
                  </HStack>
                </Box>
                <Box height="500px" p={7}>
                  <HStack spacing="10px" >
                    <Flex >
                        <Image  src={premiumuserimage} alt="nftimage"  height={500} width={500} ml={50}   />
                    </Flex>
                    <Box  fontSize="33px" fontFamily=" Papyrus" fontWeight="bold" bgClip='text' width={1200} bgGradient='linear(to-r,cyan.100, blue.100)'>
                                    <Text ml={200}>
                                      There are some privilages for premium users. They can create events in three market categories (Financial, Sport, and Social) and vote up to 20 vote on different events. 
                                    </Text>
                    </Box>
                  </HStack>

                </Box>
                <Box  height="500px" p={7}>
                  <HStack spacing="10px" >
                    <Box fontSize="33px" fontFamily=" Papyrus" fontWeight="bold" bgClip='text' width={950} bgGradient='linear(to-r,cyan.100, blue.100)' ml={10} >
                    Users who subscribed have different voting power based on their subscription plan and can vote only one time on live events. Premium users who created the event can end it by providing the correct vote (Yes or No) and these event marked as ended.
                    </Box>
                    <Flex >
                        <Image  src={votingimage} alt="nftimage"  height={600} width={600} ml={180}   />
                    </Flex>
                    
                  </HStack>
                </Box>
                
                <Box  height="600px" p={7}>
                  <HStack spacing="10px" >
                    <Flex >
                        <Image  src={earntokensimage} alt="nftimage"  height={500} width={500}  ml={50}   />
                    </Flex>
                    <Box fontSize="33px" fontFamily=" Papyrus" fontWeight="bold" bgClip='text' width={1170} bgGradient='linear(to-r,cyan.100, blue.100)' ml={10} >
                     <Text ml={200} >
                       Predicta users can earn different amount of Predicta tokens ($PT) when they vote correctly on differnet events. Basic users can earn 10 $PT, while intermediate users can earn 20 $PT. On the other hand, Premium users earn 30 $PT tokens.
                      </Text>
                    </Box>
                   
                    
                  </HStack>
               

                </Box>
              </VStack> 
          </Box>
      
      </VStack>
        

    );
};

export default WORKINGMECHANISM;