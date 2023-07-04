export const SocketConstants = {
  PROTOCOL: 'ws',
  DOMAIN: '127.0.0.1:4000',
  ENDPOINT: '/socket',
  RECONNECT_AFTER_MS: 10000,
};

export const SOCKET_URL = `${SocketConstants.PROTOCOL}://${SocketConstants.DOMAIN}${SocketConstants.ENDPOINT}`;
