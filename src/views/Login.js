import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';

import { API } from '../config/API';
import { setUser } from '../store/action';

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
      if (this.props.roleId === 4) {
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
          positionId: data.data.positionId,
          hasConfirmTermAndCondition: data.data.hasConfirmTermAndCondition
        }

        this.props.setUser(dataUser)
        this.setState({
          proses: false,
          editableInput: true,
          username: '',
          password: ''
        })

        if (data.data.roleId === 4) {
          this.props.history.push('/home')
        } else {
          this.props.history.push('/checkin')
        }
      }
    } catch (err) {
      alert('Login failed')
      this.setState({
        proses: false,
        editableInput: true
      })
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '5% 0 0 auto' }}>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <img src={require('../asset/pola-megafit_black.png')} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 25 }} height={80} width={500} alt="logo-megafit" />

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
              style={{ marginBottom: 15, width: 350 }}
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <div style={{ position: 'relative', }}>
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
              </div>
            </div>
          </form>

          <Typography style={{ fontSize: 12 }}>2019 - Version 1.0.0</Typography>
        </div>
      </div>
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