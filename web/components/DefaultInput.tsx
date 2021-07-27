import { Box, Button, HTMLChakraProps, Input, ThemingProps, Tooltip, useColorMode } from "@chakra-ui/react"
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
  value?: string | number | FileList
  onClear?: () => void
  error?: string | undefined
  noFormik?: boolean
}

type Props = DefaultInputProps & HTMLChakraProps<"input"> & ThemingProps<"input">


export const DefaultInput = ({noFormik, error, onClear, children, as, placeholder, type, required, name, onChange, onBlur, value='', ...props}:Props ) => {
  // @ts-ignore
  const [ onMiddle, setOnMiddle ] = useState(type === 'string' ? !(value.length > 0):false);
  const [ deepValue, setDeepValue ] = useState(value)
  const { colorMode } = useColorMode()

  const Validate = (focus:boolean) => {
    if (type === 'file')
      return;

    if (type === 'number') {
      if (focus) {
        setOnMiddle(false)
      } else {
        // @ts-ignore
        if (deepValue > 0) setOnMiddle(false)
        else setOnMiddle(true)
      }
    }

    if (focus) {
      setOnMiddle(false)
    } else {
      // @ts-ignore
      if (deepValue.length > 0) setOnMiddle(false)
      else setOnMiddle(true)
    }
  }

  useEffect(()=> {
    setDeepValue(value)
  }, [value])

  return (
  <Tooltip label={error} hasArrow placement='left' bg="red.600" color='white' isOpen>
    <Box w="100%" h={type === "file" ? "72px":"48px"} position='relative'>
      <Box 
        as='span'
        position='absolute'
        fontSize='sm'
        top={type==='file' ? '.25em' : onMiddle ? '50%' : '0'}
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
      {
        onClear && <Button
          position='absolute'
          zIndex={999}
          colorScheme='red'
          right= '.5em'
          top='50%'
          transform={'translate(0, -50%)'}
          borderRadius='full'
          onClick={onClear}
        >
          <FiX/>
        </Button>
      }
        <Input 
          as={noFormik ? undefined:Field}
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
          h={type === "file" ? "72px":"48px"}
          pt={type==="file" ? "1.75em":"1em"}
          bgColor='blackAlpha.50'
          {...props}
        >
          {children}
        </Input>
    </Box>
  </Tooltip>
  )
}