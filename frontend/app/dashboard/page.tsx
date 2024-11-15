'use client';

import useAuth from '@/hooks/useAuth';

export default function DashboardPage() {
  const { loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // Or a loading spinner
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is a protected page.</p>
    </div>
  );
}