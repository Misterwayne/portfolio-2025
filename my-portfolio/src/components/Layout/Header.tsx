// src/components/Layout/Header.tsx
'use client';

import { Box, Flex, Heading, Link as ChakraLink, Spacer, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { personalInfo } from '@/data/dummyData';
import { HEADER_HEIGHT } from '@/app/layout'; // Use the defined height

const Header = () => {
  const bgColor =  'blackAlpha.800' // Use alpha for backdrop blur effect
  const borderColor = 'gray.700';

  return (
    <Box
      as="header"
      position="sticky" // Or "fixed"
      top="0"
      left="0"
      right="0"
      zIndex="sticky" // Ensure it's above other content
      width="100%"
      bg={bgColor}
      backdropFilter="blur(10px)" // Nice modern effect
      borderBottom="1px"
      borderColor={borderColor}
      // Use the defined height - important for layout calculation
      h={HEADER_HEIGHT}
      // Add padding directly here instead of relying on outer layout
      px={8}
      // Use Flex to vertically center items within the fixed height
      display="flex"
      alignItems="center"
    >
      {/* Flex container for the content */}
      <Flex align="center" width="100%" maxW="container.xl" mx="auto">
        <NextLink href="/" passHref legacyBehavior>
          <ChakraLink _hover={{ textDecoration: 'none' }} color={'white'}>
            <Heading size="md">{personalInfo.name.split(' ')[0]}</Heading>
          </ChakraLink>
        </NextLink>
        <Spacer />
        {/* Add Navigation Links if needed, ensure they link to #sectionId */}
        <Stack direction="row" gap={4} >
           <NextLink href="#hero" passHref legacyBehavior><ChakraLink color={'white'}>Hero</ChakraLink></NextLink>
           <NextLink href="#about" passHref legacyBehavior><ChakraLink color={'white'}>About</ChakraLink></NextLink>
           <NextLink href="#experience" passHref legacyBehavior><ChakraLink color={'white'}>Experience</ChakraLink></NextLink>
           <NextLink href="#education" passHref legacyBehavior><ChakraLink color={'white'}>Education</ChakraLink></NextLink>
           <NextLink href="#projects" passHref legacyBehavior ><ChakraLink color={'white'}>Projects</ChakraLink></NextLink>
           <NextLink href="#skills" passHref legacyBehavior><ChakraLink color={'white'}>Skills</ChakraLink></NextLink>
           <NextLink href="#contact" passHref legacyBehavior><ChakraLink color={'white'}>Contact</ChakraLink></NextLink>
         </Stack>
      </Flex>
    </Box>
  );
};

export default Header;