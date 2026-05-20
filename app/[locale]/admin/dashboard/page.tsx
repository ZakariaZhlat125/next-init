import { AdminLayout } from '@/features/admin/layout';
import { Dashboard } from '@/features/admin/dashboard';

export default function DashboardPage() {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
}
