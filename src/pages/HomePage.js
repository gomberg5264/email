import React from 'react';
import Typography from 'material-ui/Typography';

export default class HomePage extends React.Component {

  render () {
    return (
      <div>
        <img src={require('../images/YDIN.png')} alt='YDIN logo' style={{width: 50}} />
        {/* <Typography variant="display2">
          YDIN
        </Typography> */}
        <Typography variant="title">
          Technology Consulting
        </Typography>        
        
      </div>
    )
  }

} // end of class
