import { Flex, Heading, Box } from '@chakra-ui/layout'
import { MainGradientColor } from '../utils/colors'
import Login from '../pages/login'

const FrontPage = () => 
<Flex alignItems='center' justify='center' grow={1}>

<Flex as={'main'} flexDir={{base:'column', lg:'row'}} w={{base: '100%', lg: '62em'}} h={{base: 'initial', lg:'100vh'}} mt={{base:'initial', lg: '-72px'}}>
  <Flex width='100%' alignItems='center'>
    <Box>
      <Heading as='h1' size='4xl' bgClip='text' bgGradient={MainGradientColor(255)}>SQUERA</Heading>
      <Heading as='p' size='xl' fontWeight='normal'>Lorem ipsum dolor amet</Heading>
    </Box>
  </Flex>
  <Flex width='100%' alignItems='center' justify='center'>
    <Login/>
  </Flex>
</Flex>
</Flex>

export default FrontPage