import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useChannel } from './useChannel';
import { Channel, Push, Socket } from 'phoenix';

const mockChannel = vi.fn((topic: string) => new Channel(topic));
const mockJoin = vi.fn(function (this: { channel: Channel }) {
  return new Push(this.channel, '', {}, 0);
});
const mockLeave = vi.fn();
// Trick implementation that acts like it received the status
const mockReceive = vi.fn((_, callback: () => void) => callback());

vi.mock('phoenix', async (importOriginal) => {
  const actual = await importOriginal<typeof import('phoenix')>();
  return {
    ...actual,
    Socket: vi.fn(() => ({
      channel: mockChannel,
    })),
    Channel: vi.fn(() => ({
      join: mockJoin,
      leave: mockLeave,
    })),
    Push: vi.fn(() => ({
      receive: mockReceive,
    })),
  };
});

const mockSetState = vi.fn();
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>();
  return {
    ...actual,
    useState: vi.fn().mockReturnValue([null, () => mockSetState()]),
  };
});

describe('useChannel:', () => {
  const channelName = 'test';
  const mockSocket = new Socket('/socket');

  const renderUseChannel = (socket: Socket | null = null) =>
    renderHook(() => useChannel(socket, channelName));

  it('should return null if socket is null', () => {
    const { result } = renderUseChannel();

    expect(result.current).toBe(null);
    expect(mockChannel).not.toBeCalled();
  });

  it('should open a channel', () => {
    renderUseChannel(mockSocket);

    expect(mockChannel).toBeCalledTimes(1);
    expect(mockChannel).toBeCalledWith(channelName);
  });

  it('should join the channel', () => {
    renderUseChannel(mockSocket);

    expect(mockJoin).toBeCalledTimes(1);
  });

  it('should handle receive "ok"', () => {
    renderUseChannel(mockSocket);

    expect(mockReceive).toBeCalledTimes(1);
    expect(mockReceive).toBeCalledWith('ok', expect.anything());
  });

  it('should set socket in state', () => {
    renderUseChannel(mockSocket);

    expect(mockSetState).toBeCalledTimes(1);
  });

  it('should leave channel when unmounting', () => {
    const { unmount } = renderUseChannel(mockSocket);

    expect(mockLeave).not.toBeCalled();

    unmount();

    expect(mockLeave).toBeCalled();
  });
});
