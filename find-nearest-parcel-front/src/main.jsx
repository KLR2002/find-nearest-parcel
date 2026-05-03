import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { Provider } from './components/ui/provider.jsx';
import { Toaster } from "./components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from './Routes.jsx'
import './index.css'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <Toaster/>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
      </QueryClientProvider>  
    </Provider>
  </StrictMode>
)