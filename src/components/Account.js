import React from 'react';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Avatar from 'material-ui/Avatar';

class Account extends React.Component {

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    } else {
      return (
        <div>
          <p>My Account</p>
          
          <Avatar
                alt='Profile'
                src={this.props.data.user.profilePhoto}
                style={{height: 200, width: 200}}
            />

          <p>ID: {this.props.data.user.id}</p>
          <p>Email: {this.props.data.user.email}</p>
          <p>First name: {this.props.data.user.firstName}</p>
          <p>Last name: {this.props.data.user.lastName}</p>
          <p>Username: {this.props.data.user.userName}</p>
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