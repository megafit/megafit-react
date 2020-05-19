import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';

import Grid from '@material-ui/core/Grid';

import Navsidebar from './components/Navsidebar';
import Routes from './routes';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh'
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
    <Router>
      <Grid className={classes.root}>
        <Navsidebar />
        <Routes />
      </Grid>
    </Router>
    </Provider>
  );
}

export default App;
