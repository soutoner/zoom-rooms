import { useEffect, useState } from 'react';
import { Channel, Socket } from 'phoenix';

export const useChannel = (socket: Socket | null, channelName: string) => {
  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    const channel = socket?.channel(channelName);
    channel?.join().receive('ok', () => {
      setChannel(channel);
    });

    // leave the channel when the component unmounts
    return () => {
      channel?.leave();
    };
  }, []);

  return channel;
};
