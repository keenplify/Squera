import { Flex, Box, Popover, PopoverContent, PopoverTrigger, PopoverBody, useColorMode } from "@chakra-ui/react";
import { useContext } from "react";
import { Avatar } from "@chakra-ui/react"
import { FiHome, FiMessageCircle, FiSettings, FiLogOut, FiBox, FiSun, FiMoon } from 'react-icons/fi'
import Cookies from "universal-cookie";
import UserContext from "../utils/user-context";
import { UserResponse } from "../utils/UserResponse";
import DefaultButton from './DefaultButton'
import { Fragment } from "react"

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const logout = () => {
    const Cookie = new Cookies();
    Cookie.remove('token');
    window.location.href='/'
  }

  const userResponse:UserResponse = useContext(UserContext)

  return <Fragment>
    <Box
      position={'fixed'}
      width={'100%'}
      height={'80px'}
      backgroundColor={colorMode === 'light' ? 'white':'gray.900'}
      borderBottom={'1px'}
      borderColor={'gray.500'}
      boxShadow={'lg'}
      zIndex='999'
    >
      <Flex height={'80px'} >
      <Flex ml={'1rem'} flexDir='row'  alignItems='center'>
          <Flex alignItems='center'>
          {
            (userResponse.username) ? <Popover>
              <PopoverTrigger>
                <Flex as='button' height='72px' borderRadius='lg' alignItems='center' px='1em' _hover={{
                  background: (colorMode === 'light') ? 'blackAlpha.200':'whiteAlpha.200'
                }}>
                <Flex alignItems='center'>
                    <Avatar name={userResponse.username} />
                  </Flex>
                  <Flex flexDir='column' justifyContent='center' paddingLeft='8px' fontSize='sm'>
                    {
                      (userResponse.username) && 
                      <>
                        <Flex fontWeight='medium' suppressHydrationWarning>
                          {userResponse.userId}
                        </Flex>
                        <Flex color='GrayText' suppressHydrationWarning>
                        @{userResponse?.username}
                        </Flex>
                      </>
                    }
                  </Flex>
                </Flex>
              </PopoverTrigger>
              <PopoverContent w="335px" borderRadius='5px' border='1px' boxShadow='2xl' color='black' mt='.25em' ml='.5rem'>
                <PopoverBody>
                    <DefaultButton icon={<FiHome/>} >Home</DefaultButton>
                    <DefaultButton icon={<FiMessageCircle/>}>Messages</DefaultButton>
                    <DefaultButton icon={<FiSettings/>}>Account & Settings</DefaultButton>
                    <DefaultButton icon={colorMode === 'light' ? <FiMoon />: <FiSun />} onClick={toggleColorMode}>Toggle Color Mode</DefaultButton>
                    <DefaultButton icon={<FiLogOut/>} onClick={logout}>Logout</DefaultButton>
                </PopoverBody>
              </PopoverContent>
            </Popover> :
            <Flex w="48px" h="48px" backgroundColor="gray.400" borderRadius="50%" alignSelf='center' fontSize='38px' padding='6px' color='white'>
              <FiBox />
            </Flex>
          }
          </Flex>
        </Flex>
      </Flex>      
    </Box>
    <Flex grow={1} height='80px' visibility='hidden'/>
  </Fragment>
}

export default Header