import React from 'react';
import { VirtualizedTable } from '../virtualized.table';
import { Paper } from '@material-ui/core';

// TODO: move logs type definition to a common base module, outside of webapp.
export type Log = {
  msg: string
}
export type LogsTableProps = {
  logs: Log[];
}

class LogsTable extends React.Component<LogsTableProps> {
  constructor(props: LogsTableProps) {
    super(props);
  }

  getRow({index}: {index: number}) {
    const {msg} = this.props.logs[index];
    console.log(`For ${index}: `, msg);
    return this.props.logs[index];
  }

  render() {
    console.log(this.props.logs.length);
    return (
      <React.Fragment>
        {
          <Paper style={{
            width: '100%',
            height: '100%',
            scrollBehavior: 'auto',
          }}>
            <VirtualizedTable
            rowCount={this.props.logs.length}
            rowGetter={({index}) => this.props.logs[index]}
            columns={[
              {
                width: 1000,
                label: 'Message',
                dataKey: 'msg'
              }
            ]}

          />
          </Paper>
        }
      </React.Fragment>
    )
  }
}

export default LogsTable;