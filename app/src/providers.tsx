'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import myTheme from './theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ColorModeScript initialColorMode={myTheme.config.initialColorMode} />
      <ChakraProvider theme={myTheme}>{children}</ChakraProvider>
    </CacheProvider>
  )
}
