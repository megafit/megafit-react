import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    zIndex:1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <AppBar position="fixed">
        <Toolbar style={{ backgroundColor: "#FAFAFA" }}>
          <Grid style={{ display: "flex", position: "absolute", right: 50, height: "100%", alignItems:"center" }}>
            <Avatar aria-label="recipe" className={classes.avatar}>
              J
            </Avatar>
            <p style={{marginLeft:15, marginRight:10, color:"black"}}>Joe Taslim</p>
            <KeyboardArrowDownIcon style={{ fontSize: 30, color: "#BDBDBD", }} />
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
