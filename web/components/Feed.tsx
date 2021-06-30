import { Flex } from "@chakra-ui/layout"

interface FeedProps {
  children:any
}

export const Feed = (props:FeedProps) => {
  return <Flex m='.5em'  background='white' grow={1} borderRadius='lg' boxShadow='base'>
    {props.children}
  </Flex>
}