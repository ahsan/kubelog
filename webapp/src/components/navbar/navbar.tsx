import React from 'react';
import './navbar.css';
import tree from './tree.png'

class Navbar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="topnav shadow d-flex">
          {/* Project Icon */}
          <img src={tree} className="mt-auto mb-auto ml-2 mr-2" style={{height: '32px'}}/>
          {/* Links */}
          <a className="active" href="#logs">Logs</a>
          <a href="https://www.github.com/ahsan/kubelog" target="_blank" className="ml-auto">GitHub</a>
        </div>
      </React.Fragment>
    );
  }
}

export default Navbar;