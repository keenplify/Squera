import { Flex, Spacer } from "@chakra-ui/react"
import { Feed } from "./Feed"
import ProjectStatusAlert from "./ProjectStatusAlert"
import CreatePost from "./CreatePost"
import { Post, PostInterface } from "./Post"
import {UserFeedLeftStack} from './UserFeedLeftStack'
import { useState } from "react"


interface UserFeedPageProps {
  feedList: PostInterface[]
  feedAuthorsResponse: any
}

export const UserFeedPage = ({feedList, feedAuthorsResponse}: UserFeedPageProps) => {
  const [curatedList, setCuratedList] = useState(feedList)
  
  const handleCreatePostSuccess = (post:PostInterface) => {
    setCuratedList([post, ...curatedList])
  }

  const handleDeleteSuccess = (id:string) => {
    const filtered = curatedList.filter((post:PostInterface) => post._id!==id)
    setCuratedList(filtered)
  }

  return (
    <Flex alignContent='center' flexGrow={1} direction={{base:'column', md:'row'}}>
      <Flex  grow={{base:'initial', lg:1}} display={{base:'none', lg:'initial'}} w={'20em'}/>
      <Flex grow={{base:'initial', lg:1}} display={{base:'none', lg:'initial'}} w={'20em'} position='fixed'>
        <UserFeedLeftStack />
      </Flex>

      <Spacer/>

      <Flex direction='column'>
        <Feed children={<ProjectStatusAlert/>}/>
        <Feed children={<CreatePost handleSuccess={handleCreatePostSuccess}/>}/>
        {
          curatedList?.map((post, index) => {
            return <Feed key={index} children={<Post handleDeleteSuccess={handleDeleteSuccess} post={post} author={feedAuthorsResponse[post.createdBy]}/>} />
          })
        }
      </Flex>

      <Spacer/>
      
      <Flex grow={{base:'initial', lg:1}}  w={{base:'100%', md:'20em'}}  display={{base:'none', md:'initial'}}>
        Right
      </Flex>
      
    </Flex>
  )
}