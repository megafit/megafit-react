import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  // Grid, Button, TextField, Select, MenuItem, Typography 
  Grid, Button, Typography
} from '@material-ui/core';

// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';

import AddIcon from '@material-ui/icons/Add';
// import DateRangeIcon from '@material-ui/icons/DateRange';
// import PersonIcon from '@material-ui/icons/Person';
// import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
// import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import InstagramIcon from '@material-ui/icons/Instagram';

import ModalKetentuanSyarat from '../components/modal/ModalKetentuanSyarat'
import ModalFormMember from '../components/modal/ModalFormMember';
import ModalSelectTimePT from '../components/modal/ModalSelectTimePT';
import ModalStartPTSession from '../components/modal/ModalStartPTSession';

import { fetchDataUserDetail, fetchDataMyJoinedClassPt } from '../store/action';

class Home extends Component {
  state = {
    account: '',
    datePayment: new Date(),
    amount: '',
    method: '-',
    listMethod: ['-', 'OVO', 'DANA', 'GOPAY', 'Link aja', 'Kredivo', 'EDC BCA', 'EDC BNI', 'Tokopedia', 'Transfer'],

    openModalKetentuanSyarat: false,
    openModalForm: false,
    openModalSelectTimePT: false,
    openModalStartPTSession: false,

    classPt: [],
    myJoinedClassPt: [],
    hasJoinedClassPt: false,
    ptSessionRemaining: 0
  }

  async componentDidMount() {
    if (this.props.userId) {
      // if (!this.props.dataUserDetail) {
      this.fetchData()
      // }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.userId !== this.props.userId) {
      if (!this.props.dataUserDetail) {
        this.fetchData()
      }
    }

    if (prevProps.dataMyJoinedClassPt !== this.props.dataMyJoinedClassPt) {
      let closestClass = this.props.dataMyJoinedClassPt[0]
      if (closestClass) {
        this.setState({
          hasJoinedClassPt: true
        })
      } else {
        this.setState({
          hasJoinedClassPt: false
        })
      }
    }
  }

  fetchData = async () => {
    await this.props.fetchDataUserDetail(this.props.userId)
    await this.props.fetchDataMyJoinedClassPt(this.getDate())

    this.setState({
      ptSessionRemaining: this.props.dataUserDetail.tblMember.ptSession
    })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleDateChange = name => date => {
    this.setState({ [name]: date })
  };

  handleModalKetentuanSyarat = () => {
    if (!this.props.hasConfirmTermAndCondition) {
      this.setState({
        openModalKetentuanSyarat: !this.state.openModalKetentuanSyarat
      })
    } else {
      this.handleModalSelectTimePT()
    }
  }

  handleModalForm = () => {
    this.setState({
      openModalForm: !this.state.openModalForm
    })
  }

  handleModalSelectTimePT = () => {
    this.setState({
      openModalSelectTimePT: !this.state.openModalSelectTimePT
    })
  }

  handleModalStartPTSession = () => {
    this.setState({
      openModalStartPTSession: !this.state.openModalStartPTSession
    })
  }

  nextToForm = () => {
    this.handleModalKetentuanSyarat()
    this.handleModalForm()
  }

  nextToSelectTime = () => {
    this.handleModalForm()
    this.handleModalSelectTimePT()
  }

  joinClass = () => {
    this.setState({ ptSessionRemaining: this.state.ptSessionRemaining - 1 })
  }

  cancelJoinClass = async () => {
    await this.props.fetchDataMyJoinedClassPt(this.getDate())
    this.setState({ ptSessionRemaining: this.state.ptSessionRemaining + 1 })
  }

  getDate = () => {
    let date = new Date().getDate()
    let month = new Date().getMonth() + 1
    let year = new Date().getFullYear()

    if (date < 10) date = `0${date}`
    if (month < 10) month = `0${month}`

    return `${year}-${month}-${date}`
  }

  getNumberOfWeek = () => {
    let theDay = new Date()
    var target = new Date();
    var dayNr = (new Date(theDay).getDay() + 6) % 7;

    target.setDate(target.getDate() - dayNr + 3);

    var reference = new Date(target.getFullYear(), 0, 4);
    var dayDiff = (target - reference) / 86400000;
    var weekNr = 1 + Math.ceil(dayDiff / 7);

    return weekNr;
  }

  render() {
    function formatDate(args) {
      let newDate = new Date(args)
      let date = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()
      let month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1

      return `${date}/${month}/${newDate.getFullYear()}`
    }

    function getTimeCloestClass(args) {
      let day = ["MINGGU", "SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"]
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

      let newDate = new Date(args.tblClassPt.year, args.tblClassPt.month - 1, args.tblClassPt.date)

      return `${day[newDate.getDay()]} ${months[args.tblClassPt.month - 1]} ${args.tblClassPt.date} | ${args.tblClassPt.time.slice(0, 5)}`
    }

    // function cekSisaHari(args) {
    //   let sisaHari = new Date(args) - new Date()
    //   sisaHari = Math.round(Math.round((new Date(args).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)));

    //   return sisaHari
    // }

    return (
      <>
        <Grid>
          <Grid style={{ backgroundColor: '#8eb52f', minHeight: 40, padding: '15px 50px', color: 'white', fontSize: 15 }}>
            Pengumuman: Megafit tutup sementara sampai batas waktu yang tidak ditentukan. Membership dibekukan & disesuaikan ketika buka kembali
          </Grid>
          <Grid container style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 5, display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: 35, marginBottom: 20 }}>Hi {this.props.nickname}, ayo kita mulai sehat bareng.</p>

            <Grid container spacing={3}>
              {/* BAGIAN KIRI */}
              <Grid item md={7} sm={12}>
                <Grid style={{ backgroundColor: '#f6f6fa', marginBottom: 20, display: 'flex', alignItems: 'center' }}>
                  <Grid style={{ position: 'relative' }}>
                    <img src={require('../asset/home2.png')} height={200} width={240} alt="logo-home2" style={{ marginRight: 10 }} />
                    <img src={require('../asset/home1.png')} height={130} width={150} alt="logo-home1" style={{ marginRight: 10, position: 'absolute', left: 0, bottom: 0 }} />
                  </Grid>

                  <Grid style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Grid>
                      <Typography style={{ margin: 0, color: '#93ccf9', fontSize: 30 }}>Workout</Typography>
                      <Typography style={{ margin: 0, color: '#93ccf9', fontSize: 30 }}>From</Typography>
                      <Typography style={{ margin: 0, color: '#93ccf9', fontSize: 30 }}>Home</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/* MEMBERSHIPS */}
                  {/* <Grid item>
                    <p style={{ margin: 0, marginBottom: 10 }}>Paket Keanggotaan</p>
                    <Grid style={{ backgroundColor: '#8eb52f', padding: 10, borderRadius: 5, width: 250, height: 80, display: 'flex', marginBottom: 10 }}>
                      <Grid style={{ backgroundColor: '#5f810c', borderRadius: 5, width: 60, height: 60, position: 'relative' }}>
                        {
                          this.props.dataUserDetail && <p style={{ margin: 0, fontSize: 35, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{cekSisaHari(this.props.dataUserDetail.tblMember.activeExpired)}</p>
                        }
                        <p style={{ margin: '5px 0px', color: 'white', position: 'absolute', bottom: 0, left: 18, marginBottom: 3 }}>hari</p>
                      </Grid>
                      <Grid style={{ marginLeft: 10 }}>
                        <Button style={{ color: 'white', border: '1px solid white', borderRadius: 5, width: 150, padding: 5, marginBottom: 5 }}>
                          ajukan cuti
                        </Button>
                        <Grid style={{ display: 'flex' }}>
                          <p style={{ margin: 0, color: 'white' }}>aktif s/d</p>
                          <p style={{ margin: '0px 0px 0px 5px', color: 'white', fontWeight: 'bold' }}>{this.props.dataUserDetail && formatDate(this.props.dataUserDetail.tblMember.ptSession)}</p>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid style={{ borderRadius: 5, width: 250, height: 80, display: 'flex', border: '1px dashed #e5e3e3', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => this.props.history.push('/home/paket')}>
                      <AddIcon style={{ color: '#d5d3d3' }} />
                    </Grid>
                  </Grid> */}

                  {/* PT */}
                  <Grid item>
                    <p style={{ margin: 0, marginBottom: 10 }}>Paket PT</p>
                    <Grid style={{ backgroundColor: '#92cbf7', padding: 10, borderRadius: 5, width: 250, height: 80, display: 'flex', marginBottom: 10 }}>
                      <Grid style={{ backgroundColor: '#3183c2', borderRadius: 5, width: 60, height: 60, position: 'relative' }}>
                        <p style={{ margin: 0, fontSize: 35, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{this.state.ptSessionRemaining}</p>
                        <p style={{ margin: '5px 0px', color: 'white', position: 'absolute', bottom: 0, left: 18, marginBottom: 3 }}>sisa</p>
                      </Grid>

                      {
                        this.state.hasJoinedClassPt
                          ? <Grid style={{ marginLeft: 10 }}>
                            <Button style={{ color: '#92cbf7', backgroundColor: 'white', borderRadius: 5, width: 150, padding: 5, marginBottom: 5 }} onClick={this.handleModalStartPTSession}>
                              mulai / batal
                        </Button>
                            <Grid style={{ display: 'flex' }}>
                              {
                                this.props.dataMyJoinedClassPt[0] && <p style={{ margin: 0, color: 'white' }}>{getTimeCloestClass(this.props.dataMyJoinedClassPt[0])}</p>
                              }
                              {/* <p style={{ margin: '0px 0px 0px 5px', color: 'white', fontWeight: 'bold' }}>{this.props.dataUserDetail && formatDate(this.props.dataUserDetail.tblMember.ptSession)}</p> */}
                            </Grid>
                          </Grid>
                          : <Grid style={{ marginLeft: 10 }}>
                            <Button style={{ color: '#92cbf7', backgroundColor: 'white', borderRadius: 5, width: 150, padding: 5, marginBottom: 5 }} onClick={this.handleModalKetentuanSyarat} disabled={this.props.dataUserDetail && this.props.dataUserDetail.tblMember.ptSession === 0}>
                              pilih sesi
                          </Button>
                            <Grid style={{ display: 'flex' }}>
                              <p style={{ margin: 0, color: 'white' }}>aktif s/d</p>
                              <p style={{ margin: '0px 0px 0px 5px', color: 'white', fontWeight: 'bold' }}>{this.props.dataUserDetail && formatDate(this.props.dataUserDetail.tblMember.activeExpired)}</p>
                            </Grid>
                          </Grid>
                      }

                    </Grid>
                    <Grid style={{ borderRadius: 5, width: 250, height: 80, display: 'flex', border: '1px dashed #e5e3e3', alignItems: 'center', justifyContent: 'center' }}>
                      <AddIcon style={{ color: '#d5d3d3' }} />
                    </Grid>

                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={1} />

              {/* BAGIAN KANAN */}
              <Grid item md={4} sm={12}>

                <Grid style={{ position: 'relative' }}>
                  <img src={require('../asset/home3.png')} height={200} width={270} alt="logo-home3" style={{ marginRight: 10 }} />
                  <Grid style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', top: 60, left: 40 }}>
                    <Grid>
                      <Typography style={{ margin: 0, color: '#2248a8', fontSize: 18 }}>PERSONAL</Typography>
                      <Typography style={{ margin: 0, color: '#2248a8', fontSize: 18 }}>TRAINING</Typography>
                      <Typography style={{ margin: 0, color: '#2248a8', fontSize: 18 }}>ONLINE</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Konfirmasi Pembayaran */}
                {/* <Grid style={{ backgroundColor: '#f6f6fa', borderRadius: 15, padding: 20 }}>
                  <p style={{ margin: 0, fontSize: 18 }}>Konfirmasi Pembayaran</p>
                  <Grid style={{ display: 'flex', marginBottom: 10 }}>
                    <p style={{ margin: 0 }}>Total Tagihan: </p>
                    <p style={{ margin: '0px 0px 0px 5px', fontWeight: 'bold' }}>Rp 600.000</p>
                  </Grid>

                  <Grid style={{ display: 'flex', alignItems: 'center', height: 50 }}>
                    <DateRangeIcon style={{ color: '#8eb52f', width: 30, height: 30, marginRight: 15 }} />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="tanggalBayar"
                        value={this.state.datePayment}
                        onChange={this.handleDateChange('datePayment')}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        style={{ width: '100%' }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid style={{ display: 'flex', alignItems: 'center', height: 50 }}>
                    <PersonIcon style={{ color: '#8eb52f', width: 30, height: 30, marginRight: 15 }} />
                    <TextField
                      id="namaRekening"
                      placeholder="Nama di rekening / no HP"
                      value={this.state.account}
                      onChange={this.handleChange('account')}
                      margin="normal"
                      style={{ padding: 0, width: '100%' }}
                      disabled={this.state.proses}
                      inputProps={{
                        style: {
                          padding: '10px 0px'
                        }
                      }}
                    />
                  </Grid>

                  <Grid style={{ display: 'flex', alignItems: 'center', height: 50 }}>
                    <AccountBalanceWalletIcon style={{ color: '#8eb52f', width: 30, height: 30, marginRight: 15 }} />
                    <TextField
                      id="jumlah"
                      placeholder="Jumlah"
                      value={this.state.amount}
                      onChange={this.handleChange('amount')}
                      margin="normal"
                      style={{ padding: 0, width: '100%' }}
                      disabled={this.state.proses}
                      inputProps={{
                        style: {
                          padding: '10px 0px'
                        }
                      }}
                    />
                  </Grid>

                  <Grid style={{ display: 'flex', alignItems: 'center', height: 50 }}>
                    <AccountBalanceIcon style={{ color: '#8eb52f', width: 30, height: 30, marginRight: 15 }} />
                    <Select
                      id="role"
                      value={this.state.method}
                      onChange={this.handleChange('method')}
                      style={{ width: '100%' }}
                    >
                      {
                        this.state.listMethod.map(el =>
                          <MenuItem value={el} key={el}>{el}</MenuItem>
                        )
                      }
                    </Select>
                  </Grid>
                  <Button style={{ width: '100%', fontWeight: 'bold', backgroundColor: '#d8d8d8', marginTop: 10 }}>
                    Konfirmasi
                </Button>
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>

          <Grid style={{ marginTop: 50, color: '#658517', backgroundColor: '#c7c7c7', padding: '13px 50px', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid style={{ display: 'flex' }}>
              <p style={{ margin: 0 }}>kebijakan data</p>
              <p style={{ margin: 0, marginLeft: 30 }}>hubungi kami</p>
            </Grid>
            <InstagramIcon />
          </Grid>
        </Grid>

        {
          this.state.openModalKetentuanSyarat && <ModalKetentuanSyarat open={this.state.openModalKetentuanSyarat} close={this.handleModalKetentuanSyarat} next={this.nextToForm} />
        }

        {
          this.state.openModalForm && <ModalFormMember open={this.state.openModalForm} close={this.handleModalForm} next={this.nextToSelectTime} />
        }

        {
          this.state.openModalSelectTimePT && <ModalSelectTimePT open={this.state.openModalSelectTimePT} close={this.handleModalSelectTimePT} joinClass={this.joinClass} />
        }

        {
          this.state.openModalStartPTSession && <ModalStartPTSession open={this.state.openModalStartPTSession} close={this.handleModalStartPTSession} data={this.props.dataMyJoinedClassPt[0]} cancelJoinClass={this.cancelJoinClass} />
        }

      </>
    )
  }
}

const mapDispatchToProps = {
  fetchDataUserDetail,
  fetchDataMyJoinedClassPt
}

const mapStateToProps = ({ userId, nickname, dataUserDetail, lockerKey, hasConfirmTermAndCondition, dataMyJoinedClassPt }) => {
  return {
    userId,
    nickname,
    dataUserDetail,
    lockerKey,
    hasConfirmTermAndCondition,
    dataMyJoinedClassPt
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)