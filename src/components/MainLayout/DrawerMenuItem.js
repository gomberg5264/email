import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import HomeIcon from '@material-ui/icons/Home';
// import ProfileIcon from '@material-ui/icons/Person';
// import TeamIcon from '@material-ui/icons/SupervisorAccount';
// import AccountIcon from '@material-ui/icons/AccountCircle';
// import InfoIcon from '@material-ui/icons/InfoOutline';

const styles = {
    root: {
      flexGrow: 1,
    },
  };

function DrawerMenuItem(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <Link to={props.route} style={{ textDecoration: 'none' }}>
                <ListItem button>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>
                        {props.text}
                    </ListItemText>
                </ListItem>            
            </ Link>
        </div>
    );
    
}

DrawerMenuItem.defaultProps = {
    enabled: true,
    text: 'Link text missing!',
  };
DrawerMenuItem.propTypes = {
    enabled: PropTypes.bool,
    icon: PropTypes.string,
    text: PropTypes.string,
    route: PropTypes.string,
    classes: PropTypes.object.isRequired,  
};

export default withStyles(styles)(DrawerMenuItem);
