'use server';

/**
 * @fileOverview AI-powered reply suggestion flow.
 *
 * - suggestReplyMessage - A function that suggests a reply message based on the given context.
 * - SuggestReplyMessageInput - The input type for the suggestReplyMessage function.
 * - SuggestReplyMessageOutput - The return type for the suggestReplyMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestReplyMessageInputSchema = z.object({
  context: z.string().describe('The context of the conversation or inquiry.'),
});
export type SuggestReplyMessageInput = z.infer<typeof SuggestReplyMessageInputSchema>;

const SuggestReplyMessageOutputSchema = z.object({
  suggestedReply: z.string().describe('The AI-suggested reply message.'),
});
export type SuggestReplyMessageOutput = z.infer<typeof SuggestReplyMessageOutputSchema>;

export async function suggestReplyMessage(input: SuggestReplyMessageInput): Promise<SuggestReplyMessageOutput> {
  return suggestReplyMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestReplyMessagePrompt',
  input: {schema: SuggestReplyMessageInputSchema},
  output: {schema: SuggestReplyMessageOutputSchema},
  prompt: `You are an AI assistant helping admins respond to user inquiries.
  Based on the following context, suggest a relevant and helpful reply message.
  Context: {{{context}}}
  Reply:`, // Just generate the reply, nothing else.
});

const suggestReplyMessageFlow = ai.defineFlow(
  {
    name: 'suggestReplyMessageFlow',
    inputSchema: SuggestReplyMessageInputSchema,
    outputSchema: SuggestReplyMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
