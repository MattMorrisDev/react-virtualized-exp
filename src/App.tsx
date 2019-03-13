import React, {Component} from 'react';
import './App.css';
import {MainContent} from './MainContent/MainContent';

class App extends Component {
  render() {
    return (
      <div className="PageWrapper">
        <div className="header"> header content</div>
        <div className="grow-vertically">
          <div className="sidebar">Sidebar content</div>
          <div className="content">
            <div style={{height: '100%'}}>
              <MainContent/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
