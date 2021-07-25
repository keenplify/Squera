import { Box, Button, ButtonOptions, HTMLChakraProps, Text, useColorMode } from "@chakra-ui/react";
import { ThemingProps } from "@chakra-ui/system";
import { ReactElement } from "react";

interface DefaultButtonProps {
  children?: any;
  icon?: ReactElement<any, any> | (() => void) | string | number;
  customIcon?: any;
}

type Props = DefaultButtonProps & HTMLChakraProps<"button"> & ThemingProps<"Button"> & ButtonOptions

const DefaultButton = ({children, icon, customIcon, ...otherProps}:Props) => {
  const { colorMode } = useColorMode()

  return (<Button 
    justifyContent={'flex-start'}
    w={'100%'}
    h={'48px'}
    marginBottom={'.5rem'}
    color={colorMode === 'light' ? 'black':'white'}
    {...otherProps}
  >
    {
      icon && <Box 
        as='span'
        display='flex'
        padding='8px'
        borderRadius='50%'
        bgColor={colorMode==='light'?'blackAlpha.700':'whiteAlpha.200'}
        fontSize='1em'
        color='white !important'
        w='35px'
        h='35px'
        alignItems='center'
        justifyContent='center'
      >
        {icon}
      </Box>
    }
    {customIcon}
    <Box w='16px'/>
    {children}
  </Button>)
}

export default DefaultButton;