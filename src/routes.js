import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Cookies from 'js-cookie';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Login from './views/Login';
import Home from './views/Home';
import Paket from './views/Paket';
import Profil from './views/Profil';
import Kelas from './views/Kelas';
import Checkin from './views/Checkin';
import Anggota from './views/Anggota';
import Gym from './views/Gym/Gym';
import AddProduct from './views/Gym/AddProduct';
import POS from './views/POS';
import PT from './views/PT/PT';
import DetailUserPT from './views/PT/DetailUserJadwalPT';

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
    <main style={{ flexGrow: 1, marginLeft: !Cookies.get('MEGAFIT_TKN') ? 0 : props.roleId === 2 ? 200 : 100 }}>
      <div className={classes.toolbar} />
      <Switch>
        <Route exact path="/" component={Login} />
        <AuthenticatedRoute path="/home/paket" component={Paket} />
        <AuthenticatedRoute path="/home" component={Home} />
        <AuthenticatedRoute path="/profil" component={Profil} />
        <AuthenticatedRoute path="/kelas" component={Kelas} />
        <AuthenticatedRoute path="/checkin" component={Checkin} />
        <AuthenticatedRoute path="/anggota" component={Anggota} />
        <AuthenticatedRoute path="/gym/add-product" component={AddProduct} />
        <AuthenticatedRoute path="/gym" component={Gym} />
        <AuthenticatedRoute path="/pos" component={POS} />
        <AuthenticatedRoute path="/pt/detail-user" component={DetailUserPT} />
        <AuthenticatedRoute path="/pt" component={PT} />
      </Switch>
    </main>
  );
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Cookies.get('MEGAFIT_TKN') ? (
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

export default connect(mapStateToProps)(withRouter(Routes));
