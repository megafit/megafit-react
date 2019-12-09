import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// import Home from './views/Home';
import Profil from './views/Profil';
import Kelas from './views/Kelas';
import Checkin from './views/Checkin';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

function Routes(props) {
  const classes = useStyles();

  return (
    <main style={{ flexGrow: 1, marginLeft: props.roleId === 4 ? 200 : 100 }}>
      <div className={classes.toolbar} />
      <Switch>
        <Route path="/kelas" component={Kelas} />
        <Route path="/checkin" component={Checkin} />
        <Route path="/" component={Profil} />
        {/* <Redirect path="/" component={profil} /> */}
      </Switch>
    </main>
  );
}

const mapStateToProps = ({ roleId }) => {
  return {
    roleId
  }
}

export default connect(mapStateToProps)(Routes);
