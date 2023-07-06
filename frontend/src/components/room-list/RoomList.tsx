import { Room } from 'src/components/room/Room';
import { Room as ServiceRoom } from 'src/model/service/Room';
import 'src/components/room-list/RoomList.scss';

interface Props {
  rooms: ServiceRoom[];
}

export function RoomList({ rooms }: Props) {
  if (rooms.length === 0) {
    return <p data-testid="RoomList--no-rooms">No rooms configured yet</p>;
  }

  return (
    <div className="RoomList" data-testid="RoomList">
      {rooms.map((room, index) => (
        <Room key={index} id={index} name={room.name} busy={room.busy} />
      ))}
    </div>
  );
}
