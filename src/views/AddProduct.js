import React, { Component } from 'react'
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import {
  Grid, Typography, TextField, Button, FormControl, MenuItem, Select, Checkbox, Paper, Switch
} from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import swal from 'sweetalert';

import { API } from '../config/API';

import { fetchDataSubCategoryMemberships, fetchDataCategoryMemberships } from '../store/action';

class AddProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idCategori: '',
      nameProduct: '',
      hargaDef: '',
      hariDef: '',
      idDef: '',
      hargaGrosir: [
        // {
        //   price: '',
        //   times: '',
        //   id: ''
        // },
      ],
      access: '',
      adminFee: '',
      berlakuPeriodeMember: false,
      periodeAwal: new Date(),
      periodeAkhir: new Date(),
      sebagaiUtama: false,
      dataCategoryMembership: [],
    }
  }

  async componentDidMount() {
    await this.props.fetchDataCategoryMemberships()

    if (this.props.location.state) {
      let data = this.props.location.state.data
      let hargaGrosir = []

      data.tblPackageMemberships.forEach((element, index) => {
        if (index !== 0) {
          let obj = {
            price: element.price,
            times: Number(data.categoryMembershipId) === 1 ? element.times : element.sessionPtHours,
            id: element.packageMembershipId
          }
          hargaGrosir.push(obj)
        }
      });

      this.setState({
        idCategori: data.categoryMembershipId,
        nameProduct: data.subCategoryMembership,
        hargaDef: data.tblPackageMemberships[0].price,
        hariDef: Number(data.categoryMembershipId) === 1 ? data.tblPackageMemberships[0].times : data.tblPackageMemberships[0].sessionPtHours,
        idDef: data.tblPackageMemberships[0].packageMembershipId,
        hargaGrosir,
        access: data.access,
        adminFee: data.adminFee,
        berlakuPeriodeMember: (data.startPromo && data.endPromo) ? true : false,
        periodeAwal: data.startPromo || new Date(),
        periodeAkhir: data.endPromo || new Date(),
        sebagaiUtama: data.isMainPackage,
      })
    }
  }

  componentWillUnmount() {
    this.resetForm()
  }

  fetchDataCategoryMembership = async () => {
    try {
      let token = Cookies.get('MEGAFIT_TKN')

      let allCategoryMemberships = await API.get('/category-memberships', { headers: { token } })

      this.setState({
        dataCategoryMembership: allCategoryMemberships.data.data
      })

    } catch (err) {
      console.log(err)
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  addGrosirPrice = () => {
    let newArray = [...this.state.hargaGrosir, {
      "price": '',
      "times": '',
      "id": ''
    }]

    this.setState({
      hargaGrosir: newArray
    })
  }

  deleteGrosirPrice = index => {
    let newArray = [...this.state.hargaGrosir]

    newArray.splice(index, 1)
    this.setState({
      hargaGrosir: newArray
    })
  }

  handleChangeGrosirPrice = (inde, name) => event => {
    let newValue = event.target.value
    this.setState(prevState => ({
      hargaGrosir: prevState.hargaGrosir.map((el, index) => inde === index ? { ...el, [name]: newValue } : el)
    }))
  }

  handleDateChange = name => date => {
    this.setState({ [name]: date })
  };

  submit = async () => {
    try {
      let newObj = {
        packageMembershipId: this.state.idDef,
        package: this.state.nameProduct,
        categoryMembershipId: this.state.idCategori,
        price: this.state.hargaDef,
        access: this.state.access,
        adminFee: this.state.adminFee,
        grosirPrice: this.state.hargaGrosir,
        isMainPackage: this.state.sebagaiUtama
      }

      if (this.state.categoryMembershipId === 1) {
        newObj.times = this.state.hariDef
      } else if (this.state.categoryMembershipId === 2) {
        newObj.sessionPtHours = this.state.hariDef
      } else if (this.state.categoryMembershipId === 3) {
        newObj.times = 1
      } else {
        newObj.times = 30
      }

      if (this.state.berlakuPeriodeMember) {
        newObj.startPromo = this.state.periodeAwal
        newObj.endPromo = this.state.periodeAkhir
      }


      let token = Cookies.get('MEGAFIT_TKN')
      if (this.props.location.state.data) {
        await API.put(`/sub-category-memberships/${this.props.location.state.data.id}`, newObj, { headers: { token } })
        swal("Edit Package Memberships Success", "", "success")
      } else {
        await API.post('/sub-category-memberships', newObj, { headers: { token } })
        swal("Add Package Memberships Success", "", "success")
      }

      this.props.fetchDataSubCategoryMemberships()
      this.props.history.goBack()

    } catch (err) {
      console.log(err)
    }
  }

  resetForm = () => {
    this.setState({
      idCategori: '',
      nameProduct: '',
      hargaDef: '',
      hariDef: '',
      idDef: '',
      hargaGrosir: [
      ],
      access: '',
      adminFee: '',
      berlakuPeriodeMember: false,
      periodeAwal: new Date(),
      periodeAkhir: new Date(),
      sebagaiUtama: false,
    })
  }

  render() {
    return (
      <>
        <Typography style={{ fontSize: 30, margin: '30px 0px 20px 30px' }}>Tambah Produk</Typography>

        <form autoComplete="off" onSubmit={this.submit} style={{ display: 'flex', flexDirection: 'column', width: '90%', margin: '30px auto', marginTop: 0 }}>

          <Paper style={{ padding: 20, marginBottom: 15 }}>
            <p style={{ margin: 0, fontWeight: 'bold', marginBottom: 10 }}>Informasi Produk</p>
            <Grid container style={{ marginBottom: 15, display: 'flex' }}>
              <Grid item sm={2}>
                <p>Kategori</p>
              </Grid>
              <Grid item sm={10}>
                <FormControl variant="outlined" style={{ width: '100%' }} margin='dense'>
                  <Select
                    labelId="role"
                    id="role"
                    value={this.state.idCategori}
                    onChange={this.handleChange('idCategori')}
                  >
                    {
                      this.props.dataCategoryMemberships.map(el =>
                        <MenuItem value={el.categoryMembershipId} key={el.categoryMembershipId}>{el.categoryMembership}</MenuItem>
                      )
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container style={{ display: 'flex', alignItems: 'center' }}>
              <Grid item sm={2}>
                <p>Nama Product</p>
              </Grid>
              <Grid item sm={10}>
                <FormControl variant="outlined" style={{ width: '100%' }} >
                  <TextField
                    id="nameProduct"
                    value={this.state.nameProduct}
                    onChange={this.handleChange('nameProduct')}
                    margin="normal"
                    variant="outlined"
                    style={{ marginBottom: 15 }}
                    disabled={this.state.proses}
                    inputProps={{
                      style: {
                        padding: 10
                      }
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          <Paper style={{ padding: 20, marginBottom: 15 }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>Harga</p>

            <Grid container id="harga-utama" style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
              <Grid item sm={2}>
                <p>Harga *</p>
              </Grid>
              <Grid item sm={10} style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ margin: '0px 10px 0px 0px' }}>Rp</p>
                <TextField
                  id="hargaDef"
                  value={this.state.hargaDef}
                  onChange={this.handleChange('hargaDef')}
                  margin="normal"
                  variant="outlined"
                  style={{ width: 150, marginBottom: 15 }}
                  disabled={this.state.proses}
                  inputProps={{
                    style: {
                      padding: 10
                    }
                  }}
                />
                <p style={{ margin: '0px 10px 0px 10px' }}>/</p>
                <TextField
                  id="hariDef"
                  value={this.state.hariDef}
                  onChange={this.handleChange('hariDef')}
                  margin="normal"
                  variant="outlined"
                  style={{ width: 50, marginBottom: 15 }}
                  disabled={this.state.proses}
                  inputProps={{
                    style: {
                      padding: 10
                    }
                  }}
                />
                <p style={{ margin: '0px 10px 0px 10px' }}>hari</p>

                <p style={{ margin: '0px 10px 0px 20px' }}>id:</p>
                <TextField
                  id="idDef"
                  value={this.state.idDef}
                  onChange={this.handleChange('idDef')}
                  margin="normal"
                  variant="outlined"
                  style={{ width: 80, marginBottom: 15 }}
                  disabled={this.state.proses}
                  inputProps={{
                    style: {
                      padding: 10
                    }
                  }}
                />
              </Grid>
            </Grid>

            <Grid container id="harga-grosir" style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <Grid item sm={2}>
                <p style={{ margin: 0 }}>Harga grosir</p>
              </Grid>
              <p style={{ margin: 0, cursor: 'pointer', color: 'green' }} onClick={this.addGrosirPrice}>+ tambah harga grosir</p>
            </Grid>

            {
              this.state.hargaGrosir.map((el, index) =>
                <Grid container style={{ display: 'flex', alignItems: 'center' }} key={index}>
                  <Grid item sm={2} />
                  <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ margin: '0px 10px 0px 0px' }}>{index + 1}. Rp</p>
                    <TextField
                      id={`price${index}`}
                      value={el.price}
                      onChange={this.handleChangeGrosirPrice(index, 'price')}
                      margin="normal"
                      variant="outlined"
                      style={{ width: 150, marginBottom: 15 }}
                      disabled={this.state.proses}
                      inputProps={{
                        style: {
                          padding: 10
                        }
                      }}
                    />
                    <p style={{ margin: '0px 10px 0px 10px' }}>/</p>
                    <TextField
                      id={`times${index}`}
                      value={el.times}
                      onChange={this.handleChangeGrosirPrice(index, 'times')}
                      margin="normal"
                      variant="outlined"
                      style={{ width: 50, marginBottom: 15 }}
                      disabled={this.state.proses}
                      inputProps={{
                        style: {
                          padding: 10
                        }
                      }}
                    />
                    <p style={{ margin: '0px 10px 0px 10px' }}>hari</p>
                    <p style={{ margin: '0px 10px 0px 20px' }}>id:</p>
                    <TextField
                      id={`id${index}`}
                      value={el.id}
                      onChange={this.handleChangeGrosirPrice(index, 'id')}
                      margin="normal"
                      variant="outlined"
                      style={{ width: 80, marginRight: 20, marginBottom: 15 }}
                      disabled={this.state.proses}
                      inputProps={{
                        style: {
                          padding: 10
                        }
                      }}
                    />
                    <Button variant="contained" color="secondary" style={{ minWidth: 30 }} onClick={() => this.deleteGrosirPrice(index)}>
                      X
                    </Button>
                  </Grid>
                </Grid>
              )
            }

          </Paper>

          <Paper style={{ padding: 20, marginBottom: 15 }}>
            <p style={{ margin: 0, fontWeight: 'bold', marginBottom: 10 }}>Pengelolaan Produk</p>
            <Grid container >
              <Grid item sm={2}>
                <p>Access</p>
              </Grid>
              <Grid item sm={10}>
                <FormControl variant="outlined" style={{ width: 200 }} margin='dense'>
                  <Select
                    labelId="access"
                    id="access"
                    value={this.state.access}
                    onChange={this.handleChange('access')}
                  >
                    <MenuItem value="Unlimited">Unlimited</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container >
              <Grid item sm={2}>
                <p>Admin Fee</p>
              </Grid>
              <Grid item sm={10} style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ margin: '0px 10px 0px 0px' }}>Rp</p>
                <FormControl variant="outlined" style={{ width: 200 }} margin='dense'>
                  <Select
                    labelId="adminFee"
                    id="adminFee"
                    value={this.state.adminFee}
                    onChange={this.handleChange('adminFee')}
                  >
                    <MenuItem value={50000}>50.000</MenuItem>
                    <MenuItem value={100000}>100.000</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={this.state.berlakuPeriodeMember}
                onChange={this.handleChangeCheck('berlakuPeriodeMember')}
                value="berlakuPeriodeMember"
                color="primary"
              />
              <p style={{ margin: '0px 10px 0px 0px' }}>berlaku untuk member yang bergabung dari periode</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="periodeAwal"
                  value={this.state.periodeAwal}
                  onChange={this.handleDateChange('periodeAwal')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  style={{ marginBottom: 20, width: 150 }}
                  disabled={!this.state.berlakuPeriodeMember}
                />
              </MuiPickersUtilsProvider>
              <p style={{ margin: '0px 10px' }}>s/d</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="periodeAkhir"
                  value={this.state.periodeAkhir}
                  onChange={this.handleDateChange('periodeAkhir')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  style={{ marginBottom: 20, width: 150 }}
                  disabled={!this.state.berlakuPeriodeMember}
                />
              </MuiPickersUtilsProvider>

            </Grid>
            <Grid style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ margin: 0 }}>tetapkan sebagai Utama dalam kategori</p>
              <Switch
                checked={this.state.sebagaiUtama}
                onChange={this.handleChangeCheck('sebagaiUtama')}
                color="primary"
                name="sebagaiUtama"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
          </Paper>
          <Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" style={{ marginRight: 10 }} onClick={this.props.history.goBack}>
              batal
            </Button>
            {/* <Button variant="outlined" style={{ marginRight: 10 }}>
              Simpan & tambah  baru
            </Button> */}
            <Button variant="contained" style={{ color: 'white', backgroundColor: '#8eb52f' }} onClick={this.submit}>
              Simpan
            </Button>
          </Grid>

        </form>
      </>
    )
  }
}

const mapDispatchToProps = {
  fetchDataSubCategoryMemberships,
  fetchDataCategoryMemberships
}

const mapStateToProps = ({ loading, error, dataCategoryMemberships }) => {
  return {
    loading,
    error,
    dataCategoryMemberships
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)