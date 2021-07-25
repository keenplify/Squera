import { Box, Flex, Avatar, Spinner, Spacer, Button, useColorMode } from "@chakra-ui/react"
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { rootServer } from "../utils/server";
import UserContext from "../utils/user-context";
import { UserResponse } from "../utils/UserResponse";
import { FaEllipsisH } from "react-icons/fa";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react"


import { Fragment } from "react";
import { months } from "../utils/months";
import { DeletePostButton } from "./DeletePostButton";

export interface PostInterface {
  isAnon?: boolean,
  _id: string,
  text?: string,
  createdBy: string,
  createdAt: string
}

interface PostProps {
  post: PostInterface
  author?: UserResponse
  handleDeleteSuccess: (id:string) => void
  // deleted: boolean
  // setDeleted: Dispatch<SetStateAction<boolean>>
}

export const Post = ({post, author, handleDeleteSuccess}:PostProps) => {
  const {text, createdBy, isAnon} = post;
  const [user, setUser] = useState<UserResponse>(author ? author : {});
  const userResponse:UserResponse = useContext(UserContext)
  const createdAt = new Date(post.createdAt)
  const parsedDate = `${months[createdAt.getMonth()]} ${createdAt.getDay()}, ${createdAt.getFullYear()}`
  const { colorMode } = useColorMode()

  useEffect(()=> {
    if (!user) axios.get(rootServer+'/users/'+createdBy)
    .then((res)=> {
      setUser(res.data)
    })
  }, [])

  if (!user) return <Spinner />
  return (
    <Flex p={4} direction='column' grow={1}>
      <Flex direction='row'>
        <Link href={!isAnon ? `/${user.username}` : `/anon`}>
          <a style={{display:'flex'}}>
            <Avatar name={isAnon ? 'Anonymous' : user.username} />
            <Flex direction='column' ml={3} justify='center'>
              <Flex fontWeight='semibold'>{isAnon ? `Anonymous ${userResponse.userId === post.createdBy && '(You)'}` : user.userId}</Flex>
              <Flex color={colorMode === 'light' ? 'blackAlpha.700':'whiteAlpha.700'} fontSize='smaller'>
                <b>
                  {!isAnon && `@${user.username}`}
                </b>
                {!isAnon && ' | '}
                <time dateTime={post.createdAt}>{parsedDate}</time>
              </Flex>
            </Flex>
          </a>
        </Link>
        <Spacer/>
        <Box ml='auto'>
          <Popover>
            <PopoverTrigger>
              <Button bg='initial' p={0}>
                <FaEllipsisH/>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Post Options</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                {
                  userResponse.userId === createdBy && (
                    <Fragment>
                      <DeletePostButton parsedDate={parsedDate} post={post} handleSuccess={handleDeleteSuccess}/>
                    </Fragment>
                  )
                }
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </Flex>
      <Flex mt={3} fontSize='lg'>
        {text}
      </Flex>
    </Flex>
  )
}
