import { Flex, Text, useColorMode } from "@chakra-ui/react"
import { Formik, Form, FormikHelpers } from 'formik';
import { DefaultInput } from '../DefaultInput';
import { DefaultGeoAPIInput } from '../DefaultGeoAPIInput';
import DefaultButton from "../DefaultButton";
import { FiArrowRight } from "react-icons/fi"

export interface RegisterSchool_PageOneValues {
  schoolName: string;
  geoCountry: string;
  geoCity: number;
}

interface Props {
  handleSuccess(values:RegisterSchool_PageOneValues): any
}

export const RegisterSchool_PageOne = ({handleSuccess, ...props}: Props) => {
  const { colorMode } = useColorMode()

  return (
    <Flex direction='column'>
      <Formik
        initialValues={{
          schoolName: '',
          geoCountry: '',
          geoCity: 0
        }}
        onSubmit={(
          values: RegisterSchool_PageOneValues,
          { setSubmitting }: FormikHelpers<RegisterSchool_PageOneValues>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            handleSuccess(values)
            setSubmitting(false);
          }, 500);
        }}
      >
          {
          ({values, handleChange, handleBlur, setFieldValue})=> (
            <Form>
              <Flex direction='column'>
                <Flex mb={1}>
                  <DefaultInput 
                    placeholder="School Name"
                    required
                    name='schoolName'
                    value={values.schoolName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Flex>
                <Flex>
                  <Text fontSize="sm" p='1em' color={colorMode === 'light' ? 'GrayText' : 'whiteAlpha.800'}>
                    Please enter the country below and click the button of the country to continue
                  </Text>
                </Flex>
                <DefaultGeoAPIInput
                  path={`/geo/countries?limit=5&offset=0&namePrefix=`}
                  placeholder="Country"
                  setFieldValue={setFieldValue}
                  disabled={values.geoCity > 0}
                />
                <Flex
                  display={values.geoCountry.length>0 ? 'initial':'none'}
                >
                  <DefaultGeoAPIInput
                    path={`/geo/cities?limit=5&offset=0&countryIds=${values.geoCountry}&namePrefix=`}
                    placeholder="City"
                    setFieldValue={setFieldValue}
                  />
                </Flex>
              </Flex>
              <DefaultButton 
                type='submit'
                icon={<FiArrowRight/>}
                colorScheme={colorMode === 'light' ? 'green' : 'gray'}
                color='white'
              >
                Next
              </DefaultButton>
            </Form>
          )
        }
      </Formik>
    </Flex>
  )
}