import { Box, HTMLChakraProps, Input, ThemingProps, useColorMode } from "@chakra-ui/react"
import { Field } from "formik";
import { useRef } from "react";
import { useState } from "react";

interface DefaultInputProps{
  children?: any
  placeholder: string | undefined
  type?: string
  required?: boolean
  name?: string
}

type Props = DefaultInputProps & HTMLChakraProps<"input"> & ThemingProps<"input">


export const DefaultInput = ({children, as, placeholder, type, required, name, onChange, onBlur, ...props}:Props ) => {
  const [ onMiddle, setOnMiddle ] = useState(true);
  const [ value, setValue ] = useState('')
  const { colorMode } = useColorMode()

  const Validate = (focus:boolean) => {
    if (focus) {
      setOnMiddle(false)
    } else {
      if (value.length > 0) setOnMiddle(false)
      else setOnMiddle(true)
    }
  }

  return (
  <Box w="100%" position='relative'>
    <Box 
      as='span'
      position='absolute'
      fontSize='sm'
      top={onMiddle ? '50%' : '0'}
      left={onMiddle ? '24px': '16px'}
      transitionProperty='all'
      transitionDuration='.1s'
      transform={onMiddle ? 'translate(0, -50%)':''}
      fontWeight='medium'
      color={colorMode === 'light' ? 'blackAlpha.600':'whiteAlpha.600'}
    >{placeholder}</Box>
    <Input 
      paddingTop='1em'
      as={Field}
      placeholder={placeholder}
      _placeholder={{
        color:'transparent'
      }}
      onMouseEnter={()=> setOnMiddle(false)}
      onMouseLeave={(event)=> Validate((event.currentTarget === document.activeElement))}
      onChange={(event)=> {
        onChange?.(event)
        setValue(event.target.value)
        Validate(true)
      }}
      onFocus={()=>Validate(true)}
      onBlur={(event) => {
        onBlur?.(event)
        Validate(false)
      }}
      value={value}
      type={type}
      required={required}
      name={name}
      h='48px'
    >
      {children}
    </Input>
  </Box>
  )
}