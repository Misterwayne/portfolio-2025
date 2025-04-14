// src/components/Sections/ExperienceCard.tsx
'use client';

import {
    Box, Flex, Heading, Text, VStack, HStack, List, ListItem, Icon, Image
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';
import { Experience } from '@/data/dummyData';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  // Define base styles (no need for useColorModeValue)
  const cardBg = "white";
  const cardBgDark = "gray.700";
  const textColor = "gray.600";
  const textColorDark = "gray.400";
  const headingColor = "gray.800";
  const headingColorDark = "whiteAlpha.900";
  const accentColor = "teal.500";
  const accentColorDark = "teal.300";
  const defaultBorderLight = "gray.200"; // Fallback border color if variable not set
  const defaultBorderDark = "gray.600"; // Fallback border color dark

  return (
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      p={6}
      bg={cardBg}
      _dark={{ bg: cardBgDark }}
      borderRadius="lg"
      boxShadow="md"
      mb={6}
      width="100%"
      align="start"
      gap={6}
      // --- Add borderWidth to make the effect visible ---
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
      // --- End sx prop ---
    >
        {/* Optional Logo */}
        {experience.logoUrl && (
             <Box flexShrink={0} w={{ base: "50px", sm: "60px"}} h={{ base: "50px", sm: "60px"}}>
                 <Image
                     src={experience.logoUrl}
                     alt={`${experience.company} logo`}
                     objectFit="contain"
                     w="100%" h="100%"
                 />
             </Box>
        )}

        {/* Content */}
        <VStack align="start" gap={2} flexGrow={1}>
            <Heading as="h3" size="md" color={headingColor} _dark={{ color: headingColorDark }}>
                {experience.role}
            </Heading>
            <HStack wrap="wrap" gap={2} fontSize="sm">
                <Text fontWeight="medium" color={accentColor} _dark={{ color: accentColorDark }}>{experience.company}</Text>
                <Text color={textColor} _dark={{ color: textColorDark }}>•</Text>
                <Text color={textColor} _dark={{ color: textColorDark }}>{experience.location}</Text>
                <Text color={textColor} _dark={{ color: textColorDark }}>•</Text>
                <Text color={textColor} _dark={{ color: textColorDark }}>{experience.date}</Text>
            </HStack>
            <List gap={1} pt={2} pl={1}>
                {experience.description.map((item, index) => (
                    <ListItem key={index} fontSize="sm" color={textColor} _dark={{ color: textColorDark }}>
                        <Icon as={MdCheckCircle} color={accentColor} _dark={{ color: accentColorDark }} />
                        {item}
                    </ListItem>
                ))}
            </List>
        </VStack>
    </Flex>
  );
};

export default ExperienceCard;