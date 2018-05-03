import React from 'react';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { TextField, Button, Avatar, IconButton } from 'material-ui';

import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

import PersonIcon from '@material-ui/icons/Person';
import UsernameIcon from '@material-ui/icons/PersonOutline';
import EmailIcon from '@material-ui/icons/Email';

// Privacy icons:
import OnlyMeIcon from '@material-ui/icons/Lock';
import TeamIcon from '@material-ui/icons/SupervisorAccount';
import PublicIcon from '@material-ui/icons/Public';

import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';


import { printDate } from '../components/functions.js';

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

class AccountPage extends React.Component {
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

          <div style={styles.avatarContainer}>          
            <List style={{width: 350}}>              
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary='First name'
                  secondary={this.props.data.user.firstName ? this.props.data.user.firstName : 'Missing...'}
                />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Delete">
                    <PublicIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>                
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary='Last name'
                  secondary={this.props.data.user.lastName ? this.props.data.user.lastName : 'Missing...'}
                />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Delete">
                    <PublicIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>                
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <UsernameIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary='Username'
                  secondary={this.props.data.user.userName ? this.props.data.user.userName : 'Missing...'}
                />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Delete">
                    <TeamIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>                
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <EmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary='Email'
                  secondary={this.props.data.user.email ? this.props.data.user.email : 'Missing...'}
                />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Delete">
                    <OnlyMeIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>                            
              <ListItem>
                <ListItemText
                  primary='Joined'
                  secondary={this.props.data.user.createdAt ? printDate(this.props.data.user.createdAt) : 'Missing...'}
                />
              </ListItem>                            
            </List>
          </div>
          {/* <div>          
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
          <p>Joined: {printDate(this.props.data.user.createdAt)}</p> */}

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
)(AccountPage)