import React from 'react';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getGame = this.getGame.bind(this);
  }

  getGame() {
    window.location.hash = '#board';
  }

  render() {
    return (
        <div className='container'>
          <div className='row half-height'></div>
          <div className="row">
            <div className="col-12 text-center align-middle">
              <button className="btn btn-info" onClick={this.getGame}>New Game</button>
            </div>
          </div>
        </div>
    );
  }
}

Home.contextType = AppContext;
