import { createContext, useEffect, useState } from "react";
import { Socket } from "phoenix";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const SocketContext = createContext<Socket | null>(null);

export function SocketProvider({ children }: Props) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = new Socket("ws://localhost:4000/socket");
    socket.connect();
    setSocket(socket);

    return () => {
      console.log("disconnecting");
      socket.disconnect();
      setSocket(null);
    };
  }, []);

  if (!socket) {
    return "Connecting";
  }

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
