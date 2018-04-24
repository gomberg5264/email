import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Profile extends React.Component {

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    } else if (!this.props.data.loading && this.props.data.User) {
      return (
        <div>
            <img src={this.props.data.User.profilePhoto} alt='Profile' style={{height: 200}} />

            <p>Profile username: {this.props.match.params.userName}</p>

            <p>First name: {this.props.data.User.firstName}</p>
            <p>Last name: {this.props.data.User.lastName}</p>
            <p>Email: {this.props.data.User.email}</p>

            <p>Created at: {this.props.data.User.createdAt}</p>
            <p>Updated at: {this.props.data.User.updatedAt}</p>
        </div>
      );
    } else {
        return (
            <div>
                <p>No user found with the username: "{this.props.match.params.userName}", or the profile is private.</p>
            </div>
        );
    }
  }

} // end of class

const USER_QUERY = gql`
    query UserQuery ($userName: String) {
        User (userName: $userName){
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

export default graphql (USER_QUERY, { options: (props) => { return { variables: { userName: props.match.params.userName } } } } ) (Profile);
