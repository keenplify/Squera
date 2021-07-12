import { Flex, Heading, Spinner, Text } from "@chakra-ui/react"
import axios from "axios"
import { useEffect } from "react"
import { useContext, useState } from "react"
import { rootServer } from "../utils/server"
import UserContext from "../utils/user-context"
import { UserResponse } from "../utils/UserResponse"

interface Props {
  children?: any
}

export const SchoolsFollowedList = (props:Props) => {
  const userResponse:UserResponse = useContext(UserContext)
  const [ following, setFollowing ] = useState([])
  const [ loading, setLoading ] =useState(true)

  useEffect(()=> {
    axios.get(rootServer+'/follows/following/'+userResponse.userId, {
      params: {
        withList: 'true'
      }
    })
    .then((res)=>{
      console.log(res)
      setLoading(false)
    })
  }, [])

  return (
  <Flex p='1em' direction='column' grow={1}>
    <Flex grow={1}>
      <Heading fontSize='lg' fontWeight='medium'>Schools you're following</Heading>
    </Flex>
    {
      (!loading) ? 
      <Flex>
        {
          (following.length==0) ? (
            <Text color='GrayText' wordBreak='break-word'>You are following no one! Start following schools to get the latest news and files!</Text>
          ):(
            'Listing'
          )
        }
      </Flex>
      :
      <Spinner/>
    }
  </Flex>
  )
}