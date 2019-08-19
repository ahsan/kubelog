import React from 'react';
import WebSocket from 'isomorphic-ws';
import { LogsTableProps } from '../components/logsTable/table';
import { Line, Row } from '../../../shared/log.types';

type WithWSProps = {
  render: (logs: LogsTableProps) => React.ReactNode
}

type WithWSState = LogsTableProps & {};

class WithWS extends React.Component<WithWSProps, WithWSState> {
  constructor(props: WithWSProps) {
    super(props);

    this.state = {
      rows: []
    };

    const ws = new WebSocket('ws://localhost:8080');
    
    ws.onopen = () => {
      console.log('connected');
    }
    
    ws.onclose = () => {
      console.log('disconnected');
    }
    
    ws.onmessage = (data: { data: WebSocket.Data; type: string; target: WebSocket }) => {
      const line = data.data as Line;
      const header = line;
      let row: Row = { header, lines: [] };
      try {
        const lineJson = JSON.parse(line);
        const lines = JSON.stringify(lineJson, null, 2).split('\n');
        row = { lines, header };
      } catch (err) {
        row = { header, lines: [line] };
      } finally {
        this.setState({
          rows: [ ...this.state.rows, row ],
        });
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.render({
          rows: this.state.rows
        })}
      </React.Fragment>
    );
  }
}

export default WithWS;