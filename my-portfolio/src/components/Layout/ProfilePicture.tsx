'use client';

import {
    Box, Text, CloseButton,
    Input, Button, VStack, Spinner, // <<< Add Input, Button, VStack, Spinner, useToast
} from '@chakra-ui/react';
import { personalInfo } from '@/data/dummyData';
import React, { useState, useRef, useEffect, useCallback } from 'react'; // <<< Import useRef, useEffect
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaVolumeUp } from 'react-icons/fa';
import { useChat } from '@/context/ChatContext';

const MotionBox = motion(Box);

// Define message type
interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}


const FixedProfilePic = () => {
  // --- Chat State ---
  const [isBubbleVisible, setIsBubbleVisible] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]); // Store chat history
  const [inputValue, setInputValue] = useState(''); // Current user input
  const [isLoading, setIsLoading] = useState(false); // Loading indicator for API call
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for scrolling chat/ For showing errors
  const { systemMessageToSend} = useChat();
  // --- End Chat State ---

  // --- TTS State ---
  const [isTtsLoading, setIsTtsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref to control audio playback
  const currentAudioUrl = useRef<string | null>(null); // Ref to track the current Object URL
  // --- End TTS State ---

  // --- Scroll to bottom effect ---
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // Run whenever messages change
  // --- End Scroll Effect ---
  const cleanupAudio = useCallback(() => {
    console.log("Cleaning up audio...");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src'); // More forceful than src = ''
      audioRef.current.load(); // Reset internal state
      audioRef.current = null; // Clear ref only after cleanup
    }
    if (currentAudioUrl.current) {
      console.log("Revoking URL:", currentAudioUrl.current);
      URL.revokeObjectURL(currentAudioUrl.current); // Revoke the old URL
      currentAudioUrl.current = null;
    }
     setIsTtsLoading(false); // Ensure loading state is reset
  }, []); // Empty dependency array means this function instance is stable

  // Cleanup Audio on Unmount or Bubble Close
  useEffect(() => {
    return () => {
        cleanupAudio(); // Call cleanup on unmount
    };
  }, [cleanupAudio]); // Dependency on bubble visibility

  const toggleBubble = () => {
    const willBeVisible = !isBubbleVisible;
    setIsBubbleVisible(willBeVisible);
    // Add initial greeting when bubble opens and is empty
    if (willBeVisible && messages.length === 0) {
       setMessages([{ role: 'assistant', content: `Hi! I'm Malick (or rather, an AI acting as him). Ask me about my skills or experience!` }]);
    }
    // Reset input when closing
    if (!willBeVisible) {
        setInputValue('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // --- Send Message Function ---
  const handleSendMessage = async (message?: string) => {
    const trimmedInput = inputValue.trim() || message;
    if (!trimmedInput || isLoading) return; // Don't send empty or while loading

    const newUserMessage: ChatMessage = { role: 'user', content: trimmedInput };
    const updatedMessages = [...messages, newUserMessage];
    if (!message) setMessages(updatedMessages); // Add user message immediately
    setInputValue(''); // Clear input field
    setIsLoading(true); // Show loading indicator

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send the *current* message history (including the user's new message)
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botReply: ChatMessage = { role: 'assistant', content: data.reply };
      setMessages(prevMessages => [...prevMessages, botReply]); // Add bot reply
      setIsLoading(false);
       // Play TTS for bot reply

    } catch (error) {
      console.error("Failed to send message:", error);
      // Optional: Remove the user's message if the API call failed? Or add an error message?
      // For now, just log and show toast.
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };
  // --- End Send Message Function ---

  const playTts = useCallback(async (text: string) => {
    if (!text || isTtsLoading) return;

    cleanupAudio(); // <<< Clean up any previous audio *before* starting new request

    setIsTtsLoading(true);
    console.log("Requesting TTS for:", text);

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      console.log("Received TTS response:");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `TTS API error! status: ${response.status}`);
      }
      if (!response.body) throw new Error("TTS response stream is empty.");

      console.log("Received TTS response, processing blob...");
      const audioBlob = await response.blob();

      // --- Check Blob Type and Size ---
      if (!audioBlob.type.startsWith('audio/')) {
          console.error("Received blob is not audio:", audioBlob.type);
          throw new Error("Received invalid audio data from server.");
      }
      if (audioBlob.size === 0) {
          console.error("Received empty audio blob.");
          throw new Error("Generated audio was empty.");
      }
      // --- End Check ---

      const audioUrl = URL.createObjectURL(audioBlob);
      currentAudioUrl.current = audioUrl; // Store the new URL
      console.log("Created Object URL:", audioUrl);

      // Get or create the audio element
      const audio = audioRef.current ?? new Audio();
      audioRef.current = audio; // Ensure ref is set

       // --- Add Event Listeners BEFORE setting src ---
       const onEnded = () => {
          console.log("TTS playback finished via onended.");
          cleanupAudio(); // Use the cleanup function
          audio.removeEventListener('ended', onEnded); // Remove listener
          audio.removeEventListener('error', onError);
       };
       const onError = (e: Event | string) => {
           console.error("Audio element error:", e);
           cleanupAudio(); // Use the cleanup function
           audio.removeEventListener('ended', onEnded);
           audio.removeEventListener('error', onError);
       };

       audio.addEventListener('ended', onEnded);
       audio.addEventListener('error', onError);
       // --- End Event Listeners Setup ---


      audio.src = audioUrl; // Set the source
      audio.load(); // Explicitly load the new source

      console.log("Attempting to play audio...");
      // Attempt playback (might require user interaction context)
      await audio.play();
      console.log("Audio playback started.");
      // Note: isTtsLoading will be set to false in the onEnded/onError handlers via cleanupAudio

    } catch (error) {
      console.error("Failed to get or play TTS audio:", error);
      cleanupAudio(); // Clean up on error
    }
  // Depend on cleanupAudio and toast
  }, [cleanupAudio,  isTtsLoading]);
  // --- End Play TTS Function ---

  useEffect(() => {
    if (!systemMessageToSend) return;
    handleSendMessage(systemMessageToSend);
  }, [systemMessageToSend]);


  // --- Define styles and sizes (as before) ---

  const borderColorDark = 'gray.600';
  const hoverBorderColorLight = 'teal.300';
  const hoverBorderColorDark = 'teal.200';
  const bubbleBgLight = 'blackAlpla.600'; /* ... */
  const baseSize = '200px'; /* ... */
  const mdSize = '200px'; /* ... */
  const borderColorLight = 'whiteAlpha.600'; /* ... */

  // --- Define Shadow States ---
  const defaultShadow = 'lg';
  // Use a distinct shadow for the speaking state, potentially colored
  const speakingShadowLight = '0 0 15px 4px rgba(49, 151, 149, 0.6)'; // Teal glow light

  if (!personalInfo.aboutImageUrl) return null;

  return (
    <Box position="fixed" bottom={{ base: '1rem', md: '1.5rem' }} right={{ base: '1rem', md: '1.5rem' }} zIndex={50}>
      {/* --- Chat Bubble --- */}
      <AnimatePresence>
        {isBubbleVisible && (
          <MotionBox
            position="absolute"
            bottom="calc(100% + 10px)"
            right={{ base: '-10px', md: '0px' }}
            // Increased width & added height/flex for chat layout
            w={{ base: '280px', md: '500px' }} // Wider bubble
            maxH="80vh" // Fixed height for chat area
            bg={bubbleBgLight} _dark={{ bg: 'gray.800' }} // Use different dark bg for contrast
            borderRadius="lg"
            boxShadow={isTtsLoading ? speakingShadowLight : defaultShadow}  // Larger shadow
            zIndex={51}
            display="flex" // Use flexbox for layout
            flexDirection="column" // Stack chat + input vertically
            // Animation props (as before)
             initial={{ opacity: 0, y: 10, scale: 0.9 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 10, scale: 0.9 }}
             transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Pointer/Tail (as before) */}
            <Box /* ... Pointer styles ... */ _dark={{ borderTopColor: 'gray.800' }}/>

            {/* Close Button (as before) */}
            <CloseButton /* ... Close button styles ... */ onClick={toggleBubble} _dark={{ color: 'whiteAlpha.900'}}/>

            {/* --- Chat Header (Optional) --- */}
            <Text fontWeight="medium" p={3} pb={2} borderBottomWidth="1px" borderColor="gray.200" _dark={{ borderColor: 'gray.600', color: 'whiteAlpha.900' }}>
                 Chat with Malick (AI)
            </Text>

            {/* --- Message Display Area --- */}
            <VStack
              ref={chatContainerRef} // Attach ref for scrolling
              flexGrow={1} // Take available space
              overflowY="auto" // Enable scrolling
              p={3}
              gap={3}
              align="stretch" // Messages take full width
              // Scrollbar styling (optional)
               css={{
                    '&::-webkit-scrollbar': { width: '6px' },
                    '&::-webkit-scrollbar-track': { background: 'transparent' },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(0, 0, 0, 0.1)',
                        _dark: { background: 'rgba(255, 255, 255, 0.1)' },
                        borderRadius: '3px',
                    },
                }}
            >
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  bg={msg.role !== 'user' ? 'blue.50' : 'gray.100'}
                  _dark={{ bg: msg.role !== 'user' ? 'blue.800' : 'gray.600' }}
                  color={msg.role !== 'user' ? 'blue.900' : 'gray.800'}
                  px={3} py={2}
                  borderRadius="lg"
                  alignSelf={msg.role !== 'user' ? 'flex-end' : 'flex-start'} // Align messages
                  maxW="80%" // Prevent messages taking full width
                >
                  <Text fontSize="sm" whiteSpace="pre-wrap">{msg.content}</Text> {/* Handle newlines */}
                  {msg.role === 'assistant' && (
                    <FaVolumeUp // Import icon from react-icons
                        aria-label={`Play message audio`}
                        color={"black"}
                        onClick={() => playTts(msg.content)} // Play on click
                        cursor={'pointer'}
                      
                    />
                )}
                </Box>
              ))}
              {/* Loading Indicator */}
              {isLoading && (
                 <Box alignSelf="flex-start" display="flex" alignItems="center">
                     <Spinner size="xs" mr={2} color="gray.500" _dark={{ color: 'gray.400'}}/>
                     <Text fontSize="xs" color="gray.500" _dark={{ color: 'gray.400'}}>Thinking...</Text>
                 </Box>
              )}
              {isTtsLoading && ( /* Optional distinct TTS indicator */
                     <Box alignSelf="flex-start" /* ... Speaking indicator styles ... */>
                         <Spinner size="xs" color="purple.500"/>
                         <Text fontSize="xs">Speaking...</Text>
                     </Box>
                 )}
            </VStack>
            {/* --- End Message Display Area --- */}

          </MotionBox>
        )}
      </AnimatePresence>
      {/* --- End Chat Bubble --- */}
      <Box
        as="button" // Make it a button for click handling & accessibility
        onClick={toggleBubble} // Toggle bubble visibility on click
        aria-label="Toggle information bubble" // Accessibility label
        // Reset button styles
        background="none"
        border="none"
        padding={0}
        cursor="pointer"
        // Styling for the picture container itself
        position="relative" // Keep relative for potential internal absolute elements if needed later
        width={{ base: baseSize, md: mdSize }}
        height={{ base: baseSize, md: mdSize }}
        borderRadius="full"
        boxShadow="lg"
        transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
        _hover={{
          transform: 'scale(1.1)',
          boxShadow: 'xl',
        }}
        _focus={{ // Focus style for accessibility
            boxShadow: 'outline',
            outlineColor: 'teal.300' // Match theme focus
        }}
      >


          {/* Box acting as the styled circular frame */}
          <Box
            width="100%"
            height="100%"
            borderRadius="full"
            overflow="hidden"
            borderWidth="3px"
            borderStyle="solid"
            borderColor={borderColorLight}
            boxShadow={isTtsLoading ? speakingShadowLight : defaultShadow}
            transition="border-color 0.2s ease-in-out"
            _dark={{
              borderColor: borderColorDark,
            }}
            _hover={{ // Hover on the button/outer Box changes border
                borderColor: hoverBorderColorLight,
                _dark: { borderColor: hoverBorderColorDark },
            }}
            >
            {/* Standard HTML Image Tag */}
            <Image
              src={personalInfo.aboutImageUrl}
              alt={personalInfo.name} // Alt text is important
              width={200}
              height={200}
              style={{ objectFit: 'cover', display: 'block' }}
              />
          </Box>
        </Box>
          {/* --- Input Area --- */}
          {isBubbleVisible && (
          <Box p={3} borderTopWidth="1px" borderColor="gray.200" _dark={{ borderColor: 'gray.600' }}>
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}> {/* Handle submit on Enter */}
                 <Box display="flex" gap={2}>
                    <Input
                        placeholder="Ask something..."
                        value={inputValue}
                        onChange={handleInputChange}
                        size="sm" // Disable while loading
                        autoFocus // Focus input when bubble opens
                         _dark={{ borderColor: 'gray.500', bg: 'gray.700', color: 'whiteAlpha.900' }}
                    />
                    <Button
                        type="submit" // Make button submit the form
                        colorScheme="teal"
                        size="sm"
                        disabled={!inputValue.trim()} // Disable if input is empty
                    >
                        Send
                    </Button>
                 </Box>
              </form>
            </Box>
            )}
            {/* --- End Input Area --- */}
      </Box>
  );
};

export default FixedProfilePic;