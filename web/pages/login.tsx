import { Flex, Box, Heading, Input, Alert, AlertDescription, AlertIcon } from "@chakra-ui/react";
import Head from 'next/head'
import DefaultButton from "../components/DefaultButton";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { useRouter } from 'next/router'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from "@chakra-ui/react"

import { useEffect, useState } from 'react'
import axios from "axios";
import { rootServer } from "../utils/server";
import { Form, Formik, Field } from 'formik';
import Cookies from "universal-cookie";

const Login = () => {
  const router = useRouter()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [error, setError] = useState()
  useEffect(() => onOpen(), [onOpen]) //Open drawer on load

  const SubmitLoginForm = (values:any, {setSubmitting}:any) => {
    axios.post(rootServer+'/users/login', values)
    .then((res)=>{
      setSubmitting(false)
      const Cookie = new Cookies();
      Cookie.set('token', res.data?.token);
      window.location.href='/'
    })
    .catch((err) => {
      setError(err.message)
      setSubmitting(false)
    })
  }

  return (
  <Flex alignItems='center' justifyContent='center' mt='1rem'>
    <Head>
      <title>Login - Squera</title>
    </Head>

      <Formik
        initialValues={{username:'', password: ''}}
        onSubmit={SubmitLoginForm}
      >
        {
          ({isSubmitting}) => {
            return (
            <Box as={Form} width='317px' background='white' borderRadius='md' padding='16px' boxShadow='2xl'>
              <Flex justify='center' mb='1rem'>
                <Heading size={'md'}>Login</Heading>
              </Flex>
              {
                error && <Flex  mb='.5rem'>
                  <Alert status='error'>
                    <AlertIcon/>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </Flex>
              }
              <Flex mb='.5rem'>
                <Input as={Field} placeholder='Username / Email' h='48px' required name='username'/>
              </Flex>
              <Flex mb='.5rem'>
                <Input as={Field} placeholder='Password' type='password' h='48px' required name='password'/>
              </Flex>
              <Flex>
                <DefaultButton icon={<FiLogIn/>} backgroundColor='#1877f2' color='white' type='submit' isLoading={isSubmitting} disabled={isSubmitting}>Login</DefaultButton>
              </Flex>
              <Flex >
                <DefaultButton icon={<FiUserPlus/>} backgroundColor='#42b72a' color='white' onClick={()=>router.push('/register')} isLoading={isSubmitting} disabled={isSubmitting}>Register</DefaultButton>
              </Flex>
            </Box>
          )
          }
        }
      </Formik>

    <Drawer
        isOpen={isOpen}
        placement='bottom'
        onClose={onClose}
      >
        <DrawerOverlay/>
        <DrawerContent>
          <DrawerCloseButton/>
          <DrawerHeader><b>[DEV]</b> You can now use a test account!</DrawerHeader>
          <DrawerBody>
            <b>username:</b> testuser <br/><b>password:</b> aczellcute
          </DrawerBody>
        </DrawerContent>
      </Drawer>
  </Flex>)
}



export default Login