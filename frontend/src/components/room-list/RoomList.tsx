import { Room } from "../room/Room";
import "./RoomList.scss";

interface Props {
  rooms: string[];
}

export function RoomList({ rooms }: Props) {
  if (rooms.length === 0) {
    return "Loading";
  }

  return (
    <div className="RoomList">
      {rooms.map((room, index) => (
        <Room key={index} name={room} />
      ))}
    </div>
  );
}
