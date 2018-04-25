import React from 'react';
import { withRouter } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class CreateUser extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  _signupUser = async () => {
    const { email, password } = this.state;

    try {
      const user = await this.props.signupUserMutation({variables: {email, password}});
      localStorage.setItem('graphcoolToken', user.data.signupUser.token);
      window.location.reload();
      this.props.history.replace('/');
    } catch (e) {
      console.error(`An error occured: `, e);
      this.props.history.replace('/');
    }
  }

  _renderSignUpButton(){
    if (this.state.email && this.state.password) {
      return (
        <div>
          <Button variant="raised" color="primary" onClick={this._signupUser}>
            Sign Up
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button variant="raised" color="secondary" disabled >
            Sign Up
          </Button>
        </div>
      );
    }
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    // redirect if user is logged in
    if (this.props.data.loggedInUser.id) {
      console.warn('Already logged in');
      this.props.history.replace('/');
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
                value={this.state.email}
                margin="normal"
                onChange={(e) => this.setState({email: e.target.value})}
              />
              <TextField
                id="password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                margin="normal"
                onChange={(e) => this.setState({password: e.target.value})}
              />
            </form>

            {this._renderSignUpButton()}

          </div>
        </div>
      </div>
    )
  }

} // end of class

const SIGNUP_USER_MUTATION = gql`
  mutation SignupUserMutation ($email: String!, $password: String!) {
    signupUser(email: $email, password: $password) {
      id
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
  graphql(SIGNUP_USER_MUTATION, {name: 'signupUserMutation'}),
  graphql(LOGGED_IN_USER_QUERY)
)(withRouter(CreateUser))