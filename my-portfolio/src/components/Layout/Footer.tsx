'use client';
import { Box, Flex,  Link as ChakraLink,  Stack, IconButton, Text } from '@chakra-ui/react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Install react-icons: npm install react-icons
import { personalInfo } from '@/data/dummyData';


const Footer = () => {
  const bgColor = 'gray.800';
  const borderColor = 'gray.700';

  return (
    <Box as="footer" bg={bgColor} py={4} px={8} borderTop="1px" borderColor={borderColor}>
      <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
        <Text fontSize="sm" color={bgColor}>
          © {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.
        </Text>
        <Stack direction="row" gap={4} mt={{ base: 4, md: 0 }}>
          {personalInfo.github && (
            <ChakraLink href={personalInfo.github}>
              <IconButton
                aria-label="GitHub"
                variant="ghost"
                color={('gray.400')}
                _hover={{ color: ('white') }}
                />
                <FaGithub />
            </ChakraLink>
          )}
          {personalInfo.linkedin && (
            <ChakraLink href={personalInfo.linkedin}>
              <IconButton
                aria-label="LinkedIn"
                variant="ghost"
                color={('gray.400')}
                _hover={{ color: ('blue.300') }}
                />
                <FaLinkedin />
            </ChakraLink>
          )}
          {/* Add other social links here */}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;