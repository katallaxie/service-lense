import { theme } from '@chakra-ui/pro-theme'
import { extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/inter'

const proTheme = extendTheme(theme)

const extenstion = {
  colors: { ...proTheme.colors, brand: proTheme.colors.teal },
  fonts: {
    heading: "'Inter Variable', -apple-system, system-ui, sans-serif",
    body: "'Inter Variable', -apple-system, system-ui, sans-serif"
  },
  initialColorMode: 'system',
  useSystemColorMode: true
}

const myTheme = extendTheme(extenstion, proTheme)

export default myTheme
