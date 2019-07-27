import React from 'react';
import logo from './logo.svg';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
        <div>
          NavBar
        </div>
        <Container maxWidth="lg" style={{flex: 'auto'}}>
          <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100%'}}>
            Hello
          </Typography>
        </Container>
      </div>
    </React.Fragment>  
  );
}

export default App;
