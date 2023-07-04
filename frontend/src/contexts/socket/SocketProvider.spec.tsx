import { describe, afterEach, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SocketProvider } from './SocketProvider';
import { Socket } from 'phoenix';

vi.mock('phoenix', () => {
  const Socket = vi.fn();
  Socket.prototype.connect = vi.fn();
  Socket.prototype.disconnect = vi.fn();

  return { Socket };
});

describe('SocketProvider:', () => {
  const children = <p>Test</p>;

  const renderProvider = () =>
    render(<SocketProvider>{children}</SocketProvider>);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render children', () => {
    renderProvider();

    const renderedChildren = screen.getByText(/Test/);
    expect(renderedChildren).toBeInTheDocument();
    expect(renderedChildren.innerHTML).toEqual('Test');
  });

  it('should connect the socket', () => {
    renderProvider();

    expect(Socket.prototype.connect).toBeCalledTimes(1);
  });

  it('should disconnect the socket', () => {
    const { unmount } = renderProvider();

    // Why this first call happens?
    expect(Socket.prototype.disconnect).toBeCalledTimes(1);

    unmount();

    expect(Socket.prototype.disconnect).toBeCalledTimes(2);
  });
});
