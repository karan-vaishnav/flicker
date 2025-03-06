export const createWebSocket = (
  url: string,
  onMessage: (event: MessageEvent) => void,
  onOpen?: () => void,
  onClose?: () => void,
  onError?: (event: Event) => void
): WebSocket => {
  const ws = new WebSocket(url);

  ws.onopen = () => {
    if (onOpen) onOpen();
  };

  ws.onmessage = onMessage;

  ws.onclose = () => {
    if (onClose) onClose();
  };

  ws.onerror = (event) => {
    if (onError) onError(event);
  };

  return ws;
};
