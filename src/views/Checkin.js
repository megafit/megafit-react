import React, { Component } from 'react'
import Cookies from 'js-cookie';

import {
  Grid, Button, Typography, Paper, InputBase, IconButton, Avatar, Card, CardContent, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Chip
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import WhereToVoteOutlinedIcon from '@material-ui/icons/WhereToVoteOutlined';

import ModalCheck from '../components/modal/ModalCheckin';
import CardCheckIn from '../components/CardCheck';

import swal from 'sweetalert';

import { API } from '../config/API';

export default class Kelas extends Component {
  state = {
    data: [],
    dataCheckin: [],
    dataUser: null,
    hasCheckin: false,
    colorMembershipNotif: '',
    colorIconMembershipNotif: '',
    colorPtNotif: '',
    colorIconPtNotif: '',
    lockerKey: '',
    searchUserId: '',
    searchingUser: '',
    proses: false,
    open: false,
    titleModal: "Checkin",
    dataCheckSelected: null,

    page: 0,
    rowsPerPage: 5,
  }

  async componentDidMount() {
    await this.fetchDataCheckin()
  }

  componentWillUnmount() {
    this.setState({ dataUser: {} })
  }

  searchMember = async event => {
    event.preventDefault()
    let newUserCheckin = await this.state.data.filter(el => el.member.nickname.toLowerCase().match(new RegExp(this.state.searchingUser.toLowerCase())))
    this.setState({ dataCheckin: newUserCheckin })
    if (this.state.searchingUser === "") {
      this.setState({ dataCheckin: this.state.data })
    }
  }

  fetchDataCheckin = async () => {
    try {
      let token = Cookies.get('MEGAFIT_TKN')
      let { data } = await API.get('/checkin-checkout?checkin=true', { headers: { token } })

      this.setState({ dataCheckin: data.data, data: data.data, dataUser: null, searchUserId: '' })
    } catch (Error) {
      swal("Please try again")
    }
  }

  fetchDataUser = async event => {
    if (event) event.preventDefault()

    if (this.state.searchUserId) {
      try {
        this.setState({ proses: true, dataUser: null, hasCheckin: false })
        let token = Cookies.get('MEGAFIT_TKN')
        let { data } = await API.get(`/users/${this.state.searchUserId}?idMember=${this.state.searchUserId}`, { headers: { token } })
        data.data.lockerKey = data.lockerKey || null
        data.data.checkId = data.checkId || null

        if (data.data.tblMember) {
          data.data.tblMember.sisaHari = this.cekMembershipExpired(data.data.tblMember)
          this.setNotifColor(data.data.tblMember)

          this.setState({ proses: false, dataUser: data.data })

          if (data.lockerKey === null) {
            if (data.data.tblMember.sisaHari >= 0) this.setState({ open: true, titleModal: "Checkin" })
          }

          let hasCheckin = await this.state.data.find(el => el.userId === this.state.dataUser.userId)

          if (hasCheckin) {
            if (data.data.tblMember.sisaHari >= 0) this.setState({ open: true, titleModal: "Checkout", hasCheckin: true })
          }
        }
        this.setState({ proses: false })
      } catch (Error) {
        if (Error.message === "Request failed with status code 400") {
          swal("Id member/user id tidak ditemukan", "", "error")

          this.setState({ proses: false })
        } else {
          swal("please try again")
          this.setState({ proses: false })
        }
      }
    } else {
      this.setState({ dataUser: null })
    }
  }

  cekMembershipExpired = args => {
    let sisaHari = new Date(args.activeExpired) - new Date()
    sisaHari = Math.round(Math.round((new Date(args.activeExpired).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)));

    return sisaHari
  }

  setNotifColor = args => {
    if (args.sisaHari >= 5) {
      this.setState({
        colorMembershipNotif: '#8eb52f',
        colorIconMembershipNotif: '#5f810c'
      })
    } else if (args.sisaHari >= 3) {
      this.setState({
        colorMembershipNotif: '#ffaa00',
        colorIconMembershipNotif: '#a66f00'
      })
    } else if (args.sisaHari >= 1) {
      this.setState({
        colorMembershipNotif: '#bf0000',
        colorIconMembershipNotif: '#650000'
      })
    }

    if (args.ptSession === 3) {
      this.setState({
        colorPtNotif: '#8eb52f',
        colorIconPtNotif: '#5f810c'
      })
    } else if (args.ptSession === 2) {
      this.setState({
        colorPtNotif: '#ffaa00',
        colorIconPtNotif: '#a66f00'
      })
    } else if (args.ptSession === 1) {
      this.setState({
        colorPtNotif: '#bf0000',
        colorIconPtNotif: '#650000'
      })
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleOpen = args => {
    this.setState({ open: true, titleModal: args });
  };

  handleClose = () => {
    this.setState({ open: false, titleModal: "" });
  };

  checkoutInCard = args => {
    this.setState({ open: true, titleModal: "Checkout", dataCheckSelected: args });
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    })
  }

  handleChangeRowsPerPage = event => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0
    })
  }

  kembalikanKunci = () => {
    this.setState({ open: true, titleModal: "Kembalikan Kunci Loker" })
  }

  detailMember = async args => {
    try {
      this.setState({ proses: true, dataUser: null, hasCheckin: false })
      let token = Cookies.get('MEGAFIT_TKN')
      let { data } = await API.get(`/users/${args.userId}`, { headers: { token } })
      data.data.lockerKey = data.lockerKey || null
      data.data.checkId = data.checkId || null

      if (data.data.tblMember) {
        data.data.tblMember.sisaHari = this.cekMembershipExpired(data.data.tblMember)
        this.setNotifColor(data.data.tblMember)

        this.setState({ proses: false, dataUser: data.data })

        let hasCheckin = await this.state.data.find(el => el.userId === this.state.dataUser.userId)

        if (hasCheckin) {
          if (data.data.tblMember.sisaHari >= 0) this.setState({ hasCheckin: true })
        }
      }
      this.setState({ proses: false })
    } catch (Error) {
      swal("Please try again")
      this.setState({ proses: false })
    }
  }

  render() {
    return (
      <Grid style={{ display: 'flex' }}>
        <Grid item style={{ backgroundColor: '#F0F0F0', minWidth: 250, height: '100vh' }} xs={2}>

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
              onChange={this.handleChange('searchUserId')}
              value={this.state.searchUserId}
            />
            <IconButton onClick={this.fetchDataUser} type="submit" style={{ padding: 10, color: '#77942f' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          {
            this.state.proses
              ? <Grid style={{ width: '100%', height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress style={{ color: '#77942f' }} />
              </Grid>
              : this.state.dataUser != null && <>
                <Avatar alt="icon" src={require('../asset/icon_user.png')} style={{ height: 200, width: 200, margin: '0px auto', }} />

                <Grid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                  {
                    this.state.dataUser.flagActive
                      ? <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 5 }}>
                        <CheckCircleOutlinedIcon style={{ color: '#8EB52F' }} />
                        <p style={{ margin: 0, marginLeft: 5 }}>active member</p>
                      </Grid>
                      : this.state.dataUser.tblMember.sisaHari <= -7
                        ? <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 5 }}>
                          <CancelOutlinedIcon style={{ color: '#bf0000' }} />
                          <p style={{ margin: 0, marginLeft: 5 }}>nonactive member</p>
                        </Grid>
                        : <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 5 }}>
                          <Chip
                            label="masa tenggang"
                            color="secondary"
                          />
                        </Grid>
                  }
                  <p style={{ margin: 0, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>{this.state.dataUser.nickname}</p>

                  {
                    this.state.hasCheckin
                      ? this.state.dataUser.flagActive && <p style={{ color: '#8EB52F' }}>Sedang ada di club </p>
                      : this.state.dataUser.flagActive &&
                      <Button variant="contained" style={{ backgroundColor: 'white', borderRadius: 10, color: '#5f810c', fontWeight: 'bold', margin: 15, width: 135 }} onClick={() => this.handleOpen("Checkin")}>
                        <WhereToVoteOutlinedIcon style={{ color: '#5f810c', marginRight: 5 }} />
                        CHECK IN
                    </Button>
                  }

                  {/* HUBUNGI VIA WHATSAPP */}
                  {/* <Button variant="contained" style={{ backgroundColor: 'white', borderRadius: 10, color: '#5f810c', fontWeight: 'bold', paddingTop: 2, paddingBottom: 2, width: 135 }}>
                    <img src={require('../asset/whatsapp.png')} style={{ alignSelf: 'center', marginRight: 5 }} height={30} width={30} alt="logo-megafit" />
                    HUBUNGI
                </Button> */}
                </Grid>


                {/* new Date(this.state.dataUser.tblMember.activeExpired) < new Date() */}
                {/* MEMBERSHIPS */}
                {
                  this.state.dataUser.tblMember && this.state.dataUser.tblMember.sisaHari <= 7 && this.state.dataUser.tblMember.sisaHari > 0 &&
                  <Grid style={{ display: 'flex', marginBottom: 40, backgroundColor: this.state.colorMembershipNotif, color: 'white', maxHeight: 75, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, marginLeft: 30 }}>
                    <Grid style={{ backgroundColor: this.state.colorIconMembershipNotif, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 100, width: 75, height: 75, maxHeight: 100, position: 'absolute' }}>
                      <img src={require('../asset/memberships.png')} style={{ alignSelf: 'center' }} height={35} width={45} alt="memberships" />
                    </Grid>
                    <Grid style={{ display: 'flex', paddingTop: 10, paddingBottom: 10, flexDirection: 'column', marginLeft: 90, marginRight: 5, minHeight: 75 }}>
                      <p style={{ margin: 0 }}>Membership jatuh tempo dalam {this.state.dataUser.tblMember.sisaHari} hari</p>
                      {/* <p style={{ margin: 0, fontSize: 10, textDecoration: 'underline' }}>ingatkan</p> */}
                    </Grid>
                  </Grid>
                }

                {/* PT */}
                {
                  this.state.dataUser.tblMember && this.state.dataUser.tblMember.ptSession <= 3 && this.state.dataUser.tblMember.ptSession > 0 &&
                  <Grid style={{ display: 'flex', marginBottom: 40, backgroundColor: this.state.colorPtNotif, color: 'white', maxHeight: 100, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, marginLeft: 30 }}>
                    <Grid style={{ backgroundColor: this.state.colorIconPtNotif, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 100, width: 75, height: 75, maxHeight: 100, position: 'absolute' }}>
                      <img src={require('../asset/pt.png')} style={{ alignSelf: 'center' }} height={35} width={45} alt="memberships" />
                    </Grid>
                    <Grid style={{ display: 'flex', paddingTop: 10, paddingBottom: 10, flexDirection: 'column', marginLeft: 90, marginRight: 5, minHeight: 75, height: '100%', justifyContent: 'center' }}>
                      <p style={{ margin: 0 }}>Sisa {this.state.dataUser.tblMember.ptSession} PT Sesi</p>
                      {/* <p style={{ margin: 0, fontSize: 10, textDecoration: 'underline' }}>tambah paket</p> */}
                    </Grid>
                  </Grid>
                }

                {/* LOCKERKEY */}
                {
                  this.state.dataUser.lockerKey !== null && !this.state.hasCheckin && <Grid style={{ display: 'flex', marginBottom: 40, backgroundColor: '#bf0000', color: 'white', maxHeight: 100, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, marginLeft: 30 }}>
                    <Grid style={{ backgroundColor: '#650000', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 100, width: 75, height: 75, maxHeight: 100, position: 'absolute' }}>
                      <img src={require('../asset/lockerkey.png')} style={{ alignSelf: 'center' }} height={35} width={35} alt="memberships" />
                    </Grid>
                    <Grid style={{ display: 'flex', paddingTop: 10, paddingBottom: 10, flexDirection: 'column', marginLeft: 90, marginRight: 5, minHeight: 75, height: '100%', justifyContent: 'center' }}>
                      <p style={{ margin: 0 }}>Kembalikan kunci</p>
                      <Button variant="contained" style={{ backgroundColor: 'white', fontSize: 9, color: 'red', marginTop: 0 }} onClick={this.kembalikanKunci}>
                        kunci loker ({this.state.dataUser.lockerKey})
                      </Button>
                    </Grid>
                  </Grid>
                }

              </>
          }

        </Grid>

        <Grid item xs={10} style={{ padding: 50 }}>
          <Card style={{ paddingBottom: 30 }}>
            <CardContent style={{ padding: '30px 60px' }}>
              <Grid container spacing={3} style={{ flexGrow: 1, backgroundColor: 'white', }}>
                <Grid item xs={12} md={5}>
                  {/* <form onSubmit={this.searchMember}> */}
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
                      inputProps={{ 'aria-label': 'id member' }}
                      onChange={this.handleChange('searchingUser')}
                      value={this.state.searchingUser}
                    />
                    <IconButton type="submit" style={{ padding: 5, color: '#77942f' }} aria-label="search" onClick={this.searchMember}>
                      {/* <IconButton type="submit" style={{ padding: 5, color: '#77942f' }} aria-label="search" > */}
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                  {/* </form> */}
                </Grid>
                <Grid item xs={12} md={7} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <img src={require('../asset/left.png')} style={{ alignSelf: 'center', marginRight: 20 }} height={100} width={50} alt="logo-megafit" />
                  <img src={require('../asset/middle.png')} style={{ alignSelf: 'center', marginRight: 20 }} height={100} width={75} alt="logo-megafit" />
                  <img src={require('../asset/right.png')} style={{ alignSelf: 'center', marginRight: 20 }} height={100} width={75} alt="logo-megafit" />
                  <Grid style={{ color: '#8eb52f', fontWeight: 'bold' }}>
                    <Typography style={{ margin: 0, marginTop: -20, fontSize: 90, width: 105, height: 105, padding: 0, fontWeight: 'bold', textAlign: 'center' }}>{this.state.dataCheckin.length}</Typography>
                    <div>
                      <p style={{ margin: 0, marginLeft: 7, fontSize: 15 }}>megaranger</p>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>

            {
              this.state.dataCheckin.length > 0 && <><Table>
                <TableHead style={{ backgroundColor: '#f8f8f8' }}>
                  <TableRow>
                    <TableCell style={{ marginLeft: 50 }}>Nama</TableCell>
                    <TableCell align="center">Jam masuk</TableCell>
                    <TableCell align="center">Kunci loker</TableCell>
                    <TableCell align="center"> </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    this.state.dataCheckin.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((el, index) => (
                      <CardCheckIn data={el} key={index} checkoutMember={this.checkoutInCard} detailMember={this.detailMember} />
                    ))
                  }
                </TableBody>
              </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  component="div"
                  count={this.state.dataCheckin.length}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  backIconButtonProps={{
                    'aria-label': 'previous page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'next page',
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </>
            }

          </Card>
        </Grid>

        <ModalCheck open={this.state.open} titleModal={this.state.titleModal} dataUser={this.state.dataUser} fetchDataCheckin={this.fetchDataCheckin} handleClose={this.handleClose} data={this.state.data} dataCheckSelected={this.state.dataCheckSelected} fetchDataUser={this.fetchDataUser} />

      </Grid>
    )
  }
}
