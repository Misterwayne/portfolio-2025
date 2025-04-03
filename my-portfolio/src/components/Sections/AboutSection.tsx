// src/components/Sections/AboutSection.tsx
'use client';

import { Container, Heading, Text, VStack,  Box } from '@chakra-ui/react';
import { personalInfo } from '@/data/dummyData';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const AboutSection = () => {
  return (
    // Removed py prop from MotionBox - centering is handled by FullScreenSection wrapper
    <MotionBox
      id="about-content" // Changed id to avoid clash with wrapper
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }} // Adjust viewport based on new context
      transition={{ duration: 0.8 }}
      width="100%" // Ensure it takes the width of the container
    >
      {/* Container might still be useful for max width control */}
      <Container maxW="container.md" centerContent textAlign="center">
        <VStack gap={4} align="stretch">
          <Heading as="h2" size="xl" mb={4}>
            About Me
          </Heading>
          <Text fontSize="lg" color={'gray.400'}>
            {personalInfo.bio}
          </Text>
        </VStack>
      </Container>
    </MotionBox>
  );
};

export default AboutSection;