import { Box, Button, ButtonOptions, HTMLChakraProps, useColorMode } from "@chakra-ui/react";
import { ThemingProps } from "@chakra-ui/system";
import { ReactElement } from "react";

interface DefaultButtonProps {
  children?: any;
  icon?: ReactElement<any, any> | (() => void);
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
    paddingY={'1.5rem'}
    bgColor={'200'}
    color={colorMode === 'light' ? 'black':'white'}
    {...otherProps}
  >
    {
      icon && <Box 
        as='span' 
        bgColor={colorMode==='light'?'blackAlpha.700':'whiteAlpha.200'}
        padding='8px'
        borderRadius='50%'
        color='white'
        minW='32px'
        minH='32px'
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