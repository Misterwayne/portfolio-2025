// src/components/Sections/EducationSection.tsx
'use client';

import { Container, Heading, VStack, Box } from '@chakra-ui/react';
import { educationHistory } from '@/data/dummyData'; // Import education data
import EducationCard from './EducationCard'; // Import the card component
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const EducationSection = () => {
    const headingColor = "gray.700";
    const headingColorDark = "gray.200";
    
  return (
    // Apply background directly here if the FullScreenSection wrapper doesn't have it
    // Or remove bg props here if the wrapper controls the background
    <MotionBox
      id="education-content"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      width="100%"
     // Optional: add padding if needed, e.g., py={16} if not full screen
    >
      <Container maxW="container.lg">
        <VStack gap={8} align="stretch">
          <Heading as="h2" size="xl" textAlign="center" color={headingColor} _dark={{ color: headingColorDark }} mb={4}>
            Education
          </Heading>
          {educationHistory.map((edu, index) => (
            <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
            >
                <EducationCard education={edu} />
            </motion.div>
          ))}
        </VStack>
      </Container>
    </MotionBox>
  );
};

export default EducationSection;