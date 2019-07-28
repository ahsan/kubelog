import React from 'react';
import LogsTable from './logsTable/table';
import WithWS from '../container/withWS';

class Body extends React.Component {
  render() {
    return (
      <React.Fragment>
        {
          <WithWS render={
            ({logs}) => <LogsTable logs={logs}/>
          }/>
        }
      </React.Fragment>
    )
  }
}

export default Body;