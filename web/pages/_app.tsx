import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
// import { MainGradientColor } from '../utils/colors'

//AppProps
function MyApp({ Component, pageProps }:AppProps) {
  return <ChakraProvider>
    <Head>
      <meta name="og:description" content="Next app for https://github.com/keenplify/Eskwela" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
