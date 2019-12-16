import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// import Home from './views/Home';
import Profil from './views/Profil';
import Kelas from './views/Kelas';
import Checkin from './views/Checkin';
import Anggota from './views/Anggota';
import Login from './views/Login';


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
    <main style={{ flexGrow: 1, marginLeft: !localStorage.getItem("token") ? 0 : props.roleId === 4 ? 200 : 100 }}>
      <div className={classes.toolbar} />
      <Switch>
        <AuthenticatedRoute path="/kelas" component={Kelas} />
        <AuthenticatedRoute path="/checkin" component={Checkin} />
        <AuthenticatedRoute path="/home" component={Profil} />
        <AuthenticatedRoute path="/anggota" component={Anggota} />
        <Route exact path="/" component={Login} />
      </Switch>
    </main>
  );
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
          <Redirect to={{
            pathname: "/",
            state: { from: props.location }
          }} />
        )
    }
  />
)


const mapStateToProps = ({ roleId }) => {
  return {
    roleId
  }
}

export default connect(mapStateToProps)(Routes);
