import {  AlertDescription, AlertIcon, Alert, Link as Chakralink } from "@chakra-ui/react"
import Link from 'next/link'

export default function ProjectStatusAlert() {
  return <Alert borderRadius='lg'>
    <AlertIcon/>
    <AlertDescription>This site is currently on closed alpha. If in any case you encounter errors, <Link href="/support"><Chakralink  color="blue.500">please contact us by clicking here</Chakralink></Link>.</AlertDescription>
  </Alert>
}