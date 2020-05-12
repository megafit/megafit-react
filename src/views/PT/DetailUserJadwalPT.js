import React, { Component } from 'react';

import { Grid, Avatar, Chip, Divider } from '@material-ui/core';

import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export default class DetailUserPT extends Component {
  state = {
    flagActive: true,
    sisaHari: -5,
    openSejarahPT: true
  }

  componentDidMount() {
    console.log(this.props.location.state.userId)
  }
  
  handleSejarahPT = () => {
    this.setState({
      openSejarahPT: !this.state.openSejarahPT
    })
  }

  render() {
    function formatDate(args) {
      let newDate = new Date(args)
      let date = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()
      let month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1

      return `${date}/${month}/${newDate.getFullYear()}`
    }

    return (
      <Grid container style={{ display: 'flex' }}>
        <Grid item style={{ backgroundColor: '#F0F0F0', minWidth: 250, height: '100vh', paddingTop: 50 }} xs={2}>

          <Avatar alt="icon" src={require('../../asset/icon_user.png')} style={{ height: 150, width: 150, margin: '0px auto', }} />

          {
            this.state.flagActive
              ? <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
                <CheckCircleOutlinedIcon style={{ color: '#8EB52F' }} />
                <p style={{ margin: 0, marginLeft: 5 }}>active member</p>
              </Grid>
              : this.state.sisaHari <= -7
                ? <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
                  <CancelOutlinedIcon style={{ color: '#bf0000' }} />
                  <p style={{ margin: 0, marginLeft: 5 }}>nonactive member</p>
                </Grid>
                : <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
                  <Chip
                    label="masa tenggang"
                    color="secondary"
                  />
                </Grid>
          }

          <p style={{ margin: 0, fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Paopao</p>
          <Grid style={{ display: 'flex', justifyContent: 'center' }}>
            <p style={{ margin: 0, }}>aktif s/d</p>
            <p style={{ margin: '0px 0px 0px 5px', fontWeight: 'bold' }}>{formatDate(new Date())}</p>
          </Grid>

          <Grid style={{ padding: '15px 20px', minHeight: 100 }}>
            <p style={{ margin: 0 }}>Form Field Caption</p>
          </Grid>

          <Grid style={{ padding: 10, margin: '10px 20px', border: '1px solid black', }}>
            Catatan
          </Grid>

          <Divider style={{ marginTop: 15 }} />
          <Grid style={{ padding: '10px 20px', minHeight: 100 }}>
            <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ margin: 0 }}>Sejarah PT</p>
              <ArrowDropDownIcon onClick={this.handleSejarahPT} />
            </Grid>
            {
              this.state.openSejarahPT && <Grid style={{ overflow: 'scroll', maxHeight: 100 }}>
                <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
                  <Grid item sm={5}>
                    <p style={{ margin: 0 }}>08/03/2020</p>
                    <p style={{ margin: 0 }}>PT JOE</p>
                  </Grid>
                  <Grid item sm={7}>
                    <p style={{ margin: 0 }}>Catatan</p>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
                  <Grid item sm={5}>
                    <p style={{ margin: 0 }}>08/03/2020</p>
                    <p style={{ margin: 0 }}>PT JOE</p>
                  </Grid>
                  <Grid item sm={7}>
                    <p style={{ margin: 0 }}>Catatan</p>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
                  <Grid item sm={5}>
                    <p style={{ margin: 0 }}>08/03/2020</p>
                    <p style={{ margin: 0 }}>PT JOE</p>
                  </Grid>
                  <Grid item sm={7}>
                    <p style={{ margin: 0 }}>Catatan</p>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
                  <Grid item sm={5}>
                    <p style={{ margin: 0 }}>08/03/2020</p>
                    <p style={{ margin: 0 }}>PT JOE</p>
                  </Grid>
                  <Grid item sm={7}>
                    <p style={{ margin: 0 }}>Catatan</p>
                  </Grid>
                </Grid>
              </Grid>
            }
          </Grid>
        </Grid>

        <Grid item style={{ padding: 30 }}>
          <p style={{ margin: '0px 0px 20px 0px', fontSize: 18, cursor: 'pointer' }} onClick={() => this.props.history.push('/pt')}>{`< Jadwal`}</p>
          <Grid style={{ width: 600, border: '1px solid black', padding: '10px 20px' }}>
            <Grid style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
              <Avatar alt="icon" src={require('../../asset/icon_user.png')} style={{ height: 50, width: 50, marginRight: 15 }} />
              <p style={{ margin: 0 }}>Paopao</p>
            </Grid>

            <Grid style={{ border: '1px solid black', padding: 10, marginBottom: 10 }}>
              <p style={{ margin: 0 }}>LINK ZOOM</p>
            </Grid>

            <p style={{ margin: '0px 0px 5px 0px' }}>Catatan</p>
            <Grid style={{ border: '1px solid black', padding: 10, minHeight: 200, marginBottom: 20 }}>
              {/* <p style={{ margin: 0 }}>LINK ZOOM</p> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
