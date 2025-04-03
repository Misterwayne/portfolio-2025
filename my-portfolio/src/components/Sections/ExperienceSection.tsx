// src/components/Sections/ExperienceSection.tsx
'use client';

import { Container, Heading, VStack, Box } from '@chakra-ui/react';
import { experiences } from '@/data/dummyData'; // Import experiences data
import ExperienceCard from './ExperienceCard'; // Import the card component
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const ExperienceSection = () => {
  const headingColor = "gray.200";
  const headingColorDark = "gray.700";

  return (
    <MotionBox
      id="experience-content"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }} // Adjust viewport amount as needed
      transition={{ duration: 0.8 }}
      width="100%"
    >
      <Container maxW="container.lg">
        <VStack gap={8} align="stretch">
          <Heading as="h2" size="xl" textAlign="center" color={headingColor} _dark={{ color: headingColorDark }} mb={4}>
            Professional Experience
          </Heading>
          {experiences.map((exp, index) => (
             <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
             >
               <ExperienceCard experience={exp} />
             </motion.div>
          ))}
        </VStack>
      </Container>
    </MotionBox>
  );
};

export default ExperienceSection;