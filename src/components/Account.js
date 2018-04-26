import React from 'react';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import TextField from 'material-ui/TextField';

import Avatar from 'material-ui/Avatar';

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

  static getDerivedStateFromProps(nextProps, prevState) {
    return { firstName: this.props.data.user.firstName };
  }


  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    } else {
      return (
        <div>          
          <Avatar
                alt='Profile'
                src={this.props.data.user.profilePhoto}
                style={{height: 200, width: 200}}
            />

          <div className='w-100 pa4 flex justify-center'> 
            <div style={{ maxWidth: 400 }} className=''>
              <form noValidate autoComplete="off">
                <TextField
                  autoFocus={true}
                  id="firstName"
                  label="First name"
                  // className={classes.textField}
                  value={this.state.firstName}
                  margin="normal"
                  onChange={(e) => this.setState({firstName: e.target.value})}
                />
                <TextField
                  id="lastName"
                  label="Last name"
                  // className={classes.textField}
                  value={this.props.data.user.lastName}
                  margin="normal"
                  onChange={(e) => this.setState({lastName: e.target.value})}
                />
                <TextField
                  id="email"
                  label="Email"
                  // className={classes.textField}
                  value={this.state.email}
                  margin="normal"
                  onChange={(e) => this.setState({email: e.target.value})}
                />
                <TextField
                  id="userName"
                  label="Username"
                  // className={classes.textField}
                  value={this.state.userName}
                  margin="normal"
                  onChange={(e) => this.setState({userName: e.target.value})}
                />
              </form>
            </div>
          </div>

          <p>ID: {this.props.data.user.id}</p>
          <p>Email: {this.props.data.user.email} {this.state.email}</p>
          <p>First name: {this.props.data.user.firstName} {this.state.firstName}</p>
          <p>Last name: {this.props.data.user.lastName} {this.state.lastName}</p>
          <p>Username: {this.props.data.user.userName} {this.state.userName}</p>
          <p>Created at: {this.props.data.user.createdAt}</p>
          <p>Updated at: {this.props.data.user.updatedAt}</p>
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
      updatedAt
      profilePhoto
    }
  }
`

export default compose(
  graphql(CURRENT_USER_QUERY)
)(Account)