import { useContext, useEffect, useState } from 'react';
import { useChannel } from './hooks/channel/useChannel';
import { RoomList } from './components/room-list/RoomList';
import { SocketContext } from './contexts/socket/SocketProvider';
import './App.scss';

function App() {
  const socket = useContext(SocketContext);
  const channel = useChannel(socket, 'room:lobby');
  const [roomList, setRoomList] = useState<string[]>([]);

  useEffect(() => {
    channel?.push('read_rooms', {}).receive('ok', (response) => {
      setRoomList(() => response);
    });
  }, [channel]);

  return (
    <div className="App">
      <h1>Zoom Rooms</h1>
      <RoomList rooms={roomList} />
    </div>
  );
}

export default App;
