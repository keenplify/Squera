import { Flex, Avatar, Spinner } from "@chakra-ui/react"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { rootServer } from "../utils/server";
import { UserResponse } from "../utils/UserResponse";

export interface PostInterface {
  isAnon?: boolean,
  _id: string,
  text?: string,
  createdBy: string,
  createdAt: string
}

interface PostProps {
  post: PostInterface,
  author?: UserResponse
}

export const Post = ({post, author}:PostProps) => {
  const {text, createdBy, isAnon} = post;
  const [user, setUser] = useState<UserResponse>(author ? author : {});

  useEffect(()=> {
    if (!user) axios.get(rootServer+'/users/'+createdBy)
    .then((res)=> {
      setUser(res.data)
    })
  }, [])

  if (!user) return <Spinner />
  return (
    <Flex p={4} direction='column'>
      <Link href={`/${user.username}`}>
        <a>
          <Flex direction='row'>
            <Avatar name={user.username} />
            <Flex direction='column' ml={3} justify='center'>
              <Flex fontWeight='semibold'>{post.isAnon ? 'Anonymous' : user.userId}</Flex>
              {!post.isAnon && <Flex color='blackAlpha.700'>@{user.username}</Flex>}
            </Flex>
          </Flex>
        </a>
      </Link>
      <Flex mt={3} fontSize='lg'>
        {text}
      </Flex>
    </Flex>
  )
}
