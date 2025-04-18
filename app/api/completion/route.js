import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req) {
  const { prompt } = await req.json();

  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    system: 'You are a helpful assistant. Reply to the email in a professional manner. Make sure to include a greeting and a closing statement. You must use Mongolian language.',
    prompt,
  });

  return Response.json({ text });
}