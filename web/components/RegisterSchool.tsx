import * as React from 'react';
import { Flex, useDisclosure } from "@chakra-ui/react"
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
import { GrNext } from "react-icons/gr"
import { Formik, Field, Form, FormikHelpers } from 'formik';


interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

export const RegisterSchool = () => {
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
          <Flex direction='column'>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
              }}
              onSubmit={(
                values: Values,
                { setSubmitting }: FormikHelpers<Values>
              ) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 500);
              }}
            >
              <Form>
                <Flex>
                  <label htmlFor="firstName">First Name</label>
                  <Field id="firstName" name="firstName" placeholder="John" />
                </Flex>

                <Flex>
                  <label htmlFor="lastName">Last Name</label>
                  <Field id="lastName" name="lastName" placeholder="Doe" />
                </Flex>

                <Flex>
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    placeholder="john@acme.com"
                    type="email"
                  />
                </Flex>

                <DefaultButton type='submit' icon={<GrNext/>}>Next</DefaultButton>
              </Form>
            </Formik>
          </Flex>
        </ModalBody>

        <ModalFooter>
        </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  )
}