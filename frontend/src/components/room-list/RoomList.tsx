import { Room } from '../room/Room';
import './RoomList.scss';

interface Props {
  rooms: string[];
}

export function RoomList({ rooms }: Props) {
  if (rooms.length === 0) {
    return <p data-testid="RoomList--no-rooms">No rooms configured yet</p>;
  }

  return (
    <div className="RoomList" data-testid="RoomList">
      {rooms.map((room, index) => (
        <Room key={index} name={room} />
      ))}
    </div>
  );
}
