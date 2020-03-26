import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class AddProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idCategori: '',
      nameProduct: '',
      hargaDef: '',
      hariDef: '',
      idDef: '',
      hargaGrosir: [
        {
          harga: '',
          hari: '',
          id: ''
        }, {
          harga: '',
          hari: '',
          id: ''
        },
      ],
      access: '',
      adminFee: '',
      berlakuPeriodeMember: false,
      periodeAwal: '',
      periodeAkhir: '',
      sebagaiUtama: false,
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
      harga: '',
      hari: '',
      id: ''
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
                    <MenuItem value={3}>Staff</MenuItem>
                    <MenuItem value={4}>Member</MenuItem>
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
                <Grid container style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }} key={index}>
                  <Grid item sm={2} />
                  <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ margin: '0px 10px 0px 0px' }}>{index + 1}. Rp</p>
                    <TextField
                      id={`harga${index}`}
                      value={el.harga}
                      onChange={this.handleChangeGrosirPrice(index, 'harga')}
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
                      id={`hari${index}`}
                      value={el.hari}
                      onChange={this.handleChangeGrosirPrice(index, 'hari')}
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
                    labelId="role"
                    id="role"
                    value={this.state.idCategori}
                    onChange={this.handleChange('idCategori')}
                  >
                    <MenuItem value={3}>Staff</MenuItem>
                    <MenuItem value={4}>Member</MenuItem>
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
              <p style={{ margin: 0 }}>berlaku untuk member yang bergabung dari periode</p>
              <TextField
                id="periodeAwal"
                value={this.state.periodeAwal}
                onChange={this.handleChange('periodeAwal')}
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
              <p style={{ margin: '0px 10px' }}>s/d</p>
              <TextField
                id="periodeAkhir"
                value={this.state.periodeAkhir}
                onChange={this.handleChange('periodeAkhir')}
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
            <Button variant="outlined" style={{ marginRight: 10 }}>
              batal
            </Button>
            <Button variant="outlined" style={{ marginRight: 10 }}>
              Simpan & tambah  baru
            </Button>
            <Button variant="contained" style={{ color: 'white', backgroundColor: '#8eb52f' }}>
              Simpan
            </Button>
          </Grid>

        </form>
      </>
    )
  }
}
