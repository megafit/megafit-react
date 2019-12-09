import React, { Component } from 'react'
// import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
// import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import SearchIcon from '@material-ui/icons/Search';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import WhereToVoteOutlinedIcon from '@material-ui/icons/WhereToVoteOutlined';

import CardCheck from '../components/CardCheck';

export default class Kelas extends Component {
  state = {
    dayRemaining: 7,
    ptRemaining: 1,
    colorMembershipNotif: '',
    colorIconMembershipNotif: '',
    colorPtNotif: '',
    colorIconPtNotif: '',
    keyStatus: 0,
    countMegarangers: 23
  }

  componentDidMount() {
    if (this.state.dayRemaining >= 5) {
      this.setState({
        colorMembershipNotif: '#8eb52f',
        colorIconMembershipNotif: '#5f810c'
      })
    } else if (this.state.dayRemaining >= 3) {
      this.setState({
        colorMembershipNotif: '#ffaa00',
        colorIconMembershipNotif: '#a66f00'
      })
    } else if (this.state.dayRemaining >= 1) {
      this.setState({
        colorMembershipNotif: '#bf0000',
        colorIconMembershipNotif: '#650000'
      })
    }

    if (this.state.ptRemaining === 3) {
      this.setState({
        colorPtNotif: '#8eb52f',
        colorIconPtNotif: '#5f810c'
      })
    } else if (this.state.ptRemaining === 2) {
      this.setState({
        colorPtNotif: '#ffaa00',
        colorIconPtNotif: '#a66f00'
      })
    } else if (this.state.ptRemaining === 1) {
      this.setState({
        colorPtNotif: '#bf0000',
        colorIconPtNotif: '#650000'
      })
    }
  }
  // xs, sm, md, lg, and xl.

  render() {
    return (
      <Grid style={{ display: 'flex' }}>
        <Grid style={{ backgroundColor: '#F0F0F0', minWidth: 250, height: '100vh' }} xs={2}>

          <Paper component="form" style={{
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '80%',
            margin: '50px auto',
            borderRadius: 30,
            backgroundColor: '#e8f0d5'
          }}>
            <InputBase
              style={{
                marginLeft: 10,
                flex: 1, color: '#77942f'
              }}
              placeholder="ID member"
              inputProps={{ 'aria-label': 'id member' }}
            />
            <IconButton type="submit" style={{ padding: 10, color: '#77942f' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

          <Avatar alt="icon" src={require('../asset/icon_user.png')} style={{ height: 200, width: 200, margin: '0px auto', }} />

          <Grid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
            <Grid style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 5 }}>
              <CheckCircleOutlinedIcon style={{ color: '#8EB52F' }} />
              <p style={{ margin: 0 }}>active member</p>
            </Grid>
            <p style={{ margin: 0, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Pao Pao</p>

            <Button variant="contained" style={{ backgroundColor: 'white', borderRadius: 10, color: '#5f810c', fontWeight: 'bold', margin: 15, width: 135 }}>
              <WhereToVoteOutlinedIcon style={{ color: '#5f810c', marginRight: 5 }} />
              CHECK IN
            </Button>

            <Button variant="contained" style={{ backgroundColor: 'white', borderRadius: 10, color: '#5f810c', fontWeight: 'bold', paddingTop: 2, paddingBottom: 2, width: 135 }}>
              <img src={require('../asset/whatsapp.png')} style={{ alignSelf: 'center', marginRight: 5 }} height={30} width={30} alt="logo-megafit" />
              HUBUNGI
            </Button>
          </Grid>

          {/* MEMBERSHIPS */}
          <Grid style={{ display: 'flex', marginBottom: 40, backgroundColor: this.state.colorMembershipNotif, color: 'white', maxHeight: 75, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, marginLeft: 30 }}>
            <Grid style={{ backgroundColor: this.state.colorIconMembershipNotif, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 100, width: 75, height: 75, maxHeight: 100, position: 'absolute' }}>
              <img src={require('../asset/memberships.png')} style={{ alignSelf: 'center' }} height={35} width={45} alt="memberships" />
            </Grid>
            <Grid style={{ display: 'flex', paddingTop: 10, paddingBottom: 10, flexDirection: 'column', marginLeft: 90, marginRight: 5, minHeight: 75 }}>
              <p style={{ margin: 0 }}>Membership jatuh tempo dalam {this.state.dayRemaining} hari</p>
              {/* <p style={{ margin: 0, fontSize: 10, textDecoration: 'underline' }}>ingatkan</p> */}
            </Grid>
          </Grid>

          {/* PT */}
          <Grid style={{ display: 'flex', marginBottom: 40, backgroundColor: this.state.colorPtNotif, color: 'white', maxHeight: 100, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, marginLeft: 30 }}>
            <Grid style={{ backgroundColor: this.state.colorIconPtNotif, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 100, width: 75, height: 75, maxHeight: 100, position: 'absolute' }}>
              <img src={require('../asset/pt.png')} style={{ alignSelf: 'center' }} height={35} width={45} alt="memberships" />
            </Grid>
            <Grid style={{ display: 'flex', paddingTop: 10, paddingBottom: 10, flexDirection: 'column', marginLeft: 90, marginRight: 5, minHeight: 75, height: '100%', justifyContent: 'center' }}>
              <p style={{ margin: 0 }}>Sisa {this.state.ptRemaining} PT Sesi</p>
              {/* <p style={{ margin: 0, fontSize: 10, textDecoration: 'underline' }}>tambah paket</p> */}
            </Grid>
          </Grid>

          {/* PT */}
          <Grid style={{ display: 'flex', marginBottom: 40, backgroundColor: this.state.colorPtNotif, color: 'white', maxHeight: 100, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, marginLeft: 30 }}>
            <Grid style={{ backgroundColor: this.state.colorIconPtNotif, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 100, width: 75, height: 75, maxHeight: 100, position: 'absolute' }}>
              <img src={require('../asset/lockerkey.png')} style={{ alignSelf: 'center' }} height={35} width={35} alt="memberships" />
            </Grid>
            <Grid style={{ display: 'flex', paddingTop: 10, paddingBottom: 10, flexDirection: 'column', marginLeft: 90, marginRight: 5, minHeight: 75, height: '100%', justifyContent: 'center' }}>
              <p style={{ margin: 0 }}>Kembalikan kunci</p>
              <Button variant="contained" style={{ backgroundColor: 'white', fontSize: 10, color: 'red', marginTop: 3 }}>
                kunci aman
              </Button>
            </Grid>
          </Grid>


        </Grid>

        <Grid xs={10} style={{ padding: 50 }}>
          <Card>
            <CardContent style={{ padding: '30px 60px' }}>
              <Grid container spacing={3} style={{ flexGrow: 1, backgroundColor: 'white', }}>
                <Grid item xs={12} md={5}>
                  <p style={{ fontSize: 40, margin: 0, marginBottom: 10 }}>Daftar Hadir</p>
                  <Paper component="form" style={{
                    padding: '0px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '80%',
                    borderRadius: 30,
                    backgroundColor: '#e8f0d5'
                  }}>
                    <InputBase
                      style={{
                        marginLeft: 10,
                        flex: 1, color: '#77942f'
                      }}
                      placeholder="cari yang sedang di club"
                      inputProps={{ 'aria-label': 'cari yang sedang di club' }}
                    />
                    <IconButton type="submit" style={{ padding: 5, color: '#77942f' }} aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={7} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <img src={require('../asset/left.png')} style={{ alignSelf: 'center', marginRight: 20 }} height={100} width={50} alt="logo-megafit" />
                  <img src={require('../asset/middle.png')} style={{ alignSelf: 'center', marginRight: 20 }} height={100} width={75} alt="logo-megafit" />
                  <img src={require('../asset/right.png')} style={{ alignSelf: 'center', marginRight: 20 }} height={100} width={75} alt="logo-megafit" />
                  <Grid style={{ color: '#8eb52f', fontWeight: 'bold' }}>
                    {/* <Typography style={{ margin: 0, padding: 0 }}>{this.state.countMegarangers}</Typography> */}
                    <Typography style={{ margin: 0, marginTop: -20, fontSize: 90, width: 105, height: 105, padding: 0, fontWeight: 'bold' }}>{this.state.countMegarangers}</Typography>
                    <div>
                      <p style={{ margin: 0, marginLeft: 7, fontSize: 15 }}>megaranger</p>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>

            <Table>
              <TableHead style={{ backgroundColor: '#f8f8f8' }}>
                <TableRow>
                  <TableCell style={{ marginLeft: 50 }}>Nama</TableCell>
                  <TableCell align="center">Jam masuk</TableCell>
                  <TableCell align="center">Tipe</TableCell>
                  <TableCell align="center"> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <CardCheck />
              </TableBody>
            </Table>

          </Card>
        </Grid>
      </Grid>
    )
  }
}
