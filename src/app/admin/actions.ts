'use server';

import { suggestReplyMessage } from '@/ai/flows/suggest-reply-message';

export async function getSuggestedReply(context: string) {
  try {
    const result = await suggestReplyMessage({ context });
    return { success: true, reply: result.suggestedReply };
  } catch (error) {
    console.error('Error getting suggested reply:', error);
    return { success: false, error: 'Failed to generate suggestion.' };
  }
}
