import React from 'react';
import { Paper } from '@material-ui/core';
import { CVList } from '../collapsibleVirtualizedList/collapsible.virtualized.list';
import { Row } from '../../../../shared/log.types';

export type LogsTableProps = {
  rows: Row[];
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

  componentDidMount() {
    const tableWidth = this.tableContainer.current.clientWidth;
    this.setState({ tableWidth });
  }

  render() {
    const listDataSource = this.props.rows;
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
            <CVList
              listDataSource={listDataSource}
            />
          </Paper>
        }
      </React.Fragment>
    )
  }
}

export default LogsTable;