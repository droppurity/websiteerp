'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Contact } from '@/lib/types';
import { getSuggestedReply } from '../actions';
import { Sparkles } from 'lucide-react';

interface SuggestReplyDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  item: Contact | null;
}

export function SuggestReplyDialog({ isOpen, setIsOpen, item }: SuggestReplyDialogProps) {
  const [reply, setReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setReply('');
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleGenerateReply = async () => {
    if (!item?.message) return;

    setIsLoading(true);
    const result = await getSuggestedReply(item.message);
    setIsLoading(false);

    if (result.success && result.reply) {
      setReply(result.reply);
      toast({
        title: "Suggestion generated!",
        description: "The AI has suggested a reply.",
      });
    } else {
      toast({
        variant: 'destructive',
        title: "Error",
        description: result.error || "Could not generate suggestion.",
      });
    }
  };
  
  const handleSend = () => {
     toast({
        title: "Message Sent!",
        description: `Your message to ${item?.name} has been sent.`,
      });
      setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Pre-defined Message</DialogTitle>
          <DialogDescription>
            Craft a response to {item?.name}. Use the AI assistant to generate a starting point.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className='p-4 bg-secondary rounded-lg'>
                <p className="text-sm font-medium text-muted-foreground">Original Message:</p>
                <p className="text-sm italic">"{item?.message}"</p>
            </div>
          <Textarea
            placeholder="Your reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={5}
            disabled={isLoading}
          />
          <Button onClick={handleGenerateReply} disabled={isLoading} variant="outline">
            <Sparkles className="mr-2 h-4 w-4" />
            {isLoading ? 'Generating...' : 'Suggest with AI'}
          </Button>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSend} disabled={!reply}>Send Message</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
