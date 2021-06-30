import { Button, ButtonOptions, HTMLChakraProps } from "@chakra-ui/react";
import { ThemingProps } from "@chakra-ui/system";
import { ReactElement } from "react";
import styles from "../styles/default.module.css";

interface DefaultButtonProps {
  children?: any;
  icon?: ReactElement<any, any>;
}

type Props = DefaultButtonProps & HTMLChakraProps<"button"> & ThemingProps<"Button"> & ButtonOptions

const DefaultButton = ({children, icon, ...otherProps}:Props) => {

  return (<Button 
    justifyContent={'flex-start'}
    w={'100%'}
    h={'48px'}
    marginBottom={'.5rem'}
    paddingY={'1.5rem'}
    {...otherProps}
  >
    {
      <span className={styles.icon}>
        {icon} 
      </span>
    }
      {children}
  </Button>)
}

export default DefaultButton;