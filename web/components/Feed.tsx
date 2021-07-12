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
      grow={1} 
      borderRadius='lg' 
      boxShadow='base' 
      display={display}
      backgroundColor={colorMode === 'light' ? 'white' : 'blackAlpha.500'}
    >
      {children}
    </Flex>
  )
}