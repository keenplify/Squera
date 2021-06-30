import { Flex, Spacer } from "@chakra-ui/react"
import { Feed } from "./Feed"
import ProjectStatusAlert from "./ProjectStatusAlert"
import CreatePost from "./CreatePost"
import { useContext, useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import { rootServer } from "../utils/server"
import { UserResponse } from "../utils/UserResponse"
import UserContext from "../utils/user-context"
import { Post, PostInterface } from "./Post"

interface UserFeedPageProps {
  feedList: PostInterface[]
  feedAuthorsResponse: any
}

export const UserFeedPage = ({feedList, feedAuthorsResponse}: UserFeedPageProps) => {
  const userResponse:UserResponse = useContext(UserContext)

  return (
    <Flex alignContent='center' flexGrow={1} direction={{base:'column', md:'row'}}>
      <Flex grow={{base:'initial', lg:1}} display={{base:'none', lg:'initial'}} w={'20em'}>
        Left
      </Flex>

      <Spacer/>

      <Flex w={{base: '100%', lg:'48em'}}  direction='column'>
        <Feed children={<ProjectStatusAlert/>}/>
        <Feed children={<CreatePost/>}/>
        {
          feedList?.map((post, index) => <Feed key={index} children={<Post post={post} author={feedAuthorsResponse[post.createdBy]}/>} />)
        }
      </Flex>

      <Spacer/>
      
      <Flex grow={{base:'initial', lg:1}}  w={{base:'100%', md:'20em'}}  display={{base:'none', md:'initial'}}>
        Right
      </Flex>
      
    </Flex>
  )
}