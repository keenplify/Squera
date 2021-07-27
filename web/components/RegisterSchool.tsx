import * as React from 'react';
import { Flex, ModalBody, Text, useDisclosure } from "@chakra-ui/react"
import { FiPlus } from "react-icons/fi"
import DefaultButton from "./DefaultButton"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react"
import { Fragment } from "react"
import { RegisterSchool_PageOne } from './RegisterSchool/PageOne';
import { useState } from 'react';
import { RegisterSchool_PageTwo } from './RegisterSchool/PageTwo';

interface CollectedData {
  schoolId?: string,
  branchId?: string
  imageId?: string
}

const RegisterSchool = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ collectedData, setCollectedData ] = useState<CollectedData>({});
  const [ page, setPage ] = useState(0);
  console.log(collectedData)
  const handleSuccess=(values:any) => {
    setCollectedData({...collectedData, ...values})
    setPage(page+1);
  }

  const handleBack = () => setPage(page-1)

  const renderPage = ()=> {
    switch(page) {
      case 0: 
        return <RegisterSchool_PageOne handleSuccess={handleSuccess}/>;
      case 1:
        return <RegisterSchool_PageTwo schoolId={collectedData.schoolId} handleSuccess={handleSuccess} handleBack={handleBack}/>;
      case 2:
        return <ModalBody>
          <Text p='2em'>
            Please wait while we are submitting your school data...
          </Text>
        </ModalBody>
    }
  }

  return (
    <Fragment>
      <DefaultButton icon={<FiPlus/>} onClick={onOpen}>Register School</DefaultButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Register School</ModalHeader>
        <ModalCloseButton />
        {renderPage()}
        </ModalContent>
      </Modal>
    </Fragment>
  )
}

export default RegisterSchool