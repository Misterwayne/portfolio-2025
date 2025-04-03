// src/components/Sections/ContactSection.tsx
'use client';

import { Container, Heading, Text, VStack, Button, Link as ChakraLink, Icon, HStack , Box } from '@chakra-ui/react';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import { personalInfo } from '@/data/dummyData';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const ContactSection = () => {
  const iconColor = 'teal.300';

  return (
    <MotionBox
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      py={{ base: 12, md: 16 }}
    >
      <Container maxW="container.md" centerContent textAlign="center">
        <VStack gap={6}>
          <Heading as="h2" size="xl">
            Get In Touch
          </Heading>
          <Text fontSize="lg" color={'gray.400'}>
            I am currently open to new opportunities and collaborations. Feel free to reach out!
          </Text>
          <ChakraLink href={`mailto:${personalInfo.email}`} _hover={{ textDecoration: 'none' }}>
            <Button colorScheme="teal" size="lg" >
            <Icon as={FaEnvelope} />
              {personalInfo.email}
            </Button>
          </ChakraLink>
          <HStack gap={6} pt={4}>
             {personalInfo.linkedin && (
               <ChakraLink href={personalInfo.linkedin} >
                 <Icon as={FaLinkedin} w={8} h={8} color={iconColor} _hover={{ color: 'blue.400' }} transition="color 0.2s" />
               </ChakraLink>
             )}
             {personalInfo.github && (
                <ChakraLink href={personalInfo.github} >
                 <Icon as={FaGithub} w={8} h={8} color={iconColor} _hover={{ color: `white` }} transition="color 0.2s" />
               </ChakraLink>
             )}
             {/* Add other contact icons/links here */}
          </HStack>
        </VStack>
      </Container>
    </MotionBox>
  );
};

export default ContactSection;