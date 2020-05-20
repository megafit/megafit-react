import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import {
  TextField, InputAdornment, Typography, Button, CircularProgress, Grid
} from '@material-ui/core';

import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';

import swal from 'sweetalert';

import { setUser } from '../store/action';

import { API } from '../config/API';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      proses: false,
      editableInput: true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.roleId !== this.props.roleId) {
      if (this.props.roleId === 2) {
        this.props.history.push('/home')
      } else {
        this.props.history.push('/checkin')
      }
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  signin = async e => {
    e.preventDefault();

    this.setState({
      proses: true,
      editableInput: false
    })
    let user, data

    user = {
      username: this.state.username,
      password: this.state.password
    }
    try {
      data = await API.post('/users/signin', user)
      if (data) {
        Cookies.set('MEGAFIT_TKN', data.data.token);

        let dataUser = {
          userId: data.data.userId,
          roleId: data.data.roleId,
          fullname: data.data.fullname,
          nickname: data.data.nickname,
          hasConfirmTermAndCondition: data.data.hasConfirmTermAndCondition
        }

        this.props.setUser(dataUser)
        this.setState({
          proses: false,
          editableInput: true,
          username: '',
          password: ''
        })

        if (data.data.roleId === 2) { // FOR MEMBER
          this.props.history.push('/home')
        } else if (data.data.roleId === 6) { // FOR PT
          this.props.history.push('/pt')
        } else {
          this.props.history.push('/checkin')
        }
      }
    } catch (err) {
      swal("Login failed")
      this.setState({
        proses: false,
        editableInput: true
      })
    }
  }

  render() {
    return (
      <Grid container style={{ display: 'flex', justifyContent: 'center', margin: '3% 0 0 auto' }}>
        <Grid item xs={8} md={3} style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <img src={require('../asset/pola-megafit_black.png')} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 25 }} height={60} width="100%" alt="logo-megafit" />

          <Typography style={{ margin: 10, fontSize: 13 }}>SIGN IN TO CONTINUE.</Typography>
          <form noValidate autoComplete="off" onSubmit={this.signin} style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              id="username"
              label="Username"
              value={this.state.username}
              onChange={this.handleChange('username')}
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end"><MailIcon /></InputAdornment>,
              }}
              style={{ marginBottom: 15 }}
              disabled={this.state.proses}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              value={this.state.password}
              onChange={this.handleChange('password')}
              InputProps={{
                endAdornment: <InputAdornment position="end"><LockIcon /></InputAdornment>,
              }}
              disabled={this.state.proses}
            />
            <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Grid style={{ position: 'relative', }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ margin: '20px 0', width: 100, alignSelf: 'center' }}
                  data-testid='buttonSignin'
                  disabled={this.state.proses}>
                  Sign In </Button>
                {this.state.proses && <CircularProgress size={24} style={{
                  color: 'blue',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: -12,
                  marginLeft: -12,
                }} />}
              </Grid>
            </Grid>
          </form>

          <Typography style={{ fontSize: 12 }}>2020 - Version 1.0.0</Typography>
        </Grid>
      </Grid>
    )
  }
}

const mapDispatchToProps = {
  setUser
}

const mapStateToProps = ({ roleId }) => {
  return {
    roleId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)