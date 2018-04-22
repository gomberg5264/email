import React from 'react';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class Profile extends React.Component {

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    } else {
      return (
        <div>
          <p>Profile</p>
          <p>{this.props.data.loggedInUser.id}</p>
        </div>
      );
    }
  }

} // end of class

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
      # firstName
      # lastName
      # userName
      # createdAt
      # updatedAt
    }
  }
`

export default compose(
  graphql(LOGGED_IN_USER_QUERY)
)(Profile)