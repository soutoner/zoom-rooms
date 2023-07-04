import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { SocketProvider } from './contexts/socket/SocketProvider.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>
);
