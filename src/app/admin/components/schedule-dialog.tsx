'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import type { AllData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface ScheduleDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  item: AllData | null;
}

export function ScheduleDialog({ isOpen, setIsOpen, item }: ScheduleDialogProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    console.log({
      itemId: item?.id,
      date,
      notes,
    });
    toast({
      title: "Follow-up Scheduled",
      description: `Follow-up for ${item?.name} has been scheduled for ${date?.toLocaleDateString()}.`,
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Follow-up</DialogTitle>
          <DialogDescription>
            Plan your next interaction with {item?.name}. Select a date and add notes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
          <Textarea
            placeholder="Add notes for your follow-up..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSave}>Save Schedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
