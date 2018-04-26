import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import 'typeface-roboto';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import SwipeableDrawer from 'material-ui/SwipeableDrawer';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ProfileIcon from '@material-ui/icons/Person';
import TeamIcon from '@material-ui/icons/SupervisorAccount';
import AccountIcon from '@material-ui/icons/AccountCircle';
import InfoIcon from '@material-ui/icons/InfoOutline';

import LoginUser from './LoginUser';
import CreateUser from './CreateUser';
import About from './About';
import Profile from './Profile';
import Account from './Account';
import Home from './Home';
import Team from './Team';

const theme = createMuiTheme();

const styles = {
  container: {
    textAlign: 'center',
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.styles = {
      width: 250,
    };
    this.state = { 
      drawerOpen: false,
      pageTitle: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { pageTitle: nextProps.userName };
  }


  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    localStorage.removeItem('graphcoolToken');
    window.location.reload();
  }

  _isLoggedIn = () => {
    return !this.props.data.loading && this.props.data.loggedInUser && this.props.data.loggedInUser.id !== null;
  };

  _toggleDrawer = (open) => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  _pageTitle(userName) {  
    switch (userName) {
      case 'login':
        return 'Log In';
      case 'signup':
        return 'Sign Up';
        case 'about':
          return 'About';        
        case 'account':
          return 'My Account';
        case 'team':
          return 'Team';
        default:
          return userName;
    }
  }

  render () {
    return (
      <div style={styles.container}>
        {this._renderDrawer()}
        {this._renderAppBar()}
        {this._renderMainContent()}
      </div>
    );
  }

  _renderAppBar() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton color="inherit" onClick={this._toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" >
                {this._pageTitle(this.state.pageTitle)}
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      </MuiThemeProvider>
    );
  }

  _renderDrawer() {
    // Override iOS "Back" swipe and instead open the drawer
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (this._isLoggedIn()) {
      return(
        <div>
          <SwipeableDrawer
            open={this.state.drawerOpen}
            onClose={this._toggleDrawer(false)}
            onOpen={this._toggleDrawer(true)}
            disableBackdropTransition={!iOS} disableDiscovery={iOS}
          >
          <div>
            <img src={require('./YDIN_logotype.png')} alt='YDIN logo' style={{height: 50}} />
            <List>
              <Link to='/'>
                <ListItem button onClick={this._toggleDrawer(false)}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText>
                    Home
                  </ListItemText>
                </ListItem>
              </Link>
            </List>
            <Divider />
            <List>
              <Link to='/account'>
                <ListItem button onClick={this._toggleDrawer(false)}>
                    <ListItemIcon>
                      <ProfileIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Account
                      </ListItemText>
                  </ListItem>
                </Link>
              <Link to='/team'>
                <ListItem button onClick={this._toggleDrawer(false)}>
                  <ListItemIcon>
                    <TeamIcon />
                  </ListItemIcon>
                  <ListItemText primary="Team" />
                </ListItem>
                </Link>
              </List>
              <Divider />
              <List>
                <Link to='/about'>
                  <ListItem button onClick={this._toggleDrawer(false)}>
                    <ListItemIcon>
                      <InfoIcon />
                    </ListItemIcon>
                    <ListItemText>
                      About
                    </ListItemText>
                  </ListItem>
                </Link>
            </List>
            <Divider />            
            <List>              
                <ListItem button onClick={this._logout} >
                  <ListItemIcon>
                    <AccountIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log Out" />
                </ListItem>                            
            </List>
          </div>
        </SwipeableDrawer>
      </div>
      );
    } else {
      return(
        <div>
          <SwipeableDrawer
            open={this.state.drawerOpen}
            onClose={this._toggleDrawer(false)}
            onOpen={this._toggleDrawer(true)}
            disableBackdropTransition={!iOS} disableDiscovery={iOS}
          >
          <div>
          <List>
            <Link to='/'>
              <ListItem button onClick={this._toggleDrawer(false)}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText>
                  Home
                </ListItemText>
              </ListItem>
            </Link>
            <Link to='/about'>
              <ListItem button onClick={this._toggleDrawer(false)}>              
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText>About</ListItemText>              
              </ListItem>
              </Link>
            </List>
            <Divider />            
            <List>
              <Link to='/login'>
                <ListItem button onClick={this._toggleDrawer(false)} >
                  <ListItemIcon>
                    <AccountIcon />
                  </ListItemIcon>
                  <ListItemText>
                    Log In
                  </ListItemText>
                </ListItem>
              </Link>
              <Link to='/signup'>
                <ListItem button onClick={this._toggleDrawer(false)}>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText>
                    Sign Up  
                  </ListItemText>
                </ListItem>
              </Link>
            </List>
          </div>
        </SwipeableDrawer>
      </div>
      );
    }
  }

  _renderMainContent() {
    if (this.props.data.loading) {
      return (
        <div>
          <CircularProgress size={50} />
        </div>);
    } else {
      return (
        <div style={{ paddingTop: 65, paddingBottom: 50, paddingLeft: 10, paddingRight: 10}}>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/login' component={LoginUser}/>
            <Route path='/signup' component={CreateUser}/>
            <Route path='/about' component={About}/>
            <Route path='/account' component={Account}/>
            <Route path='/team' component={Team}/>
            <Route path='/:userName' component={Profile}/>
          </Switch>
        </div>
      );
    }
  }

} // end of class

const LOGGED_IN_USER_QUERY = gql`

  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`

// export default graphql(LOGGED_IN_USER_QUERY, { options: { fetchPolicy: 'network-only' } } ) (App);

export default graphql (LOGGED_IN_USER_QUERY, { options: (props) => { return { variables: { userName: props.userName } } } }) (App);