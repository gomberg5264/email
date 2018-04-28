import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { AppBar, Toolbar, IconButton, Typography } from 'material-ui';
import MenuIcon from '@material-ui/icons/Menu';

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

class Header extends React.Component {
    constructor() {
        super();
      }

    _handleClick = () => {
        this.props.parentMethod();
    }

    render () {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this._handleClick()}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            {this.props.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.defaultProps = {
    title: 'YDIN',
  };
Header.propTypes = {
    title: PropTypes.string,
    classes: PropTypes.object.isRequired,  
};

export default withStyles(styles)(Header);
