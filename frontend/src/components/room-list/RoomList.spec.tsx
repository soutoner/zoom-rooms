import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RoomList } from 'src/components/room-list/RoomList';

describe('<RoomList />', () => {
  it('should render message if no rooms', () => {
    render(<RoomList rooms={[]} />);

    const message = screen.getByTestId('RoomList--no-rooms');
    expect(message).toBeInTheDocument();
    expect(message.innerHTML).toEqual('No rooms configured yet');
  });

  it('should render as many rooms as provided', () => {
    const rooms = ['Room1', 'Room2', 'Room3'];

    render(<RoomList rooms={rooms} />);

    const roomList = screen.getByTestId(/RoomList/);
    expect(roomList).toBeInTheDocument();
    expect(roomList.children.length).toEqual(rooms.length);
  });
});
