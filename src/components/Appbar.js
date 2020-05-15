import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Avatar, Grid, Button, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList
} from '@material-ui/core';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { setUser } from '../store/action'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1
  },
}));

function AppNavBar(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const signout = () => {
    Cookies.remove('MEGAFIT_TKN');
    props.history.push("/")
    props.setUser({ userId: null, roleId: null, fullname: "", nickname: "" })
  }

  const profil = () => {
    props.history.push("/profil")
  }

  return (
    <Grid className={classes.root}>
      <AppBar position="fixed" style={{ padding: 0 }}>
        <Toolbar style={{ backgroundColor: "#FAFAFA", padding: 0 }}>
          <Grid style={{ display: "flex", position: "absolute", right: 50, height: "100%", alignItems: "center" }}>
            <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <Avatar alt="icon" src={require('../asset/icon_user.png')} style={{ marginRight: 10 }} />
              <p style={{ marginRight: 10, color: "black" }}>{props.fullname}</p>
              <KeyboardArrowDownIcon style={{ fontSize: 30, color: "#BDBDBD", }} />
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ width: 200, alignSelf: 'flex-end' }} >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        {
                          props.roleId === 4 &&
                          <MenuItem onClick={profil}>Profile</MenuItem>
                        }
                        <MenuItem onClick={signout}>Signout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

const mapDispatchToProps = {
  setUser
}

const mapStateToProps = ({ fullname, roleId }) => {
  return {
    fullname,
    roleId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppNavBar))