/* eslint-disable @typescript-eslint/no-explicit-any */
import { createOllama } from 'ollama-ai-provider'
import { StreamingTextResponse, streamText } from 'ai'

const ollama = createOllama() as any

export async function POST(req: Request) {
    const { encodedFiles } = await req.json()
    const headers = new Headers()
    headers.set('Access-Control-Allow-Origin', '*')

    try {
        const result = await streamText({
            model: ollama('llama3.2'),
            messages: [
                {
                    role: 'system',
                    content: `You are an expert photography reviewer and art critic. 
                      You will receive a photo and provide a detailed review focused on the following key aspects:
                      1. **Color**: Describe the color palette, saturation, contrast, and overall color harmony.
                      2. **Tone**: Evaluate the tonal range and dynamic contrast.
                      3. **Lighting**: Assess the quality, direction, and intensity of the lighting.
                      4. **Structure**: Comment on the sharpness, depth of field, and focus.
                      5. **Composition**: Analyze the framing, balance, rule of thirds, and overall composition.
    
                      Provide **specific and actionable recommendations** to enhance each aspect of the photo where applicable.
                      Your response should be professional and insightful, offering value to both amateur and professional photographers.`,
                },
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: 'Please review this photo.',
                        },
                        {
                            type: 'image',
                            image: encodedFiles[0],
                        },
                    ],
                },
            ],
        })
        return new StreamingTextResponse(result.toAIStream(), { headers })
    } catch (error) {
        console.error('Error generating review:', error)
        return new Response('Failed to generate review. Please try again later.', {
            status: 500,
            headers,
        })
    }
}
