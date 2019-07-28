import React from 'react';

// TODO: move logs type definition to a common base module, outside of webapp.
export type LogsTableProps = {
  logs: string[];
}

class LogsTable extends React.Component<LogsTableProps> {
  constructor(props: LogsTableProps) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        {
          this.props.logs.map(log => <div>{log}</div>)
        }
      </React.Fragment>
    )
  }
}

export default LogsTable;