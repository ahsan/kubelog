import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Navbar from './components/navbar/navbar';
import Body from './components/body';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


class App extends React.Component<any> {

  constructor(props: any) {
    super(props);
  }


  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
          <Navbar/>
          <Container maxWidth="lg" style={{flex: 'auto'}}>
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100%'}}>
              <Body/>
            </Typography>
          </Container>
        </div>
      </React.Fragment>  
    );
  }
}

export default App;
