// src/context/ChatContext.tsx
'use client'; // Context needs to be used by client components

import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';

interface ChatContextProps {
  isBubbleVisible: boolean;
  systemMessageToSend: string | null;
  toggleBubble: () => void;
  triggerSystemMessage: (message: string) => void;
  clearSystemMessage: () => void;
  // You might add messages, isLoading, etc. here later if needed globally
}

// Create the context with a default undefined value initially
const ChatContext = createContext<ChatContextProps | undefined>(undefined);

// Create a Provider component
export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const [systemMessageToSend, setSystemMessageToSend] = useState<string | null>("(*Someone just entetered the sit, welcome them!*)");

  const toggleBubble = useCallback(() => {
    console.log("[Context] Toggling bubble");
    setIsBubbleVisible(prev => {
        const nextVisible = !prev;
        // Clear pending system message if bubble is manually closed
        if (!nextVisible) {
            setSystemMessageToSend(null);
        }
        return nextVisible;
    });
  }, []); // No dependency needed as it uses setter function

  const triggerSystemMessage = useCallback((message: string) => {
    console.log("[Context] Setting system message:", message);
    // Only set message if bubble is actually open or about to open? Or let the component check?
    // Let's allow setting it, FixedProfilePic will check visibility.
    setSystemMessageToSend(message);
  }, []);

  const clearSystemMessage = useCallback(() => {
    console.log("[Context] Clearing system message");
    setSystemMessageToSend(null);
  }, []);

  const value = {
    isBubbleVisible,
    systemMessageToSend,
    toggleBubble,
    triggerSystemMessage,
    clearSystemMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Create a custom hook for easy consumption
export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};