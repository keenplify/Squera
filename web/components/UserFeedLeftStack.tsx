import DefaultButton from './DefaultButton'
import {IoSchool} from 'react-icons/io5'
import Link from "next/link";
import { Stack } from "@chakra-ui/react"
import { FiUsers, FiMessageSquare } from 'react-icons/fi'
export const UserFeedLeftStack = () => {
  return (
    <Stack spacing={0} padding='1em'>
      <Link href='/schools'>
        <a>
          <DefaultButton 
            icon={<IoSchool/>}
            bgColor='initial'
          >
            Schools
          </DefaultButton>
        </a>
      </Link>
      <Link href='/schools'>
        <a>
          <DefaultButton 
            icon={<FiUsers/>}
            bgColor='initial'
          >
            Friends
          </DefaultButton>
        </a>
      </Link>
      <Link href='/chat'>
        <a>
          <DefaultButton 
            icon={<FiMessageSquare/>}
            bgColor='initial'
          >
            Chat
          </DefaultButton>
        </a>
      </Link>
    </Stack>
  )
}