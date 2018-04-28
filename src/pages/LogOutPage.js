import React from 'react';
import { Button, Typography } from 'material-ui';

export default class LogOutPage extends React.Component {


  _logout(){
    // remove token from local storage and reload page to reset apollo client
    localStorage.removeItem('graphcoolToken');
    window.location.reload();
  }

  render () {
    return (
      <div>
        <Typography variant="headline">
          Really want leave us like that..? After all these years..? :(
        </Typography>        

        <Button variant="raised" color="primary" onClick={this._logout}>
          Log Out
        </Button>
      </div>
    )
  }

} // end of class
