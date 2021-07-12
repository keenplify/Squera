import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react'
import Head from 'next/head'

//AppProps
function MyApp({ Component, pageProps }:AppProps) {
  return <ChakraProvider>
    <Head>
      <meta name="og:description" content="Next app for https://github.com/keenplify/Eskwela" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
