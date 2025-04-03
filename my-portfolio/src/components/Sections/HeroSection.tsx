// src/components/Sections/HeroSection.tsx
'use client';

import { Container, Heading, Text, VStack, Button, Link as ChakraLink,  } from '@chakra-ui/react';
import { motion } from 'framer-motion'; // npm install framer-motion
import { personalInfo } from '@/data/dummyData';

const MotionVStack = motion(VStack);

const HeroSection = () => {
  const highlightColor = 'teal.300';

  return (
    <Container maxW="container.lg" centerContent py={{ base: 16, md: 24 }} textAlign="center">
      <MotionVStack
        gap={6}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heading as="h1" size={{ base: '2xl', md: '3xl' }} fontWeight="bold">
          Hi, I am <Text as="span" color={highlightColor}>{personalInfo.name}</Text>
        </Heading>
        <Text fontSize={{ base: 'lg', md: 'xl' }} color={'gray.400'} maxW="xl">
          {personalInfo.title}
        </Text>
        <Text fontSize={{ base: 'md', md: 'lg' }} color={'gray.300'} maxW="2xl">
           {personalInfo.shortBio} {/* Or use the longer bio */}
        </Text>
        <ChakraLink href={`mailto:${personalInfo.email}`} _hover={{ textDecoration: 'none' }}>
          <Button colorScheme="teal" size="lg" mt={4}>
            Get In Touch
          </Button>
        </ChakraLink>
      </MotionVStack>
    </Container>
  );
};

export default HeroSection;