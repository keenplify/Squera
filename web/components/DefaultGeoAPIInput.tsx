import { ComponentWithAs, Flex, InputProps } from "@chakra-ui/react"
import axios from "axios";
import { InputHTMLAttributes, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { geoDBServer } from "../utils/server";
import DefaultButton from "./DefaultButton";
import { DefaultInput } from "./DefaultInput"

export interface valueResult {
  data: Country[] | City[]
  links: Link[]
  metadata: {
    currentOffset: number
    totalCount: number
  }
}

export interface Link {
  rel: string,
  href: string
}

export interface Country {
  code: string
  currencyCodes: string[]
  name: string
  wikiDataId: string
  id?: number
  countryCode?: string
}

export interface City {
  id: number
  name: string
  wikiDataId: string
  code?: number
  countryCode: string
} 

interface Props {
  path: string,
  placeholder: string
  setFieldValue: any
  disabled?: boolean
}

export const DefaultGeoAPIInput = ({path, placeholder, setFieldValue, disabled, ...props}:Props) => {
  const [deepValue, setDeepValue] = useState('');
  const [debouncedValue] = useDebounce(deepValue, 1000);
  const [valueResults, setValueResults] = useState<valueResult>()
  const [finalValue, setFinalValue] = useState('');
  const name = `geo${placeholder}`


  useEffect(()=> {
    if (debouncedValue.length <= 0)
      return
    
    axios.get(geoDBServer + path + debouncedValue)
    .then((res)=> {
      setValueResults(res.data)
    })
  }, [debouncedValue])

  return <Flex 
    grow={1}
    direction='column'
    borderRadius='md'
    mb='1em'
  >
    <input 
      type="hidden"
      style={{display: 'none'}}
      name={name}
    />
    <Flex mb={1}>
      <DefaultInput 
        onChange={e => setDeepValue(e.target.value)}
        value={finalValue.length>0 ? finalValue : deepValue}
        placeholder={placeholder}
        name={`selectgeo${placeholder.replace(/\s/g, '')}`}
        {...props}
        disabled={finalValue.length>0}
        onClear={!disabled && finalValue.length>0 ? (()=>{
          setFinalValue('')
          setFieldValue(name, '')
        }):undefined}
      />
    </Flex>
    {
      finalValue.length<=0 && (
        <Flex direction='column'>
          {valueResults?.data.map((value, key)=> {
            return(
            <DefaultButton 
              key={key}
              icon={value.code ?? value.countryCode}
              onClick={()=>{
                setFieldValue(name, value.code ?? value.id)
                setFinalValue(value.name)
              }}
              disabled={disabled}
            >
              {value.name}
            </DefaultButton>
            )
          })}
        </Flex>
      )
    }
  </Flex>
}