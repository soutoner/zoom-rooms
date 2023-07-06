import { Channel } from 'phoenix';
import { createContext, useContext, useEffect, useState } from 'react';
import { SocketContext } from '../socket/SocketProvider';

export const ChannelContext = createContext<Channel | null>(null);

interface Props {
  topic: string;
  children: JSX.Element | JSX.Element[];
}

export function ChannelProvider({ topic, children }: Props) {
  const [channel, setChannel] = useState<Channel | null>(null);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const channel = socket?.channel(topic);
    channel?.join().receive('ok', () => {
      setChannel(channel);
    });

    // leave the channel when the component unmounts
    return () => {
      channel?.leave();
    };
  }, [socket, topic]);

  if (!channel) {
    return 'Connecting';
  }

  return (
    <ChannelContext.Provider value={channel}>
      {children}
    </ChannelContext.Provider>
  );
}
