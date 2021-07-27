import { Flex, ModalBody, Text, useColorMode } from "@chakra-ui/react"
import { Formik, Form, FormikHelpers } from 'formik';
import { DefaultInput } from '../DefaultInput';
import { DefaultGeoAPIInput } from '../DefaultGeoAPIInput';
import DefaultButton from "../DefaultButton";
import { FiArrowRight } from "react-icons/fi"
import * as Yup from "yup";
import axios from "axios";
import { rootServer } from "../../utils/server";
import { sanitizeString } from "../../utils/sanitize";
import { UserResponse } from "../../utils/UserResponse";
import { useContext } from "react";
import UserContext from "../../utils/user-context";
import { ErrorParser } from "../../utils/ErrorParser";

export interface RegisterSchool_PageOneValues {
  name: string;
  geoCityId: string;
  geoCountryCode: string;
  branchName: string;
}

const PageOneSchema = Yup.object().shape({
  name: Yup.string()
  .required('Required'),
  geoCountryCode: Yup.string()
  .required('You must select a country below!'),
  geoCityId: Yup.string()
  .required('You must select a city below!'),
  branchName: Yup.string()
  .required('Required'),
});

interface Props {
  handleSuccess(values:RegisterSchool_PageOneValues): any
}

export const RegisterSchool_PageOne = ({handleSuccess, ...props}: Props) => {
  const { colorMode } = useColorMode()
  const userResponse:UserResponse = useContext(UserContext)

  return (
    <ModalBody>
      <Flex direction='column'>
        <Formik
          initialValues={{
            name: '',
            geoCityId: '',
            geoCountryCode: '',
            branchName: ''
          }}
          validationSchema={PageOneSchema}
          onSubmit={(
            values: RegisterSchool_PageOneValues,
            { setErrors, setSubmitting }:FormikHelpers<RegisterSchool_PageOneValues>
          ) => {
            setTimeout(() => {
              axios.post(rootServer+'/schools/add', {
                name: values.name
              }, {
                headers: {
                  Authorization: `Bearer ${sanitizeString(userResponse.token)}`
                }
              }).then((res)=> {
                const errors = ErrorParser(res)
                if (errors.length > 0) {
                  setErrors(errors)
                  setSubmitting(false)
                } else {
                  axios.post(rootServer+'/branches/add', {
                    name: values.branchName,
                    geoCityId: values.geoCityId,
                    geoCountryCode: values.geoCountryCode,
                    schoolId: res.data.schoolId
                  }, {
                    headers: {
                      Authorization: `Bearer ${sanitizeString(userResponse.token)}`
                    }
                  })
                  .then((res2)=> {
                    const errors2 = ErrorParser(res2)
                    if (errors2.length > 0) {
                      setErrors(errors2)
                      setSubmitting(false)
                    } else {
                      handleSuccess({...res.data, ...res2.data})
                    }
                  })
                }
              })
            }, 500);
          }}
        >
            {
            ({values, handleChange, handleBlur, setFieldValue, isSubmitting, isValid, errors})=> (
              <Form>
                <Flex direction='column'>
                  <Flex mb={1}>
                    <DefaultInput 
                      placeholder="School Name"
                      required
                      name='name'
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.name}
                    />
                  </Flex>
                  <Flex>
                    <Text fontSize="sm" p='1em' color={colorMode === 'light' ? 'GrayText' : 'whiteAlpha.800'}>
                      Please also specify your current branch name, country and city to to continue
                    </Text>
                  </Flex>
                  <Flex mb={'1em'}>
                    <DefaultInput 
                      placeholder="Branch Name"
                      required
                      name='branchName'
                      value={values.branchName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.branchName}
                    />
                  </Flex>
                  <DefaultGeoAPIInput
                    path={`/geo/countries?limit=5&offset=0&namePrefix=`}
                    placeholder="Country"
                    setFieldValue={setFieldValue}
                    disabled={values.geoCityId.length > 0 || isSubmitting}
                    error={errors.geoCountryCode}
                    name='geoCountryCode'
                  />
                  {
                    values.geoCountryCode.length > 0 && (
                      <DefaultGeoAPIInput
                        path={`/geo/cities?limit=5&offset=0&countryIds=${values.geoCountryCode}&namePrefix=`}
                        placeholder="City"
                        setFieldValue={setFieldValue}
                        error={errors.geoCityId}
                        name='geoCityId'
                        disabled = {isSubmitting}
                      />
                    )
                  }
                </Flex>
                <DefaultButton 
                  type='submit'
                  icon={<FiArrowRight/>}
                  colorScheme={colorMode === 'light' ? 'green' : 'gray'}
                  color='white'
                  disabled={isSubmitting || !isValid}
                >
                  Next
                </DefaultButton>
              </Form>
            )
          }
        </Formik>
      </Flex>
    </ModalBody>
  )
}