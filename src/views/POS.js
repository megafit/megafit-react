import React, { Component } from 'react'

import {
  Grid, Paper, InputBase, IconButton, Avatar, Divider, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';

import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';



export default class POS extends Component {
  constructor(props) {
    super(props)
    this._isMounted = false
    this.state = {
      bayar: false,
      dataAnggota: [],
      openModalCreateEditUser: false
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleBayar = () => {
    this.setState({
      bayar: !this.state.bayar
    })
  }

  render() {
    return (
      <Grid container style={{ padding: '20px 40px' }} spacing={2}>
        <Grid item sm={12} md={5} id="kiri">
          <Paper style={{ padding: 15 }}>
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
                  marginLeft: 10,
                  flex: 1, color: '#77942f'
                }}
                placeholder="cari member"
                inputProps={{ 'aria-label': 'id member' }}
                onChange={this.handleChange('searchingUser')}
                value={this.state.searchingUser}
                disabled={this.state.bayar}
              />
              <IconButton type="submit" style={{ padding: 5, color: '#77942f' }} aria-label="search" onClick={this.searchMember} disabled={this.state.bayar}
              >
                <SearchIcon />
              </IconButton>
            </Paper>

            {/* Photo Profil */}
            <Grid container style={{ marginBottom: 10 }}>
              <Grid item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 10, padding: '0px 10px' }}>
                <Avatar alt="icon" src={require('../asset/icon_user.png')} style={{ width: 90, height: 90 }} />
                <p style={{ margin: 0, fontWeight: 'bold' }}>Paopao</p>
                <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                  <CheckCircleOutlinedIcon style={{ color: '#8EB52F' }} />
                  <p style={{ margin: 0, marginLeft: 5 }}>active member</p>
                </Grid>
              </Grid>
              <img src={require('../asset/pos1.png')} height={100} width={100} alt="logo-pos1" style={{ marginRight: 10, opacity: this.state.bayar ? 0.2 : 1 }} />
              <img src={require('../asset/cuti.png')} height={100} width={100} alt="logo-cuti" style={{ opacity: this.state.bayar ? 0.2 : 1 }}/>
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
                  <TableRow>
                    <TableCell>
                      Anggota Presale
                  </TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {
                        this.state.bayar
                        ? <p style={{ margin: '0px 10px' }}>1</p>
                        : <>
                          <AddCircleOutlineIcon style={{ color: '#c8c8c8' }} />
                          <p style={{ margin: '0px 10px' }}>1</p>
                          <RemoveCircleOutlineIcon style={{ color: '#c8c8c8' }} />
                        </>

                      }
                        
                      </div>
                    </TableCell>

                    <TableCell style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      Rp 300.000
                      {
                        !this.state.bayar && <CloseIcon style={{ color: '#c8c8c8', width: 18 }} />
                      }                    
                    </TableCell>
                  </TableRow>
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
                ? <p style={{ margin: '0px 5px 0px 0px' }}>caca</p>
                : <>
                  <Avatar alt="icon" src={require('../asset/icon_user.png')} style={{ width: 25, height: 25, margin: '0px 5px 0px 0px' }} />
                  <p style={{ margin: '0px 5px 0px 0px' }}>caca</p>
                  <EditOutlinedIcon style={{ color: '#c8c8c8', width: 20 }} />
                </>
              }

              
            </Grid>
            <Divider />

            <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 30, marginTop: '10px 0px' }}>
              <p style={{ margin: 0 }}>Total</p>
              <p style={{ margin: 0, fontSize: 20 }}>Rp 300.000</p>
            </Grid>

            <Grid style={{ display: 'flex', justifyContent: 'space-between', paddingRight: 10 }}>
              <Grid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ margin: 0, fontSize: 13, opacity: this.state.bayar ? 0.2 : 1 }}>ditagih setiap bulan</p>
                <p style={{ margin: 0, color: '#8eb52f', fontSize: 13, opacity: this.state.bayar ? 0.2 : 1 }}>lihat detail sejarah transaksi</p>
              </Grid>
              <Grid style={{ backgroundColor: '#8eb52f', width: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10, borderRadius: 10, opacity: this.state.bayar ? 0.2 : 1 }} onClick={this.handleBayar}>
                <img src={require('../asset/bayar.png')} height={38} width={50} alt="logo-bayar" style={{ marginBottom: 10 }} />
                <p style={{ color: 'white', margin: 0, fontWeight: 'bold' }}>BAYAR</p>

              </Grid>
            </Grid>
          </Paper>
        </Grid>


        
        {
          this.state.bayar
          ? <p>Bayar</p>
          : <Grid item sm={12} md={7} id="kanan">
          <Paper style={{ padding: 15 }}>
            <p style={{ margin: '0px 0px 10px 0px', fontSize: 25 }}>TAMBAHAN</p>

            <Grid container style={{ marginBottom: 15 }} spacing={1}>
              <Grid item style={{ display: 'flex', alignItems: 'center', flexDirection: 'column',  height: 85 }}>
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
              <Grid item style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: 85, marginRight: 8, marginBottom:8 }}>
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

              <Grid item style={{ width: 90, height:90,  backgroundColor: '#ccebff', borderRadius:10, display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginRight:8 }}>
                <img src={require('../asset/tambah-pt.png')} height={60} width={60} alt="logo-perpanjang" />
                <p style={{ margin: 0 }}>PT</p>
              </Grid>
              <Grid item style={{ width: 90, height:90,  backgroundColor: '#ccebff', borderRadius:10, display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginRight:8 }}>
                <img src={require('../asset/tambah-pt.png')} height={60} width={60} alt="logo-perpanjang" />
                <p style={{ margin: 0 }}>PT</p>
              </Grid>
             <Grid item style={{ width: 90, height:90,  backgroundColor: '#ccebff', borderRadius:10, display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginRight:8 }}>
                <img src={require('../asset/tambah-pt.png')} height={60} width={60} alt="logo-perpanjang" />
                <p style={{ margin: 0 }}>PT</p>
              </Grid>
              <Grid item style={{ width: 90, height:90,  backgroundColor: '#ccebff', borderRadius:10, display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginRight:8 }}>
                <img src={require('../asset/tambah-pt.png')} height={60} width={60} alt="logo-perpanjang" />
                <p style={{ margin: 0 }}>PT</p>
              </Grid>
              <Grid item>
                <img src={require('../asset/administrasi.png')} height={90} width={90} alt="logo-cuti" />
              </Grid>
            </Grid>

            <Grid container style={{ marginBottom: 15 }}>
              <Grid item style={{ width: 90, height:90,  backgroundColor: '#c7dbfc', borderRadius:10, display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginRight: 8, marginBottom:10 }}> 
                <img src={require('../asset/transaksi-baru.png')} height={30} width={30} alt="logo-perpanjang" style={{ marginBottom: 5 }}/>
                <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Transaksi</p>
                <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Baru</p>
              </Grid>
              <Grid item style={{ width: 90, height:90,  backgroundColor: '#c7dbfc', borderRadius:10, display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginRight: 8 }}> 
                <img src={require('../asset/bon-terakhir.png')} height={30} width={30} alt="logo-perpanjang" style={{ marginBottom: 5 }}/>
                <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Bon</p>
                <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Terakhir</p>
              </Grid>
              <Grid item style={{ width: 90, height:90,  backgroundColor: '#c7dbfc', borderRadius:10, display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginRight: 8 }}> 
                <img src={require('../asset/bon-hari-ini.png')} height={30} width={30} alt="logo-perpanjang" style={{ marginBottom: 5 }}/>
                <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Bon</p>
                <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Hari Ini</p>
              </Grid>
              <Grid item style={{ width: 90, height:90,  backgroundColor: '#c7dbfc', borderRadius:10, display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginRight: 8 }}> 
                <img src={require('../asset/catatan.png')} height={30} width={30} alt="logo-perpanjang" style={{ marginBottom: 5 }}/>
                <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Catatan</p>
              </Grid>
              <Grid item style={{ width: 90, height:90,  backgroundColor: '#ccebff', borderRadius:10, display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginRight: 8 }}> 
                <img src={require('../asset/penjualan-tertunda.png')} height={30} width={30} alt="logo-perpanjang" style={{ marginBottom: 5 }}/>
                <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Penjualan</p>
                <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Tertunda</p>
              </Grid>
              <Grid item style={{ width: 90, height:90,  backgroundColor: '#ccebff', borderRadius:10, display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginRight: 8 }}> 
                <img src={require('../asset/diskon.png')} height={30} width={30} alt="logo-perpanjang" style={{ marginBottom: 5 }}/>
                <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Diskon/</p>
                <p style={{ margin: 0, fontSize: 10, padding: 0 }}>Potongan</p>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        }

      </Grid >
    )
  }
}
