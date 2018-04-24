import React from 'react';

export default class Home extends React.Component {

  render () {
    return (
      <div>
        <img src={require('./YDIN.png')} alt='YDIN logo' style={{height: 120, width: 120}} />
        <h1>YDIN</h1>
        <p>Technology Consulting</p>
      </div>
    )
  }

} // end of class
