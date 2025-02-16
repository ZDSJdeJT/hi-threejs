import { StrictMode } from 'react';
import {
  createHashHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';

import { NotFound } from '@/components/not-found';
// Import the generated route tree
import { routeTree } from '@/routeTree.gen';

import '@/styles/globals.css';

const hashHistory = createHashHistory();
// Create a new router instance
const router = createRouter({
  routeTree,
  history: hashHistory,
  defaultNotFoundComponent: NotFound,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
