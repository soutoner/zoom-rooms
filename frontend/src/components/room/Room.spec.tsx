import { fireEvent, render, screen } from '@testing-library/react';
import { Props, Room } from './Room';

describe('<Room />', () => {
  const name = 'TestRoom';

  const renderComponent = (props: Props = { name: name }) =>
    render(<Room {...props} />);

  const getStatusElement = () => screen.getByText(/Status/);

  it('should render its name', () => {
    renderComponent();

    const roomName = screen.getByText(name);
    expect(roomName).toBeInTheDocument();
    expect(roomName.innerHTML).toEqual(name);
  });

  it('should have proper className', () => {
    renderComponent();

    const room = screen.getByTestId(/Room/);
    expect(room).toBeInTheDocument();
    expect(room.className).toEqual('Room');
  });

  it('should have a state box, free by default', () => {
    renderComponent();

    const status = getStatusElement();
    expect(status).toBeInTheDocument();
    expect(status.className).toMatch(/--free$/);
  });

  describe('status on click interaction', () => {
    it('when free should set busy status', () => {
      renderComponent();

      const status = getStatusElement();
      fireEvent.click(status);

      expect(status.className).toMatch(/--busy$/);
    });

    it('when busy should set free status', () => {
      renderComponent({ name: name, busy: true });

      const status = getStatusElement();
      fireEvent.click(status);

      expect(status.className).toMatch(/--free$/);
    });
  });
});
