import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../contexts/SocketContext";
import { Channel } from "phoenix";

export const useChannel = (channelName: string) => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const channel = socket?.channel(channelName);
    channel?.join().receive("ok", () => {
      console.log("Joined successfully");
      setChannel(channel);
    });

    // leave the channel when the component unmounts
    return () => {
      channel?.leave();
    };
  }, []);

  return channel;
};
