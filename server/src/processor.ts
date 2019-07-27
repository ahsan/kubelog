import { broadcastMessage } from "./ws.service";

export const initProcessor = (logsStream: NodeJS.ReadStream) => {
  logsStream.on('data', (line) => {
    broadcastMessage(line);
  });

  logsStream.on('end', () => {
    console.log('Logs stream ended.');
  })
}