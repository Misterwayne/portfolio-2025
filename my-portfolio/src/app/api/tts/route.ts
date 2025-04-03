// src/app/api/tts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ElevenLabsClient } from 'elevenlabs';

const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;
const voiceId = process.env.ELEVENLABS_VOICE_ID;

if (!elevenLabsApiKey) console.error("ELEVENLABS_API_KEY is not set.");
if (!voiceId) console.error("ELEVENLABS_VOICE_ID is not set.");

const elevenlabs = elevenLabsApiKey ? new ElevenLabsClient({ apiKey: elevenLabsApiKey }) : null;

export async function POST(req: NextRequest) {
    if (!elevenlabs || !voiceId) {
        return NextResponse.json({ error: 'TTS service not configured correctly.' }, { status: 500 });
    }

    try {
        const body = await req.json();
        const text = body.text;

        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            return NextResponse.json({ error: 'No text provided for TTS' }, { status: 400 });
        }

        console.log(`[TTS API] Generating speech for: "${text}" using voice ${voiceId}`);

        // --- Generate Audio Stream ---
        const audioStream = await elevenlabs.generate({
            voice: voiceId,
            text: text,
            voice_settings: { 
                stability: 0.5, 
                similarity_boost: 0.75, 
                style: 0.5, 
                use_speaker_boost: true,
                speed: 1.1,
            },
            model_id: "eleven_flash_v2",
            output_format: "mp3_44100_128",
        });
        console.log("[TTS API] Received stream from ElevenLabs.");

        // --- Buffer the ENTIRE stream into memory ---
        const chunks: Buffer[] = [];
        // Type assertion needed for Node.js stream methods
        const nodeStream = audioStream as unknown as NodeJS.ReadableStream;

        for await (const chunk of nodeStream) {
            if (chunk instanceof Buffer) {
                chunks.push(chunk);
                // Optional: Log chunk size for debugging large files
                // console.log(`[TTS API] Received chunk size: ${chunk.length}`);
            } else {
                 // Should not happen with the SDK usually, but good to check
                 console.warn("[TTS API] Received non-Buffer chunk:", typeof chunk);
                 chunks.push(Buffer.from(chunk as unknown as ArrayBuffer));
            }
        }
        const audioBuffer = Buffer.concat(chunks);
        console.log(`[TTS API] Finished buffering. Total size: ${audioBuffer.length} bytes.`);
        // --- End Buffering ---


        // --- Send Buffered Response ---
        if (audioBuffer.length === 0) {
            console.error("[TTS API] Audio buffer is empty after streaming.");
            return NextResponse.json({ error: "Generated audio was empty." }, { status: 500 });
        }

        // Create a standard Response with the Buffer
        return new Response(audioBuffer, {
            headers: {
                'Content-Type': 'audio/mpeg', // Set correct MIME type
                'Content-Length': audioBuffer.length.toString(), // Set content length
            },
        });
        // --- End Buffered Response ---

    } catch (error : unknown ) {
        console.error("[TTS API] Error:", error);
        console.error("[TTS API] Error:", error);

        let errorMessage = "Failed to generate speech."; // Default message

        // Check if the error is an instance of the built-in Error class
        if (error instanceof Error) {
            // Now TypeScript knows error has a 'message' property
            errorMessage = error.message;
        } else if (typeof error === 'object' && error !== null) {
            // Attempt to access common properties if it's an object, but be cautiou
            // Fallback if it's an object but doesn't have expected props
            try {
                errorMessage = JSON.stringify(error);
            } catch {
                errorMessage = "An unknown object error occurred.";
            }
             
        } else if (typeof error === 'string') {
             // If the caught thing is just a string
             errorMessage = error;
        }
        // If it's none of the above, the default message is used

        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}