// src/components/Sections/SkillsSection.tsx
'use client';

import {
  Container,
  Heading,
  SimpleGrid,
  Box,
  Text,
  VStack,
  Icon, // Import Icon
  HStack // Import HStack
} from '@chakra-ui/react';
import { skillCategories } from '@/data/dummyData';
import { motion } from 'framer-motion';

// Import specific icons you expect to use (add more as needed!)
import {
  FaReact, FaNodeJs, FaDocker, FaPython, FaHtml5, FaCss3Alt, FaGitAlt, FaAws, FaLinux, FaVuejs, FaDatabase, FaFigma, FaJsSquare, FaWordpress, FaGithub, FaAngular
} from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiPostgresql, SiMongodb, SiRedis, SiExpress, SiFlask, SiDjango, SiTailwindcss, SiChakraui, SiPrisma, SiRedux, SiVercel, SiNetlify, SiJest, SiCypress, SiTestinglibrary, SiGooglecloud, SiKubernetes } from 'react-icons/si'; // Example: Using Simple Icons for brand icons
import { TbBrandGolang, TbApi } from "react-icons/tb"; // Example using Tabler icons

const MotionBox = motion(Box);

// --- Icon Mapping Function ---
// Maps skill names (lowercase) to corresponding react-icons component
const getSkillIcon = (skillName: string) => {
  const lowerCaseSkill = skillName.toLowerCase();
  // Add more mappings as needed based on your skills and imported icons
  const iconMap: { [key: string]: React.ElementType } = {
    'react': FaReact,
    'react.js': FaReact,
    'node.js': FaNodeJs,
    'docker': FaDocker,
    'python': FaPython,
    'html5': FaHtml5,
    'css3': FaCss3Alt,
    'git': FaGitAlt,
    'aws': FaAws,
    'linux': FaLinux,
    'vue.js': FaVuejs,
    'next.js': SiNextdotjs,
    'typescript': SiTypescript,
    'javascript (esnext)': FaJsSquare,
    'javascript': FaJsSquare,
    'postgresql': SiPostgresql,
    'mongodb': SiMongodb,
    'redis': SiRedis,
    'express': SiExpress,
    'express.js': SiExpress,
    'flask': SiFlask,
    'django': SiDjango,
    'tailwind css': SiTailwindcss,
    'chakra ui': SiChakraui,
    'prisma': SiPrisma,
    'redux': SiRedux,
    'vercel': SiVercel,
    'netlify': SiNetlify,
    'jest': SiJest,
    'cypress': SiCypress,
    'react testing library': SiTestinglibrary,
    'rest apis': TbApi,
    'figma': FaFigma,
    'go': TbBrandGolang,
    'golang': TbBrandGolang,
    'sql': FaDatabase, // Generic database icon for SQL
    'mysql': FaDatabase, // Can use a specific one if available
    'github actions': FaGithub, // Or a specific CI/CD icon
    'google cloud': SiGooglecloud,
    'gcp': SiGooglecloud,
    'kubernetes': SiKubernetes,
    'k8s': SiKubernetes,
    'angular': FaAngular,
    'wordpress': FaWordpress,
    // Add more mappings...
  };

  return iconMap[lowerCaseSkill] || null; // Return the icon component or null
};
// --- End Icon Mapping ---


const SkillsSection = () => {
  const cardBg =  'gray.700';
  const headingColor =  'teal.300';
  const tagColorScheme = 'cyan';
  const iconColor = 'gray.400';

  return (
    <MotionBox
      id="skills-content" // Changed ID
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      width="100%" // Ensure full width within the centered container
    >
      <Container maxW="container.lg">
        <Heading as="h2" size="xl" mb={10} textAlign="center">
          Technical Skills
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 2 }} gap={8}>
          {skillCategories.map((category, index) => (
            <MotionBox
              key={category.category}
              bg={cardBg}
              p={6}
              borderRadius="lg"
              boxShadow="md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              borderWidth="2px"
              css={{
                // Use CSS Variable for border color, with fallback
                borderColor: 'var(--interactive-border-color-light, transparent)', // Fallback transparent if no default border
                _dark: {
                    // Use dark mode CSS Variable for border color, with fallback
                    borderColor: 'var(--interactive-border-color-dark, transparent)'
                }
            }}
            >
              <VStack align="start" gap={4}>
                <Heading size="md" color={headingColor}>
                  {category.category}
                </Heading>
                <Box display="flex" flexWrap="wrap" gap={2}> {/* Use flexbox for wrapping tags */}
                  {category.skills.map((skill) => {
                    const SkillIcon = getSkillIcon(skill); // Get icon component
                    return (
                      <Box
                        key={skill}// Make tags slightly larger to accommodate icon
                        colorScheme={tagColorScheme}
                        borderRadius="md"
                        px={3} // Add padding
                        py={1}
                      >
                        <HStack gap={1.5}> {/* Stack icon and text horizontally */}
                          {SkillIcon && (
                            <Icon
                              as={SkillIcon}
                              color={iconColor} // Style the icon
                              boxSize="1.2em" // Size relative to text
                            />
                          )}
                          <Text as="span">{skill}</Text>
                        </HStack>
                      </Box>
                    );
                  })}
                </Box>
              </VStack>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </MotionBox>
  );
};

export default SkillsSection;