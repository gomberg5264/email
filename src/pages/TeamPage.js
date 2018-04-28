import React from 'react';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import List from 'material-ui/List';
import { ListItem, ListItemText } from 'material-ui/List';

class TeamPage extends React.Component {

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    } else {
      return (
        <div>
          <p>Team:</p>
          <List>
            {
          this.props.data.allUsers.map((teamMember, index) => (
            <ListItem>
              <ListItemText>
                ID: {teamMember.id} {teamMember.userName} {teamMember.email} 
              </ListItemText>
            </ListItem>
          ))
        }
        </List>
      </div>
      );
    }
  }

} // end of class

const ALL_USERS_QUERY = gql`
  query AllUserQuery {
    allUsers {
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
  graphql(ALL_USERS_QUERY)
)(TeamPage)