// src/components/Sections/ProjectModal.tsx
'use client';

import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Image, Text, Badge, HStack, VStack, Link as ChakraLink, Button, Icon, SimpleGrid, Box, AspectRatio,
  Tag,
  Heading
} from '@chakra-ui/react';
import { Project } from '@/data/dummyData';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null; // Accept Project or null
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  if (!project) return null; // Don't render if no project is selected

  // Modal specific styles
  const modalBg = 'white';
  const modalBgDark = 'gray.800';
  const textColor = 'gray.700';
  const textColorDark = 'gray.200';
  const headingColor = 'gray.900';
  const headingColorDark = 'whiteAlpha.900';

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside" isCentered>
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(5px)" />
      <ModalContent bg={modalBg} _dark={{ bg: modalBgDark }} color={textColor} _dark={{ color: textColorDark }} borderRadius="lg">
        <ModalHeader color={headingColor} _dark={{ color: headingColorDark }} borderBottomWidth="1px" borderColor="gray.200" _dark={{ borderColor: 'gray.600' }}>
          {project.title}
          {project.company && <Badge ml={2} colorScheme="teal" variant="subtle">{project.company}</Badge>}
        </ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: 'outline' }} />
        <ModalBody py={6}>
          <VStack spacing={6} align="start">
            {/* Description */}
            <Text fontSize="md">
              {project.longDescription || project.description} {/* Show long description if available */}
            </Text>

            {/* Tags */}
            <HStack spacing={2} wrap="wrap">
              {project.tags.map((tag) => (
                <Tag size="sm" key={tag} colorScheme="blue" variant="solid" _dark={{ colorScheme: 'cyan' }}>
                  {tag}
                </Tag>
              ))}
            </HStack>

            {/* Screenshots Gallery */}
            {project.screenshots && project.screenshots.length > 0 && (
              <VStack align="start" w="100%" spacing={4}>
                 <Heading size="sm" color={headingColor} _dark={{ color: headingColorDark }}>Screenshots</Heading>
                 {/* Simple responsive grid for screenshots */}
                 <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
                    {project.screenshots.map((src, index) => (
                        // Use AspectRatio to maintain image shape if needed
                       <AspectRatio key={index} ratio={16 / 9} w="100%">
                         <Image
                           src={src}
                           alt={`Screenshot ${index + 1} for ${project.title}`}
                           objectFit="cover" // Or 'contain'
                           borderRadius="md"
                           boxShadow="sm"
                           fallbackSrc='https://via.placeholder.com/400x225?text=Loading...' // Placeholder
                         />
                       </AspectRatio>
                    ))}
                 </SimpleGrid>
              </VStack>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter borderTopWidth="1px" borderColor="gray.200" _dark={{ borderColor: 'gray.600' }}>
          {/* Links */}
          {project.liveUrl && (
            <ChakraLink href={project.liveUrl} isExternal _hover={{ textDecoration: 'none' }}>
              <Button colorScheme="teal" size="sm" mr={3} leftIcon={<Icon as={FaExternalLinkAlt} />}>
                Live Demo
              </Button>
            </ChakraLink>
          )}
          {project.repoUrl && (
            <ChakraLink href={project.repoUrl} isExternal _hover={{ textDecoration: 'none' }}>
              <Button variant="outline" colorScheme="gray" size="sm" leftIcon={<Icon as={FaGithub} />}>
                View Code
              </Button>
            </ChakraLink>
          )}
          <Button variant="ghost" size="sm" onClick={onClose} ml="auto">Close</Button> {/* Close button */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectModal;