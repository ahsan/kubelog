import React from 'react';
import WebSocket from 'isomorphic-ws';
import { LogsTableProps } from '../components/logsTable/table';

type WithWSProps = {
  render: (logs: LogsTableProps) => React.ReactNode
}

type WithWSState = LogsTableProps & {};

class WithWS extends React.Component<WithWSProps, WithWSState> {
  constructor(props: WithWSProps) {
    super(props);

    this.state = {
      logs: []
    }

    const ws = new WebSocket('ws://localhost:8080');
    
    ws.onopen = () => {
      console.log('connected');
    }
    
    ws.onclose = () => {
      console.log('disconnected');
    }
    
    ws.onmessage = (data: { data: WebSocket.Data; type: string; target: WebSocket }) => {
      const msg = '' + data.data;
      const log = { msg }
      this.setState({
        logs: [ ...this.state.logs, log ]
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.render({
          logs: this.state.logs
        })}
      </React.Fragment>
    );
  }
}

export default WithWS;