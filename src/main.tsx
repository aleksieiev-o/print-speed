import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import StoreContextProvider from '@/providers/StoreContext.provider';
import { RouterProvider } from 'react-router-dom';
import {router} from '@/Router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContextProvider>
      <RouterProvider router={router}/>
    </StoreContextProvider>
  </React.StrictMode>,
);
