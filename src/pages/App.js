import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link } from 'react-router-dom';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';

import { AppBar, Toolbar, IconButton, Typography, Divider, List, SwipeableDrawer } from 'material-ui';
import MenuIcon from '@material-ui/icons/Menu';
import { CircularProgress } from 'material-ui/Progress';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import HomeIcon from '@material-ui/icons/Home';
import ProfileIcon from '@material-ui/icons/Person';
import TeamIcon from '@material-ui/icons/SupervisorAccount';
import AccountIcon from '@material-ui/icons/AccountCircle';
import InfoIcon from '@material-ui/icons/InfoOutline';

import LogInPage from './LogInPage';
import LogOutPage from './LogOutPage';
import SignUpPage from './SignUpPage';
import AboutPage from './AboutPage';
import ProfilePage from './ProfilePage';
import AccountPage from './AccountPage';
import HomePage from './HomePage';
import TeamPage from './TeamPage';


const muiTheme = createMuiTheme();

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      drawerOpen: false,
      pageTitle: '',
    };
  }

  _isLoggedIn = () => {
    return !this.props.data.loading && this.props.data.loggedInUser && this.props.data.loggedInUser.id !== null;
  };

  _toggleDrawer = (open) => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  _pageTitle() {
    let path = window.location.pathname;
    switch (path) {
      case '/':
        return 'YDIN';
      case '/signup':
        return 'Sign Up';
      case '/login':
        return 'Log In';
      case '/logout':
        return 'Log Out';
      case '/about':
        return 'About';        
      case '/account':
        return 'My Account';
      case '/team':
        return 'Team';
      default:
        return path.substring(1, path.length);
    }
  }
  _renderHeader(){
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <AppBar position="fixed">
            <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this._toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                    {this._pageTitle()}
                </Typography>
            </Toolbar>
        </AppBar>
      </div>
    );
  }

  _renderDrawerMenu(){
    const { classes } = this.props;
    // Override iOS "Back" swipe and instead open the drawer
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
      <div className={classes.root}>
          <SwipeableDrawer
              open={this.state.drawerOpen}
              onClose={this._toggleDrawer(false)}
              onOpen={this._toggleDrawer(true)}
              disableBackdropTransition={!iOS} disableDiscovery={iOS}
          >
              <div>
                  <img src={require('../images/YDIN_logotype.png')} alt='YDIN logo' style={{height: 50}} />
                  <List>
                    <Link to={'/'} style={{ textDecoration: 'none' }}>
                      <ListItem button onClick={this._toggleDrawer(false)}>
                          <ListItemIcon><HomeIcon /></ListItemIcon>
                          <ListItemText>Home</ListItemText>
                      </ListItem>            
                    </ Link>
                  </List>
                  <Divider />
                  <List>
                    { this._isLoggedIn() ? 
                      <React.Fragment>
                        <Link to={'/account'} style={{ textDecoration: 'none' }}>
                          <ListItem button onClick={this._toggleDrawer(false)}>
                              <ListItemIcon><ProfileIcon /></ListItemIcon>
                              <ListItemText>Account</ListItemText>
                          </ListItem>            
                        </ Link> 
                        <Link to={'/team'} style={{ textDecoration: 'none' }}>
                          <ListItem button onClick={this._toggleDrawer(false)}>
                            <ListItemIcon><TeamIcon /></ListItemIcon>
                            <ListItemText>Team</ListItemText>
                          </ListItem>            
                        </ Link> 
                      </React.Fragment>                     
                      : ''}
                    { this._isLoggedIn() ? 
                      <Link to={'/logout'} style={{ textDecoration: 'none' }}>
                        <ListItem button onClick={this._toggleDrawer(false)}>
                            <ListItemIcon><AccountIcon /></ListItemIcon>
                            <ListItemText>Log Out</ListItemText>
                        </ListItem>            
                      </ Link>
                      :
                      <React.Fragment>
                        <Link to={'/signup'} style={{ textDecoration: 'none' }}>
                          <ListItem button onClick={this._toggleDrawer(false)}>
                              <ListItemIcon><AccountIcon /></ListItemIcon>
                              <ListItemText>Sign Up</ListItemText>
                          </ListItem>            
                        </ Link>
                        <Link to={'/login'} style={{ textDecoration: 'none' }}>
                          <ListItem button onClick={this._toggleDrawer(false)}>
                              <ListItemIcon><AccountIcon /></ListItemIcon>
                              <ListItemText>Log In</ListItemText>
                          </ListItem>            
                        </ Link>
                      </React.Fragment>
                    }
                  </List>
                  <Divider />
                  <List>
                    <Link to={'/about'} style={{ textDecoration: 'none' }}>
                      <ListItem button onClick={this._toggleDrawer(false)}>
                          <ListItemIcon><InfoIcon /></ListItemIcon>
                          <ListItemText>About</ListItemText>
                      </ListItem>            
                    </ Link>
                  </List>
              </div>
          </SwipeableDrawer>
      </div>
    );
  }

  _renderMainContent() {
    if (this.props.data.loading) {
      return (
        <div>
          <CircularProgress size={50} />
        </div>);
    } else {
      return (
        <div style={{ textAlign: 'center', paddingTop: 65, paddingBottom: 50, paddingLeft: 10, paddingRight: 10}}>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/login' component={LogInPage}/>
            <Route path='/logout' component={LogOutPage}/>
            <Route path='/signup' component={SignUpPage}/>
            <Route path='/about' component={AboutPage}/>
            <Route path='/account' component={AccountPage}/>
            <Route path='/team' component={TeamPage}/>
            <Route path='/:userName' component={ProfilePage}/>
          </Switch>
        </div>
      );
    }
  }

  render () {
    return (
      <MuiThemeProvider theme={muiTheme}>
        {this._renderHeader()}
        {this._renderDrawerMenu()}
        {this._renderMainContent()}
        {/* this_renderFooter() */}
      </MuiThemeProvider>
    );
  }

} // end of class

App.defaultProps = {
  title: '/',
};
App.propTypes = {
  userName: PropTypes.string,
  classes: PropTypes.object.isRequired,  
};

const LOGGED_IN_USER_QUERY = gql`

  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`

// export default graphql(LOGGED_IN_USER_QUERY, { options: { fetchPolicy: 'network-only' } } ) (App);

export default graphql (LOGGED_IN_USER_QUERY, { options: (props) => { return { variables: { userName: props.userName } } } }) (withStyles(styles)(App));