'use client';

import { ErrorService } from '@shared/services';
import { timeConstants } from '@shared/utils';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const QueryProvider = ({ children }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: timeConstants.ONE_HOUR,
          },

          mutations: {
            onError(err: unknown | Error) {
              if ((err as Error)?.message === ErrorService.messages.forbidden) {
                return ErrorService.handler({
                  error: {
                    message: 'You do not have permission to trigger this action.',
                  } as Error,
                });
              }
            },
          },
        },
        queryCache: new QueryCache({
          onError(err: unknown | Error) {
            if ((err as Error)?.message === ErrorService.messages.forbidden) {
              return ErrorService.handler({
                error: {
                  message: 'You do not have permission to access this data.',
                } as Error,
              });
            }
            err && ErrorService.handler({ error: err as Error });
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
};

export default QueryProvider;
