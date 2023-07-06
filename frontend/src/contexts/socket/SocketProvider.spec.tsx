import { describe, afterEach, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SocketProvider } from 'src/contexts/socket/SocketProvider';

const mockConnect = vi.fn();
const mockDisconnect = vi.fn();

vi.mock('phoenix', async (importOriginal) => {
  const actual = await importOriginal<typeof import('phoenix')>();
  return {
    ...actual,
    Socket: vi.fn(() => ({
      connect: mockConnect,
      disconnect: mockDisconnect,
    })),
  };
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

    expect(mockConnect).toBeCalledTimes(1);
  });

  it('should disconnect the socket', () => {
    const { unmount } = renderProvider();

    expect(mockDisconnect).toBeCalledTimes(0);

    unmount();

    expect(mockDisconnect).toBeCalledTimes(1);
  });
});
