import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import AppProvider from '@/shared/providers/App.provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider />
  </React.StrictMode>,
);
