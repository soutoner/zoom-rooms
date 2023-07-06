import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'src/App.tsx';
import { SocketProvider } from 'src/contexts/socket/SocketProvider.tsx';
import { ChannelProvider } from './contexts/channel/ChannelProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SocketProvider>
      <ChannelProvider topic="room:lobby">
        <App />
      </ChannelProvider>
    </SocketProvider>
  </React.StrictMode>
);
