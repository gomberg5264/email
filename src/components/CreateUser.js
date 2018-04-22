import React from 'react';
import { withRouter } from 'react-router-dom';

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
        <div>
          <p>Sign Up:</p>
        </div>
        <div className='w-100 pa4 flex justify-center'>
          <div style={{ maxWidth: 400 }} className=''>
            <input
              className='w-100 pa3 mv2'
              value={this.state.email}
              placeholder='Email'
              onChange={(e) => this.setState({email: e.target.value})}
            />
            <input
              className='w-100 pa3 mv2'
              type='password'
              value={this.state.password}
              placeholder='Password'
              onChange={(e) => this.setState({password: e.target.value})}
            />

            { this.state.email && this.state.password &&
            <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this._signupUser}>Sign up</button>
            }
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