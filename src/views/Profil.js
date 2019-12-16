import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import { API } from '../config/API';
import { Button } from '@material-ui/core';

class Profil extends Component {
  state = {
    data: {},
    ubahData: false,
    noWhatsapp: "",
    email: ""
  }

  async componentDidMount() {
    try {
      if (this.props.userId) {
        let token = localStorage.getItem("token")
        let { data } = await API.get(`/users/${this.props.userId}`, { headers: { token } })
        console.log(data.data)
        this.setState({
          data: data.data,
          noWhatsapp: data.data.phone,
          email: data.data.email
        })
      }
    } catch (Error) {
      console.log(Error)
    }
  }

  ubahData = async () => {
    if (this.state.ubahData === false) {
      this.setState({ ubahData: true })
    } else {
      this.setState({ ubahData: false })
      try {
        let token = localStorage.getItem("token")
        let newData = {
          phone: this.state.noWhatsapp,
          email: this.state.email
        }

        let { data } = await API.put(`/users/${this.props.userId}`,newData, { headers: { token } })

        this.setState({
          data: data.data
        })
      } catch (Error) {
        console.log(Error)
      }
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

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
          <img src={require('../asset/29.png')} style={{ alignSelf: 'center' }} height={200} width={200} alt="logo-megafit" />
          <Grid style={{ display: 'flex' }}>
            <p style={{ margin: 0 }}>berlaku sampai</p>
            {
              this.state.data.tblMember && <p style={{ fontWeight: 'bold', margin: 0 }}>&nbsp;{getDate(this.state.data.tblMember.activeExpired)}</p>
            }
          </Grid>
          <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <p style={{ fontWeight: 'bold', fontSize: 20, margin: 0 }}>Informasi Umum</p>
            <Button onClick={this.ubahData}>{ this.state.ubahData ? 'Simpan' : 'Ubah'}</Button>
          </Grid>
          <Divider />
          <p style={{ margin: 0, marginTop: 15 }}>{this.state.data.fullname}</p>
          <p style={{ margin: 0, marginTop: 10 }}>{this.state.data.gender}</p>
          {/* <Grid style={{ display: 'flex' }}>
            <p style={{ margin: 0, marginTop: 10, fontWeight: 'bold' }}>No KTP:</p>
            <p style={{ margin: 0, marginTop: 10 }}>&nbsp;{this.state.data.noKtp}</p>
          </Grid>
          <Grid style={{ display: 'flex' }}>
            <p style={{ margin: 0, marginTop: 10, fontWeight: 'bold' }}>Tgl. Lahir:</p>
            <p style={{ margin: 0, marginTop: 10 }}>&nbsp;{getDate(this.state.data.dateOfBirth)}</p>
          </Grid> */}
          {
            this.state.ubahData
              ? <>
                <Grid style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ margin: 0, marginTop: 10, fontWeight: 'bold' }}>No. WA:</p>
                  <TextField
                    id="noWhatsapp"
                    value={this.state.noWhatsapp}
                    onChange={this.handleChange('noWhatsapp')}
                    style={{ margin: 0, marginLeft: 10, }}
                    disabled={this.state.proses}
                  />
                </Grid>
                <Grid style={{ display: 'flex' }}>
                  <p style={{ margin: 0, marginTop: 10, fontWeight: 'bold' }}>Email:</p>
                  <TextField
                    id="email"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    style={{ margin: 0, marginLeft: 10 }}
                    disabled={this.state.proses}
                  />
                </Grid>
              </>
              : <>
                <Grid style={{ display: 'flex' }}>
                  <p style={{ margin: 0, marginTop: 10, fontWeight: 'bold' }}>No. WA:</p>
                  <p style={{ margin: 0, marginTop: 10 }}>&nbsp;{this.state.data.phone}</p>
                </Grid>
                <Grid style={{ display: 'flex' }}>
                  <p style={{ margin: 0, marginTop: 10, fontWeight: 'bold' }}>Email:</p>
                  <p style={{ margin: 0, marginTop: 10 }}>&nbsp;{this.state.data.email}</p>
                </Grid>
              </>
          }

        </Grid>
        <Grid item lg={6} md={5} sm={12} xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={require('../asset/Group_306_@1x.png')} height='80%' width='80%' alt="logo-megafit" />
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({ userId }) => {
  return {
    userId
  }
}

export default connect(mapStateToProps)(Profil)