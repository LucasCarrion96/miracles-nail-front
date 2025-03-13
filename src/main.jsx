import React from 'react';
import ReactDOM from 'react-dom/client';
import { MiraclesApp } from './MiraclesApp';
import { NavBar } from "./components/NavBar";
import { BrowserRouter } from 'react-router-dom';
import { LangProvider } from "./context/contextLang/LangProvider";
import { AuthProvider } from './context/AuthContext';

// Importaciones de React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Crear una instancia de QueryClient
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LangProvider>
          {/* 🚀 Proveedor global de React Query */}
          <QueryClientProvider client={queryClient}>
            <NavBar />
            <MiraclesApp />
          </QueryClientProvider>
        </LangProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
