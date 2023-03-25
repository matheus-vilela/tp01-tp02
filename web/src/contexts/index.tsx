import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './auth';

import theme from '../themes';
import { IContextProps } from './types';

const AppProvider: React.FC<IContextProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
          {children}
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);

export default AppProvider;