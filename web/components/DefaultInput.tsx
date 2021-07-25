import { Box, Button, HTMLChakraProps, Input, ThemingProps, useColorMode } from "@chakra-ui/react"
import { Field } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { FiX } from "react-icons/fi";

interface DefaultInputProps{
  children?: any
  placeholder: string | undefined
  type?: string
  required?: boolean
  name?: string
  value?: string
  onClear?: () => void
}

type Props = DefaultInputProps & HTMLChakraProps<"input"> & ThemingProps<"input">


export const DefaultInput = ({onClear, children, as, placeholder, type, required, name, onChange, onBlur, value='', ...props}:Props ) => {
  const [ onMiddle, setOnMiddle ] = useState(!(value.length > 0));
  const [ deepValue, setDeepValue ] = useState(value)
  const { colorMode } = useColorMode()

  const Validate = (focus:boolean) => {
    if (focus) {
      setOnMiddle(false)
    } else {
      if (deepValue.length > 0) setOnMiddle(false)
      else setOnMiddle(true)
    }
  }

  useEffect(()=> {
    setDeepValue(value)
  }, [value])

  return (
  <Box w="100%" h="48px" position='relative'>
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
      color={colorMode === 'light' ? 'blackAlpha.600':'whiteAlpha.800'}
      pointerEvents='none'
      userSelect='none'
      zIndex={999}
    >{placeholder}</Box>
    <Button
      position='absolute'
      zIndex={999}
      colorScheme='red'
      right= '.5em'
      top='50%'
      transform={'translate(0, -50%)'}
      borderRadius='full'
      display={onClear ? 'initial':'none'}
      onClick={onClear}
    >
      <FiX/>
    </Button>
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
        setDeepValue(event.target.value)
        Validate(true)
      }}
      onFocus={()=>Validate(true)}
      onBlur={(event) => {
        onBlur?.(event)
        Validate(false)
      }}
      value={deepValue}
      type={type}
      required={required}
      name={name}
      h='48px'
      bgColor='blackAlpha.50'
      {...props}
    >
      {children}
    </Input>
  </Box>
  )
}