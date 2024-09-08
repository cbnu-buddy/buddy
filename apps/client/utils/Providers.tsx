'use client';

import React, { useEffect } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import useFCM from '@/utils/hooks/useFCM';

export default function Providers({ children }: React.PropsWithChildren) {
  const { messages, fcmToken } = useFCM();

  const [client] = React.useState(new QueryClient());

  useEffect(() => {
    if (fcmToken) localStorage.setItem('fcmToken', fcmToken);
  }, [fcmToken]);

  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
    </QueryClientProvider>
  );
}
