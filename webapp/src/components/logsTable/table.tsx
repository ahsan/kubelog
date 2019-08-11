import React from 'react';
import { VirtualizedTable } from '../virtualized.table';
import { Paper } from '@material-ui/core';
import { CVList } from '../collapsibleVirtualizedList/collapsible.virtualized.list';

// TODO: move logs type definition to a common base module, outside of webapp.
export type Log = {
  msg: string
}
export type LogsTableProps = {
  logs: Log[];
}

type LogsTableState = {
  tableWidth: number;
}

class LogsTable extends React.Component<LogsTableProps, LogsTableState> {
  
  tableContainer: React.RefObject<any>;

  constructor(props: LogsTableProps) {
    super(props);
    this.tableContainer = React.createRef();
    this.state = {
      tableWidth: 0,
    };
  }

  getRow({index}: {index: number}) {
    const {msg} = this.props.logs[index];
    console.log(`For ${index}: `, msg);
    return this.props.logs[index];
  }

  componentDidMount() {
    const tableWidth = this.tableContainer.current.clientWidth;
    this.setState({ tableWidth });
  }

  createMockData() {
    const arr = [];
    for (let i=0; i<1000; i++) {
      arr.push({ lines: [`${i}----------`, 'first first', 'first second', 'first third'] })
    }
    return arr;
  }

  render() {
    console.log(this.props.logs.length);
    const arr = this.createMockData();
    return (
      <React.Fragment>
        {
          <Paper 
            ref={this.tableContainer}
            style={{
              width: '100%',
              height: '100%',
              scrollBehavior: 'auto',
            }}>
            {/* <VirtualizedTable
            rowCount={this.props.logs.length}
            rowGetter={({index}) => this.props.logs[index]}
            columns={[
              {
                width: this.state.tableWidth,
                label: 'Message',
                dataKey: 'msg'
              }
            ]}
            /> */}
            <CVList
              listDataSource={arr}
            />
          </Paper>
        }
      </React.Fragment>
    )
  }
}

export default LogsTable;