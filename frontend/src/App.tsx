import { useContext, useEffect, useState } from 'react';
import { RoomList } from 'src/components/room-list/RoomList';
import { Room as ServiceRoom } from 'src/model/service/Room';
import { ChannelContext } from 'src/contexts/channel/ChannelProvider';
import 'src/App.scss';

function App() {
  const channel = useContext(ChannelContext);
  const [roomList, setRoomList] = useState<ServiceRoom[]>([]);

  useEffect(() => {
    channel?.push('read_rooms', {}).receive('ok', (response) => {
      console.log(JSON.stringify(response));
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
