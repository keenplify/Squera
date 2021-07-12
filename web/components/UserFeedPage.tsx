import { Flex, Spacer } from "@chakra-ui/react"
import { Feed } from "./Feed"
import ProjectStatusAlert from "./ProjectStatusAlert"
import CreatePost from "./CreatePost"
import { Post, PostInterface } from "./Post"
import {UserFeedLeftStack} from './UserFeedLeftStack'
import { useState } from "react"
import { FlexFeed } from "./FlexFeed"


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
    <FlexFeed.Container>

      <FlexFeed.Left>
        <UserFeedLeftStack />
      </FlexFeed.Left>

      <FlexFeed.Middle>
        <Feed children={<ProjectStatusAlert/>}/>
        <Feed children={<CreatePost handleSuccess={handleCreatePostSuccess}/>}/>
        {
          curatedList?.map((post, index) => {
            return  <Feed key={index}>
                      <Post handleDeleteSuccess={handleDeleteSuccess} post={post} author={feedAuthorsResponse[post.createdBy]}/>
                    </Feed>
          })
        }
      </FlexFeed.Middle>

      <FlexFeed.Right>
        Right
      </FlexFeed.Right>

    </FlexFeed.Container>
  )
}