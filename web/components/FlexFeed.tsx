import { Flex, Spacer } from "@chakra-ui/react"
import { Children, Fragment } from "react"

interface Props {
  children: any
}

export const FlexFeed = {
  Container : ({children}:Props) => {
    return (
      <Flex alignContent='center' flexGrow={1} direction={{base:'column-reverse', md:'row'}}>
        {
          Children.map(children, (children2, i) => (
            <Fragment>
              {children2}
              {
                (Children.toArray(children).length-1) > i && <Spacer/>
              }
            </Fragment>
          ))
        }
        {
          
        }
      </Flex>
    )
  } ,

  Left : ({children}:Props) => {
    return (
      <Flex wordBreak='break-word' w={{md: '15em', lg: '20em'}} display={{base:'none', lg:'initial'}}>
        <Flex grow={1}/>
        <Flex  w={{md: '15em', lg: '20em'}} position='fixed'>
          {children}
        </Flex>
      </Flex>
    )
  },

  Middle : ({children}:Props) => <Flex direction='column' w={{md: '33em', lg: '42em'}}  wordBreak='break-word'>
    {children}
  </Flex>,

  Right : ({children}:Props) => <Flex grow={{base:'initial', lg:1}} w={{base:'100%', md:'15em', lg: 'auto'}} wordBreak='break-word'>
    {children}
  </Flex>
}