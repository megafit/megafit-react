import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

import { API, BaseURL } from '../config/API';
import { Button } from '@material-ui/core';

class Profil extends Component {
  state = {
    data: {},
    ubahData: false,
    noWhatsapp: "",
    qr: "",
    email: "",
    username: "",
    isEdit: false,
    passwordLama: "",
    passwordBaru: "",
    passwordKonfirm: "",
    checkStatuspasswordKonfirm: true,
    sisaHari: 0
  }

  async componentDidMount() {
    if (this.props.roleId !== 4) {
      this.props.history.goBack()
    }

    this.fetchData()
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchData()
    }
  }

  fetchData = async () => {
    try {
      if (this.props.userId) {
        console.log("MASUK")
        let token = Cookies.get('MEGAFIT_TKN')
        let { data } = await API.get(`/users/${this.props.userId}`, { headers: { token } })
        this.setState({
          data: data.data,
          noWhatsapp: data.data.phone,
          email: data.data.email,
          username: data.data.username,
          qr: data.data.tblMember.cardImage,
          sisaHari: this.cekMembershipExpired(data.data.tblMember)
        })
        console.log(data)
      }
    } catch (Error) {
      alert("Server error")
      console.log(Error)
    }
  }


  ubahData = async () => {
    if (this.state.ubahData === false) {
      this.setState({ ubahData: true })
    } else {
      this.setState({ ubahData: false })
      try {
        let token = Cookies.get('MEGAFIT_TKN')
        let newData = {
          phone: this.state.noWhatsapp,
          email: this.state.email,
          username: this.state.username
        }

        let { data } = await API.put(`/users/${this.props.userId}`, newData, { headers: { token } })

        this.setState({
          data: data.data
        })
      } catch (Error) {
        alert("Server error")
        console.log(Error)
      }
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  changePass = () => {
    this.setState({ isEdit: !this.state.isEdit })
  }

  checkPasswordBaru = () => event => {
    if (event.target.value === this.state.passwordBaru) {
      this.setState({
        passwordKonfirm: event.target.value,
        checkStatuspasswordKonfirm: true
      })
    } else {
      this.setState({
        passwordKonfirm: event.target.value,
        checkStatuspasswordKonfirm: false
      })
    }
  }

  cekMembershipExpired = args => {
    let sisaHari = new Date(args.activeExpired) - new Date()
    sisaHari = Math.round(Math.round((new Date(args.activeExpired).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)));
    // console.log("sisaHari", sisaHari)
    return sisaHari
  }

  simpanPassword = async () => {
    try {
      let newData = {
        passwordLama: this.state.passwordLama,
        passwordBaru: this.state.passwordBaru,
        passwordKonfirm: this.state.passwordKonfirm,
      }

      let token = await Cookies.get('MEGAFIT_TKN')
      let changePassword = await API.put(`/users/${this.state.data.userId}?change-password=true`, newData, { headers: { token } })

      if (changePassword) {
        this.setState({
          isEdit: false,
          passwordLama: "",
          passwordBaru: "",
          passwordKonfirm: "",
        })
        alert("Change password success")
      }
    } catch (Error) {
      if (Error !== 'Error: Request failed with status code 400') alert("Password lama salah")
      else alert("Server error")
      console.log(Error)
    }
  }

  render() {
    function getDate(date) {
      let dates = new Date(date).getDate()
      let month = new Date(date).getMonth() + 1
      let year = new Date(date).getFullYear()

      if (dates < 10) dates = `0${dates}`
      if (month < 10) month = `0${month}`

      return `${dates}/${month}/${year}`
    }

    return (
      <Grid container style={{ padding: 20 }}>
        <Grid item lg={2} />
        <Grid item lg={4} md={6} sm={12} xs={12} style={{ padding: 30, paddingTop: 0 }}>
          <p style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Member ID : {this.state.data.userId}</p>
          <img src={`${BaseURL}${this.state.qr}`} style={{ alignSelf: 'center' }} height={200} width={200} alt="logo-megafit" />
          <Grid style={{ display: 'flex' }}>
            <p style={{ margin: 0 }}>berlaku sampai</p>
            {
              this.state.data.tblMember && <p style={{ fontWeight: 'bold', margin: 0 }}>&nbsp;{getDate(this.state.data.tblMember.activeExpired)}</p>
            }
          </Grid>
          {
            this.state.sisaHari <= 0 && this.state.sisaHari >= -7
              ? <Chip
                style={{ marginTop: 10 }}
                label="masa tenggang"
                color="secondary"
              />
              : this.state.sisaHari <= -7 && <p style={{ color: 'red' }}>Non active</p>
          }

          <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <p style={{ fontWeight: 'bold', fontSize: 20, margin: 0 }}>Informasi Umum</p>
            <Button onClick={this.ubahData}>{this.state.ubahData ? 'Simpan' : 'Ubah'}</Button>
          </Grid>
          <Divider />
          <p style={{ margin: 0, marginTop: 15 }}>{this.state.data.fullname}</p>
          <p style={{ margin: 0, marginTop: 10 }}>{this.state.data.gender}</p>
          {
            this.state.ubahData
              ? <>
                <Grid style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                  <p style={{ margin: 0, fontWeight: 'bold', width: 100 }}>No. WA</p>
                  : <TextField
                    id="noWhatsapp"
                    value={this.state.noWhatsapp}
                    onChange={this.handleChange('noWhatsapp')}
                    style={{ margin: 0, marginLeft: 10, }}
                    disabled={this.state.proses}
                  />
                </Grid>
                <Grid style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                  <p style={{ margin: 0, fontWeight: 'bold', width: 100 }}>Email</p>
                  : <TextField
                    id="email"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    style={{ margin: 0, marginLeft: 10 }}
                    disabled={this.state.proses}
                  />
                </Grid>
                <Grid style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                  <p style={{ margin: 0, fontWeight: 'bold', width: 100 }}>Username</p>
                  : <TextField
                    id="username"
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                    style={{ margin: 0, marginLeft: 10, }}
                    disabled={this.state.proses}
                  />
                </Grid>
                <Grid style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                  <p style={{ margin: 0, fontWeight: 'bold', width: 100 }}>Password</p>
                  <p style={{ margin: 0, marginTop: 10 }}>: <Button style={{ backgroundColor: '#8eb52f', color: '#fafafa' }} onClick={this.changePass}>{this.state.isEdit ? 'Batal' : 'Change Password'}</Button></p>
                </Grid>
              </>
              : <>
                <Grid style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ margin: 0, fontWeight: 'bold', width: 100 }}>No. WA</p>
                  <p style={{ margin: 0, marginTop: 10 }}>: {this.state.data.phone}</p>
                </Grid>
                <Grid style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ margin: 0, fontWeight: 'bold', width: 100 }}>Email</p>
                  <p style={{ margin: 0, marginTop: 10 }}>: {this.state.data.email}</p>
                </Grid>
                <Grid style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ margin: 0, fontWeight: 'bold', width: 100 }}>Username</p>
                  <p style={{ margin: 0, marginTop: 10 }}>: {this.state.data.username}</p>
                </Grid>
                <Grid style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ margin: 0, fontWeight: 'bold', width: 100 }}>Password</p>
                  <p style={{ margin: 0, marginTop: 10 }}>: <Button style={{ backgroundColor: '#8eb52f', color: '#fafafa' }} onClick={this.changePass}>{this.state.isEdit ? 'Batal' : 'Change Password'}</Button></p>
                </Grid>
              </>
          }

          {
            this.state.isEdit && <Grid style={{ display: 'flex', flexDirection: 'column', border: '1px solid black', marginTop: 10, borderRadius: 5, padding: 10 }}>
              <Grid style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ margin: 0, fontWeight: 'bold', width: 150 }}>Password lama</p>
                : <TextField
                  id="passwordLama"
                  value={this.state.passwordLama}
                  onChange={this.handleChange('passwordLama')}
                  style={{ margin: 0, marginLeft: 10, }}
                  disabled={this.state.proses}
                  type="password"
                />
              </Grid>
              <Grid style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ margin: 0, fontWeight: 'bold', width: 150 }}>Password baru</p>
                : <TextField
                  id="passwordBaru"
                  value={this.state.passwordBaru}
                  onChange={this.handleChange('passwordBaru')}
                  style={{ margin: 0, marginLeft: 10, }}
                  disabled={this.state.proses}
                  type="password"
                />
              </Grid>
              <Grid style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ margin: 0, fontWeight: 'bold', width: 150 }}>Konfirmasi password baru </p>
                : <TextField
                  id="passwordKonfirm"
                  value={this.state.passwordKonfirm}
                  onChange={this.checkPasswordBaru()}
                  style={{ margin: 0, marginLeft: 10, }}
                  disabled={this.state.proses}
                  type="password"
                  error={!this.state.checkStatuspasswordKonfirm}
                />
              </Grid>
              <Button style={{ backgroundColor: '#8eb52f', color: '#fafafa', alignSelf: 'flex-end', marginTop: 10 }} onClick={this.simpanPassword}>Simpan</Button>
            </Grid>
          }


        </Grid>
        <Grid item lg={6} md={5} sm={12} xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={require('../asset/Group_306_@1x.png')} height='80%' width='80%' alt="logo-megafit" />
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({ userId, roleId }) => {
  return {
    userId,
    roleId
  }
}

export default connect(mapStateToProps)(Profil)