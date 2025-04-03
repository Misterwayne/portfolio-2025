// src/app/layout.tsx
'use client';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Header from '@/components/Layout/Header'; // Assuming Header exists
import { Box } from '@chakra-ui/react';
import '@/app/globals.css'; // Import global styles
import FixedProfilePic from '@/components/Layout/ProfilePicture';
import React from 'react';
import Home from './page';
import { ChatProvider } from '@/context/ChatContext';
const inter = Inter({ subsets: ['latin'] });

// Estimate or define header height (replace with actual or dynamic value if possible)
const HEADER_HEIGHT = '35px'; // Example height - adjust based on your actual Header component padding/height

export default function RootLayout({
}: Readonly<{
  children: React.ReactNode;
}>) {

// Function for FixedProfilePic to clear the message after sending
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ChatProvider>
            <Header />
            <Box as="main">
              <Home />
            </Box>
            <FixedProfilePic />
          </ChatProvider>
        </Providers>
      </body>
    </html>
  );
}

// Re-export header height if needed elsewhere, or manage via theme/context
export { HEADER_HEIGHT };