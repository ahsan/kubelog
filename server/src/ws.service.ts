import ws from 'ws';

let server: ws.Server;

export const initServer = () => {
  // create a new server
  console.log('Creating a WS server.');
  server = new ws.Server({ 
    host: 'localhost',
    port: 8080
  });

  server.on('connection', function connection(ws) {
    console.log('Received a WS connection.');
    ws.on('message', function incoming(message) {
      console.log('received message: %s', message);
    });

    console.log('Sending message.');
    ws.send('something');
  });
}

export const broadcastMessage = (message: string) => {
  console.log('Broadcasting message');
  for (const client of server.clients) {
    if (client.readyState === ws.OPEN) {
      client.send(message);
    }
  }
}