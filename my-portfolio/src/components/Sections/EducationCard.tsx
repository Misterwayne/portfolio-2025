// src/components/Sections/EducationCard.tsx
'use client';

import { Box, Heading, Text, VStack, HStack, Image, Flex } from '@chakra-ui/react';
import { EducationItem } from '@/data/dummyData'; // Import the interface

interface EducationCardProps {
  education: EducationItem;
}

const EducationCard = ({ education }: EducationCardProps) => {
    const cardBg = "white";
    const cardBgDark = "gray.700";
    const textColor = "gray.600";
    const textColorDark = "gray.400";
    const headingColor = "gray.800";
    const headingColorDark = "whiteAlpha.900";
    const accentColor = "blue.500"; // Use a different accent color for education
    const accentColorDark = "blue.300";

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
    >
        {/* Optional Logo */}
        {education.logoUrl && (
             <Box flexShrink={0} w={{ base: "50px", sm: "60px"}} h={{ base: "50px", sm: "60px"}}>
                 <Image
                     src={education.logoUrl}
                     alt={`${education.school} logo`}
                     objectFit="contain"
                     w="100%"
                     h="100%"
                 />
             </Box>
        )}

        {/* Content */}
        <VStack align="start" gap={1} flexGrow={1}>
            <Heading as="h3" size="md" color={headingColor} _dark={{ color: headingColorDark }}>
                {education.degree}
            </Heading>
            <HStack wrap="wrap" gap={2} fontSize="sm">
                <Text fontWeight="medium" color={accentColor} _dark={{ color: accentColorDark }}>{education.school}</Text>
                <Text color={textColor} _dark={{ color: textColorDark }}>•</Text>
                <Text color={textColor} _dark={{ color: textColorDark }}>{education.location}</Text>
                <Text color={textColor} _dark={{ color: textColorDark }}>•</Text>
                <Text color={textColor} _dark={{ color: textColorDark }}>{education.date}</Text>
            </HStack>
            {education.description && (
                <Text pt={2} fontSize="sm" color={textColor} _dark={{ color: textColorDark }}>
                    {education.description}
                </Text>
            )}
        </VStack>
    </Flex>
  );
};

export default EducationCard;