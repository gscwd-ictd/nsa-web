'use client';

import React from 'react';
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';
import { useRQDevtoolsInProd } from '../zustand/useRQDevtoolsProd';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const ReactQueryDevToolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

export const QueryClientProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(new QueryClient());

  const show = useRQDevtoolsInProd((state) => state.show);
  const toggleDevTools = useRQDevtoolsInProd((state) => state.toggleDevtools);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.toggleDevtools = () => toggleDevTools();
  }, [toggleDevTools, show]);

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />

      {show && (
        <React.Suspense fallback={null}>
          <ReactQueryDevToolsProduction />
        </React.Suspense>
      )}
    </ReactQueryClientProvider>
  );
};
