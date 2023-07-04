import { createContext, useEffect, useState } from 'react';
import { Socket } from 'phoenix';
import { SocketConstants, SOCKET_URL } from '../../constants/Socket';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const SocketContext = createContext<Socket | null>(null);

export function SocketProvider({ children }: Props) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = new Socket(SOCKET_URL, {
      reconnectAfterMs: () => SocketConstants.RECONNECT_AFTER_MS,
    });
    socket.connect();
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  if (!socket) {
    return 'Connecting';
  }

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
