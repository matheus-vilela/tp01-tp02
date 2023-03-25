import React from 'react';
import ReactDOM from 'react-dom/client';

import AppProvider from './contexts';
import { Routes } from './routes/index.routes';
import GlobalStyle from './styles';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <GlobalStyle />
      <Routes />
    </AppProvider>
  </React.StrictMode>
);
