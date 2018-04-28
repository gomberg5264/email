import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { Divider, List, SwipeableDrawer } from 'material-ui';

import DrawerMenuItem from './DrawerMenuItem';

const styles = {
    list: {
      width: 350,
    },
    fullList: {
      width: 'auto',
    },
  };

class DrawerMenu extends React.Component {
    constructor() {
        super();
        // this.state = { 
        //   drawerOpen: true,
        // };
      }

    // _toggleDrawer = (open) => () => {
    //     this.setState({
    //         drawerOpen: open,
    //     });
    // };
    
    render() {
        const { classes } = this.props;

        // Override iOS "Back" swipe and instead open the drawer
        const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

        return (
            <div className={classes.root}>

                <SwipeableDrawer
                    // open={this.state.drawerOpen}
                    // onClose={this._toggleDrawer(false)}
                    // onOpen={this._toggleDrawer(true)}
                    disableBackdropTransition={!iOS} disableDiscovery={iOS}
                >
                    <div>
                        <img src={require('../../images/YDIN_logotype.png')} alt='YDIN logo' style={{height: 50}} />
                        <List>
                            <DrawerMenuItem enabled={true} icon='Home' text='Home' route='/' />
                        </List>
                        <Divider /> 
                        <List>
                            <DrawerMenuItem enabled={true} icon='AccountCircle' text='Account' route='/account' />                            
                            <DrawerMenuItem enabled={true} icon='SupervisorAccount' text='Team' route='/team' />
                            </List>
                            <Divider /> 
                            <List>
                            <DrawerMenuItem enabled={true} icon='AccountCircle' text='Sign Up' route='/signup' />
                            <DrawerMenuItem enabled={true} icon='AccountCircle' text='Log In' route='/login' />
                            <DrawerMenuItem enabled={true} icon='AccountCircle' text='Log Out' route='/logout' />
                            </List>
                            <Divider /> 
                            <List>
                            <DrawerMenuItem enabled={true} icon='InfoOutline' text='About' route='/about' />                            
                        </List>
                    </div>
                </SwipeableDrawer>
            </div>
      );
    }  
}

DrawerMenu.defaultProps = {

  };
DrawerMenu.propTypes = {
    classes: PropTypes.object.isRequired,  
};

export default withStyles(styles)(DrawerMenu);
