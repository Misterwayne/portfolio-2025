'use client'

// Import the actual ChakraProvider
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"

// Your custom system definition
export const system = createSystem(defaultConfig, {
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
      <ChakraProvider value={system}> 
        {children}
      </ChakraProvider>
  )
}