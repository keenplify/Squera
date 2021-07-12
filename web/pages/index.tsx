import FrontPage from "../components/FrontPage";
import { UserFeedPage } from "../components/UserFeedPage";
import { UserResponse } from "../utils/UserResponse";
import Header from '../components/Header'
import { Authenticate } from "../utils/authenticate";
import { UserProvider } from "../utils/user-context";
import { Fragment } from "react"
import Head from 'next/head'
import { Flex } from "@chakra-ui/react"
import cookie from "cookie";
import axios from "axios";
import { rootServer } from "../utils/server";
import { PostInterface } from "../components/Post";
import { sanitizeString } from "../utils/sanitize";

interface HomeProps {
  userResponse: UserResponse
  feedList: PostInterface[]
  feedAuthorsResponse: object
}

export default function Home({userResponse, feedList, feedAuthorsResponse}:HomeProps) {
  return (
  <Fragment>
    <Head>
      <title>Home - Squera</title>
    </Head> 
    <UserProvider value={userResponse}>
      <Header/>
      <Flex grow={1}>
        {userResponse.token ? <UserFeedPage feedList={feedList} feedAuthorsResponse={feedAuthorsResponse}/>:<FrontPage/>}
      </Flex>
    </UserProvider>
  </Fragment>
 )
}

export async function getServerSideProps(context:any) {
  let feedList:PostInterface[] = [];
  let feedAuthorsResponse:any = {};
  let fARPromises:any = {};

  const originalcookie = context?.req?.headers?.cookie
  if (originalcookie == undefined) return {
    props: {
      feedList: [],
      feedAuthorsResponse: {},
      userResponse: {}
    }
  }
  const {token} = cookie.parse(originalcookie)

  const userResponse = await Authenticate(token);

  //FEED - POST RIGHT NOW
  
  if (userResponse?.token) {

    //GET POSTS FROM ME (WILL CHANGE LATER)
    feedList = await axios.get(rootServer+'/posts/curated/'+userResponse.userId, {
      headers: {
        Authorization: `Bearer ${sanitizeString(token)}`
      },
      params: {
        withList: 'true'
      }
    }).then(res => {
      return res.data.list
    }).catch(err => {
      console.log('Error!', err)
    });

    feedList?.map((feed) => {
      fARPromises[feed.createdBy] = axios.get(rootServer+'/users/'+feed.createdBy).then((res)=>res.data)
    })

    await Promise.all(Object.values(fARPromises)).then((values) => {
      values.map((res:any) => {
        feedAuthorsResponse[res.userId] = res
      })
    })
  }

  return {
    props: {
      userResponse,
      feedList,
      feedAuthorsResponse
    }
  }
}