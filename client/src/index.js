import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import { CssBaseline } from '@mui/material';
import SystemContextProvider from './contexts/SystemContext';
import AuthContextProvider from './contexts/AuthContext';
import CompanyContextProvider from './contexts/CompanyContext';
import OpportunityContextProvider from './contexts/OpportunityContext';
import ApplicantContextProvider from './contexts/ApplicantContext';
export const API = "http://localhost:5001";

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Tajawal, sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <SystemContextProvider>
          <AuthContextProvider>
            <CompanyContextProvider>
              <OpportunityContextProvider>
                <ApplicantContextProvider>
                  <App />
                </ApplicantContextProvider>
              </OpportunityContextProvider>
            </CompanyContextProvider>
          </AuthContextProvider>
        </SystemContextProvider>
      </BrowserRouter>
    </ThemeProvider>

  </React.StrictMode>
);


