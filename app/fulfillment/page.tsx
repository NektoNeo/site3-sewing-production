'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FulfillmentPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/#fulfillment');
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <p className="text-lg text-muted-foreground" aria-live="polite">
        Перенаправление...
      </p>
    </div>
  );
}