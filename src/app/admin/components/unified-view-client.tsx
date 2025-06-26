'use client';

import type { FC, ReactNode } from 'react';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { subscriptions, trials, contacts, referrals } from '@/lib/data';
import type { AllData, Contact, Status, Subscription, Trial, Referral } from '@/lib/types';
import {
  CalendarClock,
  MessageCircle,
  MoreHorizontal,
  Share2,
  Users,
} from 'lucide-react';
import { ScheduleDialog } from './schedule-dialog';
import { SuggestReplyDialog } from './suggest-reply-dialog';

interface UnifiedViewClientProps {
  data: {
    subscriptions: Subscription[];
    trials: Trial[];
    contacts: Contact[];
    referrals: Referral[];
  };
}

interface AnalyticsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  hint: string;
}

const AnalyticsCard: FC<AnalyticsCardProps> = ({ title, value, icon, hint }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{hint}</p>
    </CardContent>
  </Card>
);

const statusColors: Record<Status, string> = {
  New: 'bg-blue-500 hover:bg-blue-500',
  Contacted: 'bg-yellow-500 hover:bg-yellow-500',
  Resolved: 'bg-green-500 hover:bg-green-500',
  Closed: 'bg-gray-500 hover:bg-gray-500',
};

export function UnifiedViewClient({ data: initialData }: UnifiedViewClientProps) {
  const [allData, setAllData] = useState(initialData);

  const [isScheduleOpen, setScheduleOpen] = useState(false);
  const [isSuggestOpen, setSuggestOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AllData | null>(null);

  const handleUpdateStatus = (id: string, type: AllData['type'], newStatus: Status) => {
    setAllData(prevData => {
      const dataKey = `${type}s` as keyof typeof prevData;
      const updatedItems = prevData[dataKey].map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      return { ...prevData, [dataKey]: updatedItems as any };
    });
  };

  const openScheduleDialog = (item: AllData) => {
    setSelectedItem(item);
    setScheduleOpen(true);
  };

  const openSuggestDialog = (item: Contact) => {
    setSelectedItem(item);
    setSuggestOpen(true);
  };

  const ActionsMenu = ({ item }: { item: AllData }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => openScheduleDialog(item)}>Schedule Follow-up</DropdownMenuItem>
        {item.type === 'contact' && (
          <DropdownMenuItem onClick={() => openSuggestDialog(item as Contact)}>
            Send Pre-defined Message
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={item.status}
              onValueChange={(newStatus) => handleUpdateStatus(item.id, item.type, newStatus as Status)}
            >
              {(['New', 'Contacted', 'Resolved', 'Closed'] as Status[]).map(status => (
                <DropdownMenuRadioItem key={status} value={status}>
                  {status}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
            <h1 className="font-headline text-3xl font-bold">Unified View</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <AnalyticsCard
            title="Subscriptions"
            value={allData.subscriptions.length.toString()}
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            hint="Total active subscriptions"
          />
          <AnalyticsCard
            title="Free Trials"
            value={allData.trials.length.toString()}
            icon={<CalendarClock className="h-4 w-4 text-muted-foreground" />}
            hint="Users currently on a trial"
          />
          <AnalyticsCard
            title="Contact Messages"
            value={allData.contacts.length.toString()}
            icon={<MessageCircle className="h-4 w-4 text-muted-foreground" />}
            hint="New inquiries from customers"
          />
          <AnalyticsCard
            title="Referrals"
            value={allData.referrals.length.toString()}
            icon={<Share2 className="h-4 w-4 text-muted-foreground" />}
            hint="Customers referred by others"
          />
        </div>

        <Tabs defaultValue="subscriptions">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="trials">Trials</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
          </TabsList>
          <TabsContent value="subscriptions">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allData.subscriptions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.name}</TableCell>
                      <TableCell>{sub.email}</TableCell>
                      <TableCell>{sub.plan}</TableCell>
                      <TableCell>{sub.date}</TableCell>
                      <TableCell>
                        <Badge className={`${statusColors[sub.status]} text-primary-foreground`}>{sub.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <ActionsMenu item={sub} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          <TabsContent value="trials">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Trial End Date</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allData.trials.map((trial) => (
                    <TableRow key={trial.id}>
                      <TableCell className="font-medium">{trial.name}</TableCell>
                      <TableCell>{trial.email}</TableCell>
                      <TableCell>{trial.trialEndDate}</TableCell>
                      <TableCell>{trial.date}</TableCell>
                      <TableCell>
                         <Badge className={`${statusColors[trial.status]} text-primary-foreground`}>{trial.status}</Badge>
                      </TableCell>
                       <TableCell>
                        <ActionsMenu item={trial} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          <TabsContent value="contacts">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allData.contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.date}</TableCell>
                      <TableCell>
                         <Badge className={`${statusColors[contact.status]} text-primary-foreground`}>{contact.status}</Badge>
                      </TableCell>
                       <TableCell>
                        <ActionsMenu item={contact} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          <TabsContent value="referrals">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Friend Name</TableHead>
                    <TableHead>Friend Mobile</TableHead>
                    <TableHead>Friend Address</TableHead>
                    <TableHead>Referred By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allData.referrals.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell className="font-medium">{referral.name}</TableCell>
                      <TableCell>{referral.friendMobile}</TableCell>
                      <TableCell>{referral.friendAddress}</TableCell>
                      <TableCell>{referral.referredBy}</TableCell>
                      <TableCell>{referral.date}</TableCell>
                      <TableCell>
                         <Badge className={`${statusColors[referral.status]} text-primary-foreground`}>{referral.status}</Badge>
                      </TableCell>
                       <TableCell>
                        <ActionsMenu item={referral} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <ScheduleDialog 
        isOpen={isScheduleOpen}
        setIsOpen={setScheduleOpen}
        item={selectedItem}
      />
      
      <SuggestReplyDialog
        isOpen={isSuggestOpen}
        setIsOpen={setSuggestOpen}
        item={selectedItem?.type === 'contact' ? selectedItem as Contact : null}
      />
    </>
  );
}
