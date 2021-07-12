import { Flex, Text } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, Avatar, Button, useColorMode, useDisclosure } from "@chakra-ui/react"
import { Dispatch, DispatchWithoutAction, useContext } from "react"
import UserContext from "../utils/user-context"
import { UserResponse } from "../utils/UserResponse"
import { Formik, Form, FormikHelpers } from "formik"
import { Textarea } from "@chakra-ui/textarea"
import { Checkbox } from "@chakra-ui/checkbox"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import { Fragment } from "react"
import TextareaAutosize from 'react-autosize-textarea';
import { useRef } from "react"
import axios from "axios"
import { rootServer } from "../utils/server"
import { PostInterface } from "./Post"

interface CreatePostProps {
  handleSuccess: (post:PostInterface) => void
}

interface PostValues {
  text: string,
  isAnon: boolean
}

export default function CreatePost({handleSuccess}:CreatePostProps) {
  const userResponse:UserResponse = useContext(UserContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const placeholder = `What's on your mind, ${userResponse.username}?`
  const initialRef=useRef<HTMLTextAreaElement>(null)
  const { colorMode } = useColorMode()
  
  async function onSubmit(values:PostValues, {setSubmitting, setStatus}:FormikHelpers<any>) {
    try {
      const result = await axios.post(rootServer+'/posts/add', values, {
        headers: {
          Authorization: `Bearer ${userResponse.token}`
        }
      })
      handleSuccess(result.data.post)
    } catch(err) {
      setStatus({
        err: err.response.data,
        status: err.response.status
      })
    } finally {
      setSubmitting(false)
      onClose()
    }
  }

  return (
    <Fragment>
      
      <Flex grow={1} padding={4}>
        <Flex>
          <Avatar name={userResponse.username} />
        </Flex>
        <Button bg='blackAlpha.300' w='100%' h='48px' padding={1} borderRadius='2xl' mx={3}  justifyContent="flex-start" onClick={onOpen}>
          <Text fontSize='lg' px={4} fontWeight='medium' color={colorMode === 'light' ? 'blackAlpha.500':'whiteAlpha.700'} >{placeholder}</Text>
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={true} initialFocusRef={initialRef} isCentered>
        <ModalOverlay />
        
          <ModalContent m={2}>
                <ModalHeader dalHeader fontSize='2xl' textAlign='center'>Create Post</ModalHeader>
                <ModalCloseButton />
              
                <ModalBody>
                  <Formik
                    initialValues={{text: '', isAnon: false}}
                    onSubmit={onSubmit}
                  >
                    {({isSubmitting, status, values, handleChange}) => 
                      <Form>
                        {
                          status?.err && <Alert status='warning'>
                            <AlertIcon />
                            <AlertDescription> {status.err} </AlertDescription>
                          </Alert>
                        }
                        <Textarea 
                          as={TextareaAutosize}
                          mt={2}
                          size='md'
                          value={values['text']}
                          onChange={handleChange}
                          resize='none'
                          placeholder={placeholder}
                          name='text'
                          border='none'
                          fontWeight='medium'
                          fontSize='lg'
                          maxHeight='20rem'
                          ref={initialRef}
                        />
                        <Flex>
                          <Checkbox mr={3} name='isAnon' isChecked={values['isAnon']} onChange={handleChange}>
                            Anonymize
                          </Checkbox>
                          <Button
                            colorScheme="blue"
                            w='100%'
                            type='submit'
                            mt={2}
                            disabled={isSubmitting}
                            isLoading={isSubmitting}
                          >
                            Post
                          </Button>
                        </Flex>
                      </Form>
                    }
                  </Formik>
                </ModalBody>
          </ModalContent>
      </Modal>

    </Fragment>
  )
}