import { Flex } from "@chakra-ui/layout"
import { ResponsiveValue, useColorMode } from "@chakra-ui/react"

interface FeedProps {
  children:any
  display?: ResponsiveValue<any>
}

export const Feed = ({children, display}:FeedProps) => {
  const { colorMode } = useColorMode()

  return (
    <Flex 
      m='.5em'
      background='white' 
      borderRadius='lg' 
      boxShadow='base' 
      display={display}
      backgroundColor={colorMode === 'light' ? 'blackAlpha.100' : 'blackAlpha.300'}
      _hover={{
        backgroundColor:colorMode === 'light' ? 'blackAlpha.50' : 'blackAlpha.200'
      }}
    >
      {children}
    </Flex>
  )
}