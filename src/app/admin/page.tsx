import { subscriptions, trials, contacts, referrals } from '@/lib/data';
import { UnifiedViewClient } from './components/unified-view-client';

export default function AdminDashboardPage() {
  const allData = {
    subscriptions,
    trials,
    contacts,
    referrals,
  };

  return (
    <div className="flex-1 overflow-auto">
      <UnifiedViewClient data={allData} />
    </div>
  );
}
