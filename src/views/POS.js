import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import {
  Grid, Paper, InputBase, IconButton, Avatar, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography, TextField, Button, Chip, Select, MenuItem
} from '@material-ui/core';

import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import SearchIcon from '@material-ui/icons/Search';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import swal from 'sweetalert';

import CardItemOrderPOS from '../components/CardItemOrderPOS';

import { API } from '../config/API';
import { fetchDataPackageMemberships, fetchDataStaff } from '../store/action';

class POS extends Component {
  constructor(props) {
    super(props)
    this._isMounted = false
    this.state = {
      bayar: false,
      dataAnggota: [],
      openModalCreateEditUser: false,
      optionBayar: '',
      stateBayar: 0,
      noReferensi: '',
      sendOnline: '',
      searchUserId: '',
      dataMember1: null,
      packageMembershipsNow: {},
      orderList: [],
      hasPerpanjang: false,
      hasCuti: false,
      totalPrice: 0,
      salesSelected: null,
      idSales: '',
      changeSales: true,
    }
  }

  async componentDidMount() {
    await this.props.fetchDataPackageMemberships()
    await this.props.fetchDataStaff()
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.dataMember1 !== this.state.dataMember1) {
      if (this.state.dataMember1) {
        let packageSelected = this.props.dataPackageMemberships.find(el => el.packageMembershipId === this.state.dataMember1.tblMember.packageMembershipId)

        this.setState({
          packageMembershipsNow: packageSelected
        })
      }
    }

    if (prevState.idSales !== this.state.idSales) {
      let salesSelected = await this.props.dataAllStaff.find(el => el.userId === this.state.idSales)

      this.handleChangeSales()
      this.setState({
        salesSelected
      })
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleBayar = () => {
    console.log(this.state.orderList.length, this.state.idSales)
    if (this.state.orderList.length === 0) {
      swal('Daftar pesanan masih kosong','', 'warning')
    } else if (this.state.idSales === '') {
      swal('Pilih sales terlebih dahulu','', 'warning')
    } else {
      console.log("MASUK")
      this.setState({
        bayar: !this.state.bayar
      })
    }
  }

  handleStateBayar = (option, state) => {
    if (option) {
      this.setState({
        optionBayar: option
      })
    }

    this.setState({
      stateBayar: state
    })
  }

  fetchMember = async (event) => {
    event.preventDefault()

    try {
      if (this.state.searchUserId) {
        let token = Cookies.get('MEGAFIT_TKN')
        let { data } = await API.get(`/users/${this.state.searchUserId}?idMember=${this.state.searchUserId}`, { headers: { token } })

        console.log(data.data)
        this.setState({
          dataMember1: data.data
        })
      } else {
        this.setState({
          dataMember1: null
        })
      }
    } catch (err) {
      swal('please try again')
    }
  }

  perpanjangPaket = async () => {
    let newOrder = this.state.orderList
    newOrder.push(this.state.packageMembershipsNow)

    this.setState({
      hasPerpanjang: true,
      orderList: newOrder
    })
  }

  deleteOrder = args => {
    let newArray = this.state.orderList
    let packageDelete = this.state.orderList[args]

    newArray.splice(args, 1)

    if (packageDelete.packageMembershipId === this.state.packageMembershipsNow.packageMembershipId) {
      this.setState({
        orderList: newArray,
        hasPerpanjang: false
      })
    } else {
      this.setState({
        orderList: newArray
      })
    }
  }

  setTotalPrice = (ket, args) => {
    let newTotalPrice
    if (ket === '-') {
      newTotalPrice = Number(this.state.totalPrice) - Number(args)
    } else {
      newTotalPrice = Number(args) + Number(this.state.totalPrice)
    }
    this.setState({
      totalPrice: newTotalPrice
    })
  }

  handleChangeSales = () => {
    this.setState({
      changeSales: !this.state.changeSales
    })
  }

  render() {
    function getDate(args) {
      let day = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]
      let date = new Date(args).getDate() > 10 ? new Date(args).getDate() : `0${new Date(args).getDate()}`
      let month = new Date(args).getMonth() + 1 > 10 ? new Date(args).getMonth() + 1 : `0${new Date(args).getMonth() + 1}`
      let hour = new Date(args).getHours() > 10 ? new Date(args).getHours() : `0${new Date(args).getHours()}`
      let minute = new Date(args).getMinutes() > 10 ? new Date(args).getMinutes() : `0${new Date(args).getMinutes()}`

      return `${day[new Date(args).getDay()]}, ${date}/${month}/${new Date(args).getFullYear()} - ${hour}:${minute}`
    }

    function convertRupiah(args) {
      let separator
      var number_string = args.toString(),
        sisa = number_string.length % 3,
        rupiah = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);

      if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
      }

      return rupiah
    }

    return (
      <Grid container style={{ padding: '20px 40px' }} spacing={2}>
        <Grid item sm={12} md={5} id="kiri">
          <Paper style={{ minHeight: 500 }}>
            {
              this.state.bayar && <Grid style={{ width: '100%', backgroundColor: '#e5ffde', padding: '5px 10px' }}>
                {getDate(new Date())}
              </Grid>
            }
            <Grid style={{ padding: 15 }}>
              {/* Textbox search */}
              <Paper component="form" style={{
                padding: '0px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                borderRadius: 30,
                backgroundColor: '#e8f0d5',
                marginBottom: 20,
                opacity: this.state.bayar ? 0.2 : 1
              }}>
                <InputBase
                  style={{
                    marginLeft: 10, flex: 1, color: '#77942f', width: '100%'
                  }}
                  placeholder="cari member"
                  inputProps={{ 'aria-label': 'id member' }}
                  onChange={this.handleChange('searchUserId')}
                  value={this.state.searchUserId}
                  disabled={this.state.bayar}
                />
                <IconButton type="submit" style={{ padding: 5, color: '#77942f' }} aria-label="search" onClick={this.fetchMember} disabled={this.state.bayar}>
                  <SearchIcon />
                </IconButton>
              </Paper>

              {
                this.state.dataMember1
                  ? <>
                    {/* Photo Profil */}
                    <Grid container style={{ marginBottom: 10 }}>
                      <Grid item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 10, padding: '0px 10px' }}>
                        <Avatar alt="icon" src={require('../asset/icon_user.png')} style={{ width: 90, height: 90 }} />
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{this.state.dataMember1.nickname}</p>
                        {
                          this.state.dataMember1.flagActive
                            ? <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                              <CheckCircleOutlinedIcon style={{ color: '#8EB52F' }} />
                              <p style={{ margin: 0, marginLeft: 5 }}>active member</p>
                            </Grid>
                            : this.state.dataMember1.tblMember.sisaHari <= -7
                              ? <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                                <CancelOutlinedIcon style={{ color: '#bf0000' }} />
                                <p style={{ margin: 0, marginLeft: 5 }}>nonactive member</p>
                              </Grid>
                              : <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                                <Chip
                                  label="masa tenggang"
                                  color="secondary"
                                />
                              </Grid>
                        }
                      </Grid>
                      {
                        this.state.bayar
                          ? <>
                            <img src={require('../asset/pos1.png')} height={100} width={100} alt="logo-pos1" style={{ marginRight: 10, opacity: 0.2 }} />
                            <img src={require('../asset/cuti.png')} height={100} width={100} alt="logo-cuti" style={{ opacity: 0.2 }} />
                            <img src={require('../asset/upgrade.png')} height={100} width={100} alt="logo-upgrade" style={{ opacity: 0.2 }} />
                          </>
                          : <>
                            {
                              this.state.hasPerpanjang
                                ? <img src={require('../asset/pos1.png')} height={100} width={100} alt="logo-pos1" style={{ marginRight: 10, opacity: 0.2 }} />
                                : <img src={require('../asset/pos1.png')} height={100} width={100} alt="logo-pos1" style={{ marginRight: 10, cursor: 'pointer' }} onClick={this.perpanjangPaket} />
                            }
                            <img src={require('../asset/cuti.png')} height={100} width={100} alt="logo-cuti" style={{ cursor: 'pointer' }} />
                            <img src={require('../asset/upgrade.png')} height={100} width={100} alt="logo-upgrade" style={{ cursor: 'pointer' }} />
                          </>
                      }

                    </Grid>

                    <Divider />

                    {/* Table */}
                    <Grid style={{ minHeight: 200 }}>
                      <Table>
                        <TableHead style={{ backgroundColor: '#f8f8f8' }}>
                          <TableRow>
                            <TableCell style={{ width: '45%' }} >
                              Item
                            </TableCell>
                            <TableCell style={{ width: '20%' }} align="center" >
                              Qty
                            </TableCell>
                            <TableCell style={{ width: '35%' }} >
                              Harga
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                            this.state.orderList.map((el, index) =>
                              <CardItemOrderPOS bayar={this.state.bayar} data={el} key={index} order={index} deleteOrder={this.deleteOrder} setTotalPrice={this.setTotalPrice} />
                            )
                          }
                        </TableBody>
                      </Table>
                      {
                        !this.state.bayar && <p style={{ color: '#c8c8c8', margin: '5px 0px' }}>+ custom</p>
                      }
                    </Grid>

                    <Grid style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                      <p style={{ margin: '0px 5px 0px 0px' }}>sales:</p>
                      {
                        this.state.bayar
                          ? <p style={{ margin: '0px 5px 0px 0px' }}>{this.state.salesSelected.nickname}</p>
                          : this.state.changeSales
                            ? <Select
                              labelId="role"
                              id="role"
                              value={this.state.idSales}
                              onChange={this.handleChange('idSales')}
                            >
                              {
                                this.props.dataAllStaff.map(el => <MenuItem value={el.userId} key={el.userId}>{el.nickname}</MenuItem>)
                              }
                            </Select>
                            : <>
                              <Avatar alt="icon" src={require('../asset/icon_user.png')} style={{ width: 25, height: 25, margin: '0px 5px 0px 0px' }} />
                              {
                                this.state.salesSelected && <p style={{ margin: '0px 5px 0px 0px' }}>{this.state.salesSelected.nickname}</p>
                              }
                              <EditOutlinedIcon style={{ color: '#c8c8c8', width: 20, cursor: 'pointer' }} onClick={this.handleChangeSales} />
                            </>
                      }


                    </Grid>
                    <Divider />

                    <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 30, marginTop: '10px 0px' }}>
                      <p style={{ margin: 0 }}>Total</p>
                      <p style={{ margin: 0, fontSize: 20 }}>Rp {convertRupiah(this.state.totalPrice)}</p>
                    </Grid>

                    <Grid style={{ display: 'flex', justifyContent: 'space-between', paddingRight: 10 }}>
                      <Grid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <p style={{ margin: 0, fontSize: 13, opacity: this.state.bayar ? 0.2 : 1 }}>ditagih setiap bulan</p>
                        <p style={{ margin: 0, color: '#8eb52f', fontSize: 13, opacity: this.state.bayar ? 0.2 : 1 }}>lihat detail sejarah transaksi</p>
                      </Grid>
                      {
                        this.state.bayar
                          ? <Grid style={{ backgroundColor: '#8eb52f', width: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10, borderRadius: 10, opacity: 0.2 }} >
                            <img src={require('../asset/bayar.png')} height={38} width={50} alt="logo-bayar" style={{ marginBottom: 10 }} />
                            <p style={{ color: 'white', margin: 0, fontWeight: 'bold' }}>BAYAR</p>
                          </Grid>
                          : <Grid style={{ backgroundColor: '#8eb52f', width: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10, borderRadius: 10, cursor: 'pointer' }} onClick={this.handleBayar}>
                            <img src={require('../asset/bayar.png')} height={38} width={50} alt="logo-bayar" style={{ marginBottom: 10 }} />
                            <p style={{ color: 'white', margin: 0, fontWeight: 'bold' }}>BAYAR</p>
                          </Grid>
                      }
                    </Grid>
                  </>
                  : <Grid style={{ textAlign: 'center' }}>
                    <img src={require('../asset/undraw_team_ih79.png')} height={400} width={400} alt="logo-pos1" style={{ opacity: 0.7 }} />
                  </Grid>
              }
            </Grid>
          </Paper>
        </Grid>

        {
          this.state.dataMember1 && (this.state.bayar
            ? this.state.stateBayar === 0
              ? <Grid item sm={12} md={7} id="kanan">
                <Paper style={{ padding: 15 }}>
                  <ArrowBackIosRoundedIcon onClick={this.handleBayar} style={{ marginBottom: 10, marginTop: 1, cursor: 'pointer' }} />

                  <Typography style={{ fontSize: 18, marginBottom: 10 }}>E-Wallet</Typography>
                  <Grid container spacing={2} style={{ marginBottom: 10 }}>
                    <Grid item>
                      <img src={require('../asset/ovo.png')} height={70} width={140} alt="logo-ovo" onClick={() => this.handleStateBayar('ovo', 2)} />
                    </Grid>
                    <Grid item>
                      <img src={require('../asset/dana.png')} height={70} width={140} alt="logo-dana" onClick={() => this.handleStateBayar('dana', 2)} />
                    </Grid>
                    <Grid item>
                      <img src={require('../asset/gopay.png')} height={70} width={140} alt="logo-gopay" onClick={() => this.handleStateBayar('gopay', 2)} />
                    </Grid>
                    <Grid item>
                      <img src={require('../asset/link-aja.png')} height={70} width={140} alt="logo-link-aja" onClick={() => this.handleStateBayar('linkAja', 2)} />
                    </Grid>
                    <Grid item>
                      <img src={require('../asset/kredivo.png')} height={70} width={140} alt="logo-kredivo" onClick={() => this.handleStateBayar('kredivo', 2)} />
                    </Grid>
                    <Grid item>
                      <img src={require('../asset/al.png')} height={70} width={140} alt="logo-al" onClick={() => this.handleStateBayar('al', 2)} />
                    </Grid>
                  </Grid>

                  <Typography style={{ fontSize: 18, marginBottom: 10 }}>EDC</Typography>
                  <Grid container spacing={2} style={{ marginBottom: 10 }}>
                    <Grid item>
                      <img src={require('../asset/bca.png')} height={70} width={140} alt="logo-bca" onClick={() => this.handleStateBayar('bca', 1)} />
                    </Grid>
                    <Grid item>
                      <img src={require('../asset/bni.png')} height={70} width={140} alt="logo-bni" onClick={() => this.handleStateBayar('bni', 1)} />
                    </Grid>
                  </Grid>

                  <Typography style={{ fontSize: 18, marginBottom: 10 }}>Other</Typography>
                  <Grid container spacing={2} style={{ marginBottom: 10 }}>
                    <Grid item>
                      <img src={require('../asset/tokopedia.png')} height={70} width={140} alt="logo-tokopedia" onClick={() => this.handleStateBayar('tokopedia', 2)} />
                    </Grid>
                    <Grid item style={{ padding: 8 }}>
                      <Grid item style={{ backgroundColor: '#38a290', padding: 3, height: 70, width: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => this.handleStateBayar('transfer', 1)}>
                        <p style={{ color: 'white', fontSize: 15 }}>Transfer</p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              : <Paper style={{ padding: 15, display: 'flex', flexDirection: 'column', width: 600, marginTop: 10, marginLeft: 8 }}>
                <ArrowBackIosRoundedIcon onClick={() => this.handleStateBayar(null, 0)} style={{ marginBottom: 10, cursor: 'pointer' }} />
                {
                  this.state.stateBayar === 1
                    ? <TextField
                      id="noReferensi"
                      label="No referensi / transaction ID"
                      value={this.state.noReferensi}
                      onChange={this.handleChange('noReferensi')}
                      margin="normal"
                      variant="outlined"
                      style={{ marginBottom: 15, marginLeft: 20, width: 400 }}
                      disabled={this.state.proses}
                    />
                    : <TextField
                      id="sendOnline"
                      label="send online reciept"
                      value={this.state.sendOnline}
                      onChange={this.handleChange('sendOnline')}
                      margin="normal"
                      variant="outlined"
                      style={{ marginBottom: 15, marginLeft: 20, width: 400 }}
                      disabled={this.state.proses}
                    />
                }
                <Button style={{ width: 100, marginLeft: 20 }}>
                  Simpan
                </Button>
              </Paper>
            : <Grid item sm={12} md={7} id="kanan">
              <Paper style={{ padding: 15 }}>
                <p style={{ margin: '0px 0px 10px 0px', fontSize: 25 }}>TAMBAHAN</p>

                <Grid container style={{ marginBottom: 15 }} spacing={1}>
                  <Grid item style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: 85 }}>
                    <img src={require('../asset/tambahan1.png')} height={45} width={40} alt="logo-cuti" style={{ marginBottom: 10 }} />
                    <Paper component="form" style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: 90,
                      borderRadius: 30,
                      backgroundColor: '#e8f0d5',
                      marginBottom: 20
                    }}>
                      <InputBase
                        style={{
                          marginLeft: 10, flex: 1, color: '#77942f', fontSize: 13
                        }}
                        placeholder="id member"
                        inputProps={{ 'aria-label': 'id member' }}
                        onChange={this.handleChange('searchingUser')}
                        value={this.state.searchingUser}
                      />
                    </Paper>
                  </Grid>
                  <Grid item>
                    <img src={require('../asset/perpanjang.png')} height={90} width={90} alt="logo-perpanjang" />
                  </Grid>
                  <Grid item>
                    <img src={require('../asset/pendaftaran.png')} height={90} width={90} alt="logo-pendaftaran" />
                  </Grid>
                  <Grid item>
                    <img src={require('../asset/cuti.png')} height={90} width={90} alt="logo-cuti" />
                  </Grid>
                  <Grid item>
                    <img src={require('../asset/aktifasi-ulang.png')} height={90} width={90} alt="logo-aktifasi-ulang" />
                  </Grid>
                </Grid>

                <Grid container style={{ marginBottom: 15 }}>
                  <Grid item style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: 85, marginRight: 8, marginBottom: 8 }}>
                    <img src={require('../asset/tambahan1.png')} height={45} width={40} alt="logo-cuti" style={{ marginBottom: 10 }} />
                    <Paper component="form" style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: 90,
                      borderRadius: 30,
                      backgroundColor: '#e8f0d5',
                      marginBottom: 20
                    }}>
                      <InputBase
                        style={{
                          marginLeft: 10, flex: 1, color: '#77942f', fontSize: 13
                        }}
                        placeholder="id member"
                        inputProps={{ 'aria-label': 'id member' }}
                        onChange={this.handleChange('searchingUser')}
                        value={this.state.searchingUser}
                      />
                    </Paper>
                  </Grid>

                  <Grid item style={{ width: 90, height: 90, backgroundColor: '#ccebff', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginRight: 8 }}>
                    <img src={require('../asset/tambah-pt.png')} height={60} width={60} alt="logo-tambah-pt" />
                    <p style={{ margin: 0 }}>PT</p>
                  </Grid>
                  <Grid item style={{ width: 90, height: 90, backgroundColor: '#ccebff', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginRight: 8 }}>
                    <img src={require('../asset/tambah-pt.png')} height={60} width={60} alt="logo-tambah-pt" />
                    <p style={{ margin: 0 }}>PT</p>
                  </Grid>
                  <Grid item style={{ width: 90, height: 90, backgroundColor: '#ccebff', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginRight: 8 }}>
                    <img src={require('../asset/tambah-pt.png')} height={60} width={60} alt="logo-tambah-pt" />
                    <p style={{ margin: 0 }}>PT</p>
                  </Grid>
                  <Grid item style={{ width: 90, height: 90, backgroundColor: '#ccebff', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginRight: 8 }}>
                    <img src={require('../asset/tambah-pt.png')} height={60} width={60} alt="logo-tambah-pt" />
                    <p style={{ margin: 0 }}>PT</p>
                  </Grid>
                  <Grid item>
                    <img src={require('../asset/administrasi.png')} height={90} width={90} alt="logo-cuti" />
                  </Grid>
                </Grid>

                <Grid container style={{ marginBottom: 15 }}>
                  <Grid item style={{ width: 90, height: 90, backgroundColor: '#c7dbfc', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginRight: 8, marginBottom: 10 }}>
                    <img src={require('../asset/transaksi-baru.png')} height={30} width={30} alt="logo-transaksi-baru" style={{ marginBottom: 5 }} />
                    <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Transaksi</p>
                    <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Baru</p>
                  </Grid>
                  <Grid item style={{ width: 90, height: 90, backgroundColor: '#c7dbfc', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginRight: 8 }}>
                    <img src={require('../asset/bon-terakhir.png')} height={30} width={30} alt="logo-bon-terakhir" style={{ marginBottom: 5 }} />
                    <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Bon</p>
                    <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Terakhir</p>
                  </Grid>
                  <Grid item style={{ width: 90, height: 90, backgroundColor: '#c7dbfc', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginRight: 8 }}>
                    <img src={require('../asset/bon-hari-ini.png')} height={30} width={30} alt="logo-bon-hari-ini" style={{ marginBottom: 5 }} />
                    <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Bon</p>
                    <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Hari Ini</p>
                  </Grid>
                  <Grid item style={{ width: 90, height: 90, backgroundColor: '#c7dbfc', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginRight: 8 }}>
                    <img src={require('../asset/catatan.png')} height={30} width={30} alt="logo-catatan" style={{ marginBottom: 5 }} />
                    <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Catatan</p>
                  </Grid>
                  <Grid item style={{ width: 90, height: 90, backgroundColor: '#c7dbfc', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginRight: 8 }}>
                    <img src={require('../asset/penjualan-tertunda.png')} height={30} width={30} alt="logo-penjualan-tertunda" style={{ marginBottom: 5 }} />
                    <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Penjualan</p>
                    <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Tertunda</p>
                  </Grid>
                  <Grid item style={{ width: 90, height: 90, backgroundColor: '#c7dbfc', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginRight: 8 }}>
                    <img src={require('../asset/diskon.png')} height={30} width={30} alt="logo-diskon" style={{ marginBottom: 5 }} />
                    <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Diskon/</p>
                    <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Potongan</p>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )
        }
      </Grid>
    )
  }
}

const mapStateToProps = ({ dataPackageMemberships, dataAllStaff }) => {
  return {
    dataPackageMemberships,
    dataAllStaff
  }
}

const mapDispatchToProps = {
  fetchDataPackageMemberships,
  fetchDataStaff
}

export default connect(mapStateToProps, mapDispatchToProps)(POS)