import React from 'react';
import { withRouter } from 'react-router-dom';

import { Button, Typography } from 'material-ui';

class LogOutPage extends React.Component {
  constructor(props) {
    super();
  }

  _logout = async () => {
    // remove token from local storage and reload page to reset apollo client
    await localStorage.removeItem('graphcoolToken');
    // window.location.reload();
    this.props.history.replace('/');
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


export default (withRouter(LogOutPage));
