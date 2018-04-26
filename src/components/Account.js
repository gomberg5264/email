import React from 'react';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';

import { printDate, uploadPhotoAsync } from '../utilities/functions.js';

const styles = {
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class Account extends React.Component {
  constructor(props) {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
    };
  }

  _renderSaveButton(){
    if ( false ) { // check if any changes done
      return (
        <div>
          <Button variant="raised" color="primary" onClick={this._authenticateUser}>
            Save Changes
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button variant="raised" color="secondary" disabled >
            Save Changes
          </Button>
        </div>
      );
    }
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    } else {
      return (
        <div>
        <div style={styles.avatarContainer}>          
          <Avatar
              alt='Profile'
              src={this.props.data.user.profilePhoto}
              style={{height: 200, width: 200}}
          />
          </div>
          <div>          
            <form noValidate autoComplete="off">
              <TextField
                autoFocus={true}
                id="firstName"
                label="First name"
                value={this.state.firstName}
                margin="normal"
                onChange={(e) => this.setState({firstName: e.target.value})}
                style = {{width: 300}} 
              />
              <br />
              <TextField
                id="lastName"
                label="Last name"
                value={this.state.lastName}
                margin="normal"
                onChange={(e) => this.setState({lastName: e.target.value})}
                style = {{width: 300}} 
              />
              <br />
              <TextField
                id="email"
                label="Email"
                value={this.state.email}
                margin="normal"
                onChange={(e) => this.setState({email: e.target.value})}
                style = {{width: 300}} 
              />
              <br />
              <TextField
                id="userName"
                label="Username"                
                value={this.state.userName}
                margin="normal"
                onChange={(e) => this.setState({userName: e.target.value})}
                style = {{width: 300}} 
              />
            </form>
          </div>
          {this._renderSaveButton()}
          <p>Joined: {printDate(this.props.data.user.createdAt)}</p>
        </div>
      );
    }
  }

} // end of class

const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    user {
      id
      email
      firstName
      lastName
      userName
      createdAt
      profilePhoto
    }
  }
`

export default compose(
  graphql(CURRENT_USER_QUERY)
)(Account)