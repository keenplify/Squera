import { Flex } from "@chakra-ui/layout"
import { ResponsiveValue } from "@chakra-ui/react"

interface FeedProps {
  children:any
  display?: ResponsiveValue<any>
}

export const Feed = ({children, display}:FeedProps) => {
  
  return (
    <Flex m='.5em'  background='white' grow={1} borderRadius='lg' boxShadow='base' display={display}>
      {children}
    </Flex>
  )
}