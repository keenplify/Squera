import { Alert } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Fragment } from "react";
import Header from "../../components/Header";
import { Authenticate } from "../../utils/authenticate";
import { UserProvider } from "../../utils/user-context";
import { UserResponse } from "../../utils/UserResponse";
import cookie from "cookie";
import { FlexFeed } from "../../components/FlexFeed";
import { Feed } from "../../components/Feed";
import ProjectStatusAlert from "../../components/ProjectStatusAlert"
import { SchoolsFollowedList } from "../../components/SchoolsFollowedList";

interface SchoolProps {
  userResponse: UserResponse
}

export default function Schools({userResponse}:SchoolProps) {
  return (
    <Fragment>
      <Head>
        <title>School - Squera</title>
      </Head> 
      <UserProvider value={userResponse}>
        <Header/>
        <FlexFeed.Container>
          <FlexFeed.Left>
            <SchoolsFollowedList />
          </FlexFeed.Left>
          <FlexFeed.Middle>
            <Feed>
              <Alert>
                <ProjectStatusAlert/>
              </Alert>
            </Feed>
          </FlexFeed.Middle>
          <FlexFeed.Right>
            rightaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </FlexFeed.Right>
        </FlexFeed.Container>
      </UserProvider>
  </Fragment>
  )
}

export async function getServerSideProps(context:any) {
  const originalcookie = context?.req?.headers?.cookie
  if (originalcookie == undefined) return {
    props: {
      userResponse: {}
    }
  }
  const {token} = cookie.parse(originalcookie)

  const userResponse = await Authenticate(token);

  return {
    props: {
      userResponse
    }
  }
}