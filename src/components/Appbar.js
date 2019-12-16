import React from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {  withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import {setUser} from '../store/action'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    zIndex:1
  },
}));

function ButtonAppBar(props) {
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

  const signout = () =>{
    localStorage.removeItem("token")
    props.history.push("/")
    props.setUser({userId:null, roleId:null, fullname:"", nickname:""})
  }

  return (
    <Grid className={classes.root}>
      <AppBar position="fixed" style={{padding:0}}>
        <Toolbar style={{ backgroundColor: "#FAFAFA", padding:0 }}>
          <Grid style={{ display: "flex", position: "absolute", right: 50, height: "100%", alignItems:"center" }}>
            <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <Avatar alt="icon" src={require('../asset/icon_user.png')} style={{ marginRight: 10 }} />
              <p style={{marginRight:10, color:"black"}}>{props.fullname}</p>
              <KeyboardArrowDownIcon style={{ fontSize: 30, color: "#BDBDBD", }} />
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{width:150, alignSelf:'flex-end'}} >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
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

const mapStateToProps = ({fullname}) => {
  return{
    fullname
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ButtonAppBar))