import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
// import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
// import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';

import NotFound from '@/components/app/not-found';
import { Header } from '@/components/app/header';
import { Footer } from '@/components/app/footer';
import { ThemeProvider } from '@/store/theme-provider';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider defaultTheme="system" storageKey='app-theme'>
        <QueryClientProvider client={queryClient}>
          <Header />
          <HeadContent />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </ThemeProvider>

      {/* <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      /> */}

    </>
  ),
  notFoundComponent: () => (<NotFound />),
})
