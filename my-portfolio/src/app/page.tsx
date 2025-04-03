// src/app/page.tsx
'use client';

import { Box } from '@chakra-ui/react';
import React, { forwardRef, RefObject, useEffect, useRef } from 'react';

// --- Section Component Imports ---
import HeroSection from '@/components/Sections/HeroSection';
import AboutSection from '@/components/Sections/AboutSection';
import ExperienceSection from '@/components/Sections/ExperienceSection';
import EducationSection from '@/components/Sections/EducationSection';
import ProjectsSection from '@/components/Sections/ProjectsSection';
import SkillsSection from '@/components/Sections/SkillsSection';
import ContactSection from '@/components/Sections/ContactSection';

// --- Layout Import ---
import { HEADER_HEIGHT } from './layout'; // Ensure this is correctly exported
import { useChat } from '@/context/ChatContext';

// --- Consolidated FullScreenSection Wrapper ---
interface FullScreenSectionProps {
  children: React.ReactNode;
  sectionId: string;
  // --- Background Options ---
  bgImageUrl?: string; // Static background image path
  useMouseTrackingBg?: 'spotlight' | 'radial'; // Enable interactive background effect
  trackingBgColors?: string[]; // Colors for interactive background (light)
  trackingBgColorsDark?: string[]; // Colors for interactive background (dark)
  // --- Overlay for Background Effects ---
  overlayColor?: string; // Overlay color (light mode)
  overlayColorDark?: string; // Overlay color (dark mode)
  // --- Interactive Children Border Effect ---
  useInteractiveChildrenBorder?: boolean; // Enable color sweep on children's borders
  gradientColor1Hue?: number; // Start Hue (0-360) for color sweep
  gradientColor2Hue?: number; // End Hue (0-360) for color sweep
  interactiveColorSaturation?: number; // Saturation (0-100) for border color
  interactiveColorLightness?: number; // Lightness (0-100) for light mode border
  interactiveColorLightnessDark?: number; // Lightness (0-100) for dark mode border
  // --- General Chakra Box Props ---
  [key: string]: string | string[] | number | boolean | undefined | React.ReactNode | object; // Allows passing standard Box props like 'bg', '_dark', 'color', etc.
}

const FullScreenSection =  forwardRef<HTMLDivElement, FullScreenSectionProps>(({
  children,
  sectionId,
  // Background props
  bgImageUrl,
  useMouseTrackingBg,
  trackingBgColors = ['rgba(79, 209, 197, 0.15)', 'transparent'], // Default interactive BG colors
  trackingBgColorsDark = ['rgba(79, 209, 197, 0.1)', 'transparent'],
  // Overlay props
  overlayColor = 'blackAlpha.500', // Default overlay colors
  // Interactive Children Border props
  useInteractiveChildrenBorder,
  gradientColor1Hue = 180, // Default HSL sweep parameters
  gradientColor2Hue = 300,
  interactiveColorSaturation = 75,
  interactiveColorLightness = 50,
  interactiveColorLightnessDark = 60,
  // Collect remaining props (like fallback 'bg', '_dark')
  ...props
}, ref) => {
  let sectionRef = useRef<HTMLDivElement>(null);
  const sectionRefInternal = useRef<HTMLDivElement>(null); // Keep internal ref if needed for mouse tracking

  // Combine refs if necessary, or just use the forwarded one for observer
  // Simple case: use forwarded ref for observer, internal for mouse tracking
  const mouseTrackingRef = sectionRefInternal; // Ref used for mouse pos calculation
  const observerRef = ref; // Ref used by Intersection Observer
  sectionRef = mouseTrackingRef as RefObject<HTMLDivElement>; // Use internal ref for Intersection Observer
  // --- Mouse Tracking Effect ---
  useEffect(() => {
    // Determine if any tracking is needed
    const needsTracking = useMouseTrackingBg || useInteractiveChildrenBorder;
    if (!needsTracking || !sectionRef.current) return;

    const section = sectionRef.current;
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { left, top, width, height } = section.getBoundingClientRect();
      const x = Math.min(Math.max((clientX - left) / width, 0), 1);
      const y = Math.min(Math.max((clientY - top) / height, 0), 1);

      if (useMouseTrackingBg) {
        section.style.setProperty('--mouse-x', `${x * 100}%`);
        section.style.setProperty('--mouse-y', `${y * 100}%`);
      }

      if (useInteractiveChildrenBorder) {
        const hueRange = (gradientColor2Hue as number) - (gradientColor1Hue as number);
        let currentHue = (hueRange >= 0)
            ? (gradientColor1Hue as number) + (hueRange * x)
            : ((gradientColor1Hue as number) + ((360 + hueRange) * x)) % 360;
        currentHue = Math.floor(currentHue);

        const colorLight = `hsl(${currentHue}, ${interactiveColorSaturation}%, ${interactiveColorLightness}%)`;
        const colorDark = `hsl(${currentHue}, ${interactiveColorSaturation}%, ${interactiveColorLightnessDark}%)`;
        section.style.setProperty('--interactive-border-color-light', colorLight);
        section.style.setProperty('--interactive-border-color-dark', colorDark);
      }
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => { // Cleanup
      section.removeEventListener('mousemove', handleMouseMove);
      if (useMouseTrackingBg) {
        section.style.removeProperty('--mouse-x');
        section.style.removeProperty('--mouse-y');
      }
      if (useInteractiveChildrenBorder) {
        section.style.removeProperty('--interactive-border-color-light');
        section.style.removeProperty('--interactive-border-color-dark');
      }
    };
    // Re-run if any relevant prop changes
  }, [
        useMouseTrackingBg, useInteractiveChildrenBorder, gradientColor1Hue,
        gradientColor2Hue, interactiveColorSaturation, interactiveColorLightness,
        interactiveColorLightnessDark // Removed trackingBgColors from deps as gradient string is built inside
     ]);
  // --- End Mouse Tracking Effect ---


  // --- Determine Visual Layering Based on Priority ---
  const showInteractiveChildBorderEffect = useInteractiveChildrenBorder;
  // Show interactive BG only if child border effect is OFF
  const showInteractiveBgEffect = useMouseTrackingBg && !showInteractiveChildBorderEffect;
  // Show static BG only if BOTH interactive effects are OFF
  const showStaticBgEffect = !showInteractiveChildBorderEffect && !showInteractiveBgEffect && !!bgImageUrl;
  // Show overlay only if an interactive or static BACKGROUND is active
  const needsOverlay = showInteractiveBgEffect || showStaticBgEffect;

  // --- Prepare Styles for Interactive Background (::before) ---
  let interactiveBgSx = {};
  if (showInteractiveBgEffect) {
    const gradColors = (trackingBgColors as string[])!.join(', ');
    const gradColorsDark = (trackingBgColorsDark as string[])!.join(', ');
    interactiveBgSx = {
      '&::before': {
        content: '""', position: 'absolute', inset: 0, // shortcut for top/left/right/bottom: 0
        zIndex: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${gradColors})`,
        _dark: {
          backgroundImage: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${gradColorsDark})`,
        }
      }
    };
  }
  // --- End Interactive Background Styles ---

  return (
    // --- Main Section Container ---
    <Box
      ref={observerRef}
      id={sectionId as string}
      // Layout & Snapping
      minHeight={`calc(100vh - ${HEADER_HEIGHT})`} h={`100vh`}
      w="100%" scrollSnapAlign="start"
      // Flex Centering
      display="flex" alignItems="center" justifyContent="center"
      // Positioning & Overflow
      position="relative" overflow="hidden" 
      // Static Background Image (Applied only if highest priority)
      bgSize="cover" bgRepeat="no-repeat"
      // Interactive BG (via ::before) & Default CSS Variables
      css={{
        // Default values are crucial fallbacks
        '--interactive-border-color-light': 'gray.200',
        '--interactive-border-color-dark': 'gray.700',
        '--mouse-x': '50%',
        '--mouse-y': '50%',
        ...interactiveBgSx // Apply ::before styles if interactive BG is active
      }}
      // Fallback Background Color & Other Props Passed Down
      // Apply fallback bg only if no other bg effect is active
      bg={!showInteractiveBgEffect && !showStaticBgEffect ? props.bg as string : undefined}
      // Pass remaining props, ensuring bg/bgImage/_dark aren't duplicated if handled
      {...{...props, bgImage: undefined }}
    >
      {/* --- Overlay Layer --- */}
      {needsOverlay && (
        <Box
          position="absolute" inset={0} // Covers parent
          bg={overlayColor as string}
          zIndex={1} // Above background effects
          pointerEvents="none"
        />
      )}

      {/* --- Content Wrapper --- */}
      {/* No interactive styles applied directly here; children consume variables */}
      <Box
        position="relative" zIndex={2} // Above overlay
        width="100%"
        ref={sectionRef}
        // Flex centering for the actual content component
        display="flex" justifyContent="center" alignItems="center"
        // Padding for content area
        p={{ base: 4, md: 8 }}
      >
         {children as React.ReactNode}
      </Box>
    </Box>
  );
});

FullScreenSection.displayName = "FullScreenSection";



// --- Main Page Component (Usage Example) ---
export default function Home( ) {
  const sectionBg = "gray.100"; // Slightly lighter fallback
  const sectionBgDark = "gray.900"; // Slightly darker fallback
  const  { triggerSystemMessage } = useChat();
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  // Add refs for other sections as needed

  // --- Keep track of triggered sections ---
  const triggeredSections = useRef(new Set<string>());

  useEffect(() => {
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      
      entries.forEach(entry => {
        const sectionId = (entry.target as HTMLElement).id;
        console.log("[Intersection] Observing sections...", sectionId);
            if (!sectionId) return;

            // Trigger ONLY when intersecting AND not already triggered recently
            if (entry.isIntersecting && !triggeredSections.current.has(sectionId)) {
                console.log(`[Intersection] Section entering: ${sectionId}`);
                triggeredSections.current.add(sectionId); // Mark as triggered

                // --- Define predefined messages based on section ---
                let messageToSend = "";
                switch (sectionId) {
                    case 'hero':
                        messageToSend = "(*Someone just entetered the sit, welcome them!*)";
                        break;
                    case 'about':
                        messageToSend = "Tell me more about yourself, Malick.";
                        break;
                    case 'education':
                        messageToSend = "What are your educational backgrounds?";
                        break;
                    case 'experience':
                        messageToSend = "What was your role at LVMH like?";
                        break;
                    case 'skills':
                        messageToSend = "Which technologies are you most excited about?";
                        break;
                    case 'projects':
                        messageToSend = "Can you highlight one of your recent projects?";
                         break;
                    case 'contact':
                        messageToSend = "How can I reach you?";
                        break;
                    // Add cases for other sections
                    default:
                        break; // No message for unspecified sections
                }

                if (messageToSend) {
                    triggerSystemMessage(messageToSend);
                     // Call the function to actually send the message to the chatbot
                     // Make sure the chat bubble's state is accessible here!
                }

                // Optional: Remove from triggered set after a delay if you want re-triggering
                // setTimeout(() => {
                //     triggeredSections.current.delete(sectionId);
                // }, 5000); // e.g., allow re-trigger after 5 seconds

            } else if (!entry.isIntersecting && triggeredSections.current.has(sectionId)) {
                 console.log(`[Intersection] Section leaving: ${sectionId}`);
                 // Optionally reset trigger status when section leaves viewport completely
                 // This would allow re-triggering if they scroll back
                 triggeredSections.current.delete(sectionId);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe the sections that have refs
    const refs = [aboutRef, experienceRef, skillsRef, projectsRef, educationRef, contactRef]; // Add other refs
    refs.forEach(ref => {
        if (ref.current) {
            observer.observe(ref.current);
        }
    });

    // Cleanup function
    return () => {
        refs.forEach(ref => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        });
    };
}, [triggerSystemMessage]); // Run observer setup only once on mount



  return (
    <Box
      as="div"
      // Correct height calculation and scroll padding for the *container*
      height="100vh" // Let the container be full height
      overflowY="scroll"
      scrollSnapType="y mandatory"
      // Scroll padding should generally match the header height if header is fixed/sticky
      scrollPaddingTop={0}
    >
        {/* --- Hero: Interactive Children Border --- */}
        <FullScreenSection
            sectionId="hero"
            useMouseTrackingBg="radial" // <<< ENABLE interactive BACKGROUND
            trackingBgColors={['rgba(255, 100, 150, 0.2)', 'transparent']} // Example pinkish radial
            trackingBgColorsDark={['rgba(255, 100, 150, 0.15)', 'transparent']}
            // Provide fallback background for the section itself
            bg="blue.900" // Darker fallback
            _dark={{}}
            ref={heroRef}
        >
            <HeroSection />
        </FullScreenSection>

        {/* --- About: Static Image --- */}
        <FullScreenSection
            sectionId="about"
            seMouseTrackingBg="radial" // <<< ENABLE interactive BACKGROUND
            trackingBgColors={['rgba(255, 100, 150, 0.2)', 'transparent']} // Example pinkish radial
            trackingBgColorsDark={['rgba(255, 100, 150, 0.15)', 'transparent']}
            bg="blue.900" // Darker fallback
            _dark={{ bg: "gray.900" }}
            ref={aboutRef}
        >
            <AboutSection />
        </FullScreenSection>

        {/* --- Experience: Interactive Children Border --- */}
         <FullScreenSection
             sectionId="experience"
             useInteractiveChildrenBorder={true} // <<< ENABLE children border effect
             gradientColor1Hue={120} gradientColor2Hue={270} // Green to Purple sweep
             interactiveColorSaturation={80}
             bg={sectionBg} _dark={{ bg: sectionBgDark }} // Fallback bg
             ref={experienceRef}
         >
             <ExperienceSection  />
         </FullScreenSection>

        {/* --- Education: Solid Color Only --- */}
        <FullScreenSection
            sectionId="education"
            bgImageUrl='/public/education/42.png' // Static image
            bg={sectionBg} _dark={{ bg: sectionBgDark }} // Simple fallback color
            ref={educationRef}
        >
            <EducationSection />
        </FullScreenSection>

        {/* --- Projects: Interactive Background --- */}
        <FullScreenSection
            sectionId="projects"
            useMouseTrackingBg="radial" // <<< ENABLE interactive BACKGROUND
            trackingBgColors={['rgba(255, 100, 150, 0.2)', 'transparent']} // Example pinkish radial
            trackingBgColorsDark={['rgba(255, 100, 150, 0.15)', 'transparent']}
            overlayColor="blackAlpha.100" overlayColorDark="blackAlpha.300" // Subtle overlay
            bg={sectionBg} _dark={{ bg: sectionBgDark }} // Fallback bg
            ref={projectsRef}
        >
            <ProjectsSection />
        </FullScreenSection>

        {/* --- Skills: Static Image --- */}
        <FullScreenSection
            sectionId="skills"
            useInteractiveChildrenBorder={true} // <<< ENABLE children border effect
            gradientColor1Hue={451} gradientColor2Hue={300} // Green to Purple sweep
            interactiveColorSaturation={80}
            bg={sectionBg} _dark={{ bg: sectionBgDark }}
            ref={skillsRef}
        >
            <SkillsSection/>
        </FullScreenSection>

        {/* --- Contact: Interactive Background Spotlight --- */}
        <FullScreenSection
            sectionId="contact"
            useMouseTrackingBg="spotlight" // <<< ENABLE interactive BACKGROUND spotlight
            trackingBgColors={['rgba(255, 255, 255, 0.15)', 'transparent 30%']} // Spotlight colors
            trackingBgColorsDark={['rgba(255, 255, 255, 0.1)', 'transparent 30%']}
            overlayColor="blackAlpha.600" overlayColorDark="blackAlpha.700" // Overlay needed
            bg="teal.800" _dark={{ bg: "gray.900" }} // Fallback bg
            ref={contactRef}
        >
            <ContactSection/>
        </FullScreenSection>

    </Box> // End Main Scroll Container
  );
}