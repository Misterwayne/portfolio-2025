// src/components/Sections/ProjectsSection.tsx
'use client';

import { Container, Heading, SimpleGrid, Box } from '@chakra-ui/react';
import ProjectCard from './ProjectCard';
import { projects } from '@/data/dummyData';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const ProjectsSection = () => {
  return (
    <MotionBox
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, staggerChildren: 0.1 }}
      py={{ base: 12, md: 16 }}
    >
      <Container maxW="container.xl">
        <Heading as="h2" size="xl" mb={10} textAlign="center">
          Projects Showcase
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4} overflow={'scroll'} maxH={'80vh'}>
          {projects.map((project, index) => (
             <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </MotionBox>
  );
};

export default ProjectsSection;