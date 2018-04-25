import React from 'react';
import { withRouter } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class CreateLogin extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  _authenticateUser = async () => {
    const {email, password} = this.state;

    const response = await this.props.authenticateUserMutation({variables: {email, password}});
    localStorage.setItem('graphcoolToken', response.data.authenticateUser.token);
    window.location.reload();
    this.props.history.replace('/');
  }

  _renderLogInButton(){
    if (this.state.email && this.state.password) {
      return (
        <div>
          <Button variant="raised" color="primary" onClick={this._authenticateUser}>
            Log In
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button variant="raised" color="secondary" disabled >
            Log In
          </Button>
        </div>
      );
    }
  }

  render () {
    if (this.props.data.loading) {
      return (
        <div className='w-100 pa4 flex justify-center'>
          <div>Loading</div>
        </div>
      )
    }

    // redirect if user is logged in
    if (this.props.data.loggedInUser.id) {
      console.warn('already logged in')
      this.props.history.replace('/')
    }

    return (
      <div>
        <div className='w-100 pa4 flex justify-center'> 
          <div style={{ maxWidth: 400 }} className=''>
            <form noValidate autoComplete="off">
              <TextField
                autoFocus="true"
                id="email"
                label="Email"
                // className={classes.textField}
                value={this.state.email}
                margin="normal"
                onChange={(e) => this.setState({email: e.target.value})}
              />
              <TextField
                id="password-input"
                label="Password"
                // className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                onChange={(e) => this.setState({password: e.target.value})}
              />
            </form>

            {this._renderLogInButton()}

          </div>
        </div>
      </div>
    )
  }

} // end of class

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation ($email: String!, $password: String!) { 
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`
export default compose(
  graphql(AUTHENTICATE_USER_MUTATION, {name: 'authenticateUserMutation'}),
  graphql(LOGGED_IN_USER_QUERY)
)(withRouter(CreateLogin));
