import * as React from 'react';
import { useDisclosure } from "@chakra-ui/react"
import { FiPlus } from "react-icons/fi"
import DefaultButton from "./DefaultButton"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { Fragment } from "react"
import { RegisterSchool_PageOne } from './RegisterSchool/PageOne';

const RegisterSchool = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <Fragment>
      <DefaultButton icon={<FiPlus/>} onClick={onOpen}>Register School</DefaultButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Register School</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RegisterSchool_PageOne handleSuccess={() => {
            
          }}/>
        </ModalBody>

        <ModalFooter>
        </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  )
}

export default RegisterSchool