import React from 'react';

export default class Home extends React.Component {

  render () {
    return (
      <div>
        <img src={require('./YDIN_logotype.png')} alt='YDIN logo' style={{width: 250}} />
        <h2>Technology Consulting</h2>
        {/* <p>Technology Consulting</p> */}
      </div>
    )
  }

} // end of class
