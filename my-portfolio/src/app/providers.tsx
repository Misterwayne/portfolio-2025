'use client'

// Import the actual ChakraProvider
import { ChakraProvider,  extendTheme } from "@chakra-ui/react"

// Your custom system definition
export const system = extendTheme({
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Inter', sans-serif` },
        body: { value: `'Inter', sans-serif` }
      }
    }
  }
})

// Rename your function!
export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <ChakraProvider theme={system}> 
        {children}
      </ChakraProvider>
  )
}