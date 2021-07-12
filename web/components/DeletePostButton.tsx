
import { Dispatch, Fragment, SetStateAction, useContext, useState } from "react";
import { Text, Button } from "@chakra-ui/react"
import DefaultButton from './DefaultButton'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { PostInterface } from "./Post";
import axios from "axios";
import { rootServer } from "../utils/server";
import UserContext from "../utils/user-context";
import { UserResponse } from "../utils/UserResponse";
import { FiTrash2 } from "react-icons/fi"

interface DeletePostButtonInterface {
  parsedDate: any
  post: PostInterface
  handleSuccess: (id:string)=>void
}

export const DeletePostButton = ({post, parsedDate, handleSuccess}:DeletePostButtonInterface) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading ] = useState(false)
  const userResponse:UserResponse = useContext(UserContext)

  const deletePost = () => {
    setLoading(true)
    
    axios.delete(rootServer+'/posts/'+post._id, {
      headers: {
        Authorization: `Bearer ${userResponse.token}`
      },
      params: {
        withList: true
      }
    })
    .then(() => {
      handleSuccess(post._id)
      setLoading(false)
      onClose()
    })
  }

  return (
    <Fragment>
      <DefaultButton bgColor='red.500' _hover={{bg:'red.600'}} color='white' w='100%' onClick={onOpen} icon={<FiTrash2/>}>Delete Post</DefaultButton>
      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Delete Post?</ModalHeader>
          <ModalCloseButton isDisabled={loading}/>
          <ModalBody>
            <Text>
              Are you sure to delete this post you've made on {parsedDate}?
            </Text>
          </ModalBody>
          <ModalFooter>
          <Button variant='ghost' mr={3} onClick={onClose} isDisabled={loading}>
            Close
          </Button>
          <Button bgColor='red.500' color='white' _hover={{bg:'red.600'}} isDisabled={loading} isLoading={loading} onClick={deletePost}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  )
}