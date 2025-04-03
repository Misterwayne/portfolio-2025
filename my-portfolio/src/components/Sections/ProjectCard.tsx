'use client';

import { Box, Heading, Text,  HStack, VStack, Link as ChakraLink, Image, Button, ButtonGroup,  Icon } from '@chakra-ui/react';
import { Project } from '@/data/dummyData';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const MotionBox = motion(Box);

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const cardBg = 'gray.700';
  const tagColorScheme = 'cyan';
  const defaultBorderLight = "gray.200"; // Fallback border color if variable not set
  const defaultBorderDark = "gray.600"; // Fallback border color dark

  return (
    <MotionBox
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      boxShadow="md"
      whileHover={{ y: -5, boxShadow: "xl" }}
      transition={{ duration: 0.3 }}
      display="flex"
      borderWidth="2px" // You need a border for the color change to show
      borderStyle="solid" // Set a style
      // --- Use sx prop to apply interactive border color ---
      css={{
          // Use CSS Variable for border color, with fallback
          borderColor: `var(--interactive-border-color-light, ${defaultBorderLight})`,
          _dark: {
              // Use dark mode CSS Variable for border color, with fallback
              borderColor: `var(--interactive-border-color-dark, ${defaultBorderDark})`
          }
      }}
      flexDirection="column"
      height="50vh" // Ensure cards have same height potential
    >
      <Image src={project.imageUrl} alt={project.title} objectFit="cover" h="200px" w="100%" />

      <VStack p={5} gap={3} align="start" flexGrow={1}> {/* Use flexGrow to push buttons down */}
        <Heading size="md">{project.title}</Heading>
        <Text fontSize="sm" color={'gray.400'} flexGrow={1}> {/* Allow text to take space */}
          {project.description}
        </Text>
        <HStack gap={2} wrap="wrap">
          {project.tags.map((tag) => (
            <Text key={tag} bg={tagColorScheme} borderRadius={10} p={1}>
              {tag}
            </Text>
          ))}
        </HStack>
      </VStack>

       <ButtonGroup gap="2" p={5} pt={0} justifySelf="flex-end"> {/* Position buttons at the bottom */}
         {project.liveUrl && (
           <ChakraLink href={project.liveUrl}  _hover={{ textDecoration: 'none' }}>
             <Button variant="solid" colorScheme="teal" size="sm">
             <Icon as={FaExternalLinkAlt} />
               Live Demo
             </Button>
           </ChakraLink>
         )}
         {project.repoUrl && (
           <ChakraLink href={project.repoUrl}  _hover={{ textDecoration: 'none' }}>
             <Button variant="outline" colorScheme="gray" size="sm">
               GitHub
              <Icon as={FaGithub} />
             </Button>
           </ChakraLink>
         )}
       </ButtonGroup>
    </MotionBox>
  );
};

export default ProjectCard;