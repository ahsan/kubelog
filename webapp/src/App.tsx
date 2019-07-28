import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Navbar from './components/navbar/navbar'

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import WebSocket from 'isomorphic-ws';

type State = {
  logs: string[];
}

class App extends React.Component<any, State> {
  logs: string[] = [];

  constructor(props: any) {
    super(props);

    this.state = {
      logs: []
    };
    
    // const ws = new WebSocket('wss://echo.websocket.org/', {
    //   origin: 'https://websocket.org'
    // });
    const ws = new WebSocket('ws://localhost:8080');
    
    ws.onopen = () => {
      console.log('connected');
    }
    
    ws.onclose = () => {
      console.log('disconnected');
    }
    
    ws.onmessage = (data: { data: WebSocket.Data; type: string; target: WebSocket }) => {
      const message = '' + data.data;
      this.setState({
        logs: [ ...this.state.logs, message ]
      });
      console.log('length: ', this.state.logs.length);
    }
  }


  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
          <Navbar/>
          <Container maxWidth="lg" style={{flex: 'auto'}}>
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100%'}}>
              {this.state.logs.map(log => <div>{log}</div>)}
            </Typography>
          </Container>
        </div>
      </React.Fragment>  
    );
  }
}

export default App;
