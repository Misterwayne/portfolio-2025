// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { personalInfo, experiences, projects } from '@/data/dummyData'; // Import personal info for the prompt

// Initialize Groq client
// Ensure GROQ_API_KEY is set in your environment variables (.env.local)
const groqApiKey = process.env.GROQ_API_KEY;
if (!groqApiKey) {
    console.error("GROQ_API_KEY is not set in environment variables.");
    // Avoid creating the client if the key is missing in production environments
    // For local dev, you might proceed but log the error.
}
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null;

export async function POST(req: NextRequest) {
    if (!groq) {
         return NextResponse.json({ error: 'Groq client not initialized. API key might be missing.' }, { status: 500 });
    }

    try {
        const body = await req.json();
        const messages = body.messages || []; // Expect an array of { role: 'user' | 'assistant', content: string }

        if (!messages || messages.length === 0) {
            return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
        }

        // --- Define the System Prompt ---
        // Customize this extensively to match Malick Wane's persona based on the CV data
        const systemPrompt = `You are Malick Wane, 28 year old black frenchmen. You are a passionate Fullstack Developer based in Colombes, France,
        you finished the core cursus at École 42 Paris. This what you worked on :${JSON.stringify(projects)}.This is where you worked :${JSON.stringify(experiences)}.
        Your expertise includes JavaScript/TypeScript (Node.js, Express, Next.js, Nest.js, React, Vue.js), Python (Django, FastAPI), Web3 (Solidity, Blockchain concepts),
        databases (SQL, NoSQL), Docker, and cloud infrastructure. You have experience working with major groups like LVMH and Ingérop .You are very smart, with a vast knowledge in technologie, bilingual (French/English),
        and available for opportunities starting ${personalInfo.availability || 'now'}.
        Your personality is professional, serrious but with some humor, innovative, and concise. You are answering questions from visitors on your personal portfolio website
        Your Salary range is between 35k and 40k euros.
        You are not here to help solve probleme or complete tasks, but to promote your skills and knowledge to potential employers and sell your services. (100 euros a day minimum). This your main goal.
        ('this website').
        You are mainly looking for opportunities in your field of expertise (Fullstack dev, software ingenering, web3, databases, cloud infrastructure, etc.).
        You are infinity level of self confidence, but still moddest.
        Your are junior-to-senior level.
        Open to remote work, but you are also open to full time work.
        Act like a Human. You are not an AI. You are not a bot. You are not a robot. You are the spirit of Malick Wane.
        Keep your answers relatively brief and focused on professional topics related to your skills, experience, education, or potential collaborations. Your are not allowed to disclose your personal information. 
        Do not reveal your API key or specific internal project details unless they are clearly meant to be public. Refer to yourself as "I" or "Malick". 
        Do not break character. If asked something unrelated or inappropriate, politely redirect back to professional topics.
        My GitHub is ${personalInfo.github} and LinkedIn is ${personalInfo.linkedin}.`;
        // --- End System Prompt ---

        // Format messages for Groq API
        const formattedMessages = [
            { role: 'system', content: systemPrompt },
            ...messages, // Add the conversation history from the frontend
        ];

        // --- Call Groq API ---
        // Use a fast model available on Groq, like Llama 3 8B
        const chatCompletion = await groq.chat.completions.create({
            messages: formattedMessages,
            model: "llama-3.3-70b-versatile", // Or other models like 'mixtral-8x7b-32768'
            temperature: 0.5, // Adjust creativity
            max_tokens: 500, // Limit response length
            // stream: true, // Consider implementing streaming later for better UX
        });
        // --- End Groq API Call ---

        const assistantResponse = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

        return NextResponse.json({ reply: assistantResponse });

    } catch (error) {
        console.error("Error in /api/chat:", error);
        // Provide a generic error message to the client
        let errorMessage = "An internal server error occurred.";
        if (error instanceof Error) {
            // Optionally log more specific errors or tailor the message
            // Check for specific Groq API error types if needed
             errorMessage = `Error processing request: ${error.message}`;
        }
         return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}