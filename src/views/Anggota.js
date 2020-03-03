import 'date-fns';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Switch from '@material-ui/core/Switch';
import LockIcon from '@material-ui/icons/Lock';
import SearchIcon from '@material-ui/icons/Search';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';

import { API } from '../config/API';
import { Typography } from '@material-ui/core';

import CardAnggota from '../components/CardAnggota';
import ModalDetailAnggota from '../components/ModalDetailAnggota';
import ModalImportAnggota from '../components/ModalImportAnggota';

import orderBy from 'lodash/orderBy';

const invertDirection = {
  asc: "desc",
  desc: "asc"
}

class Anggota extends Component {
  state = {
    activeStep: 0,
    steps: ['Biodata', 'Data lanjutan'],
    username: "",
    password: "",
    fullname: "",
    nickname: "",
    noKtp: "",
    dateOfBirth: new Date(),
    email: "",
    phone: "",
    gender: "",
    igAccount: "",
    roleId: "",
    haveWhatsapp: false,
    positionId: "",
    isPermanent: "",
    available: false,
    ptSession: "",
    activeExpired: new Date(),
    packageMembershipId: "",
    packagePTSelected: "",
    searchingUser: "",

    dataPackageMembership: [],
    dataPackagePT: [],
    dataAnggota: [],
    dataAnggotaSearch: [],

    page: 0,
    rowsPerPage: 5,

    openModalDetailAnggota: false,
    dataUserSelected: {},
    openModalImportAnggota: false,

    columnToSort: "",
    sortDirection: "desc",
    nextRegister: false
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.fullname !== this.state.fullname || prevState.nickname !== this.state.nickname || prevState.activeExpired !== this.state.activeExpired || prevState.gender !== this.state.gender || prevState.noKtp !== this.state.noKtp || prevState.email !== this.state.email || prevState.phone !== this.state.phone) {

      if (this.state.fullname !== "" && this.state.nickname !== "" && this.state.activeExpired !== new Date() && this.state.gender !== "" && this.state.noKtp !== "" && this.state.email !== "" && this.state.phone !== "") {
        if (!this.state.nextRegister) {
          this.setState({ nextRegister: true })
        }
      } else {
        this.setState({ nextRegister: false })
      }
    }
  }

  fetchData = async () => {
    try {
      let token = Cookies.get('MEGAFIT_TKN')
      let allPackageMembership = await API.get('package-memberships', { headers: { token } })

      let dataPackageMembership = allPackageMembership.data.data.filter(el => el.categoryMembershipId !== 1
      )

      let dataPackagePT = allPackageMembership.data.data.filter(el => el.categoryMembershipId === 2
      )

      let anggota = await API.get('/users', { headers: { token } })

      this.setState({ dataPackageMembership, dataPackagePT, dataAnggotaSearch: anggota.data.data, dataAnggota: anggota.data.data })

    } catch (Error) {
      alert("Server error")
      console.log(Error)
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleDateChange = name => date => {
    this.setState({ [name]: date })
  };

  handleChangeExpired = () => async event => {
    let checkDate = await this.state.dataPackageMembership.find(el => el.packageMembershipId === event.target.value)

    this.setState({ packageMembershipId: event.target.value, activeExpired: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + checkDate.times) })
  };

  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 })
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 })
  };

  submit = async event => {
    event.preventDefault()
    try {
      let token = Cookies.get('MEGAFIT_TKN')
      let newData = new FormData()

      newData.append("fullname", this.state.fullname)
      newData.append("nickname", this.state.nickname)
      newData.append("noKtp", this.state.noKtp)
      newData.append("dateOfBirth", this.state.dateOfBirth)
      newData.append("email", this.state.email)
      newData.append("gender", this.state.gender)
      newData.append("phone", this.state.phone)
      newData.append("haveWhatsapp", this.state.haveWhatsapp)
      newData.append("username", this.state.username)
      newData.append("password", this.state.password)
      newData.append("igAccount", this.state.igAccount)

      if (this.props.roleId === 2) {
        let ptSession = await this.state.dataPackagePT.find(el => el.packageMembershipId === this.state.packagePTSelected)
        newData.append("roleId", 4)
        newData.append("packageMembershipId", this.state.packageMembershipId)
        newData.append("activeExpired", this.state.activeExpired)
        newData.append("ptSession", ptSession.times)
      }
      else newData.append("roleId", this.state.roleId)



      if (this.state.roleId === 4) {
        let ptSession = await this.state.dataPackagePT.find(el => el.packageMembershipId === this.state.packagePTSelected)
        newData.append("packageMembershipId", this.state.packageMembershipId)
        newData.append("activeExpired", this.state.activeExpired)
        newData.append("ptSession", ptSession.times)
      } else {
        newData.append("positionId", this.state.positionId)
        newData.append("isPermanent", this.state.isPermanent)
        newData.append("available", this.state.available)
      }

      console.log(newData)
      let addAnggota = await API.post('/users/signup', newData, { headers: { token } })

      if (addAnggota) {
        this.fetchData()
        this.reset()
      }

    } catch (Error) {
      alert("Server error")
      console.log(Error)
    }
  }

  reset() {
    this.setState({
      activeStep: 0,
      username: "",
      password: "",
      fullname: "",
      nickname: "",
      noKtp: "",
      dateOfBirth: new Date(),
      email: "",
      phone: "",
      gender: "",
      igAccount: "",
      roleId: "",
      haveWhatsapp: false,
      positionId: "",
      isPermanent: "",
      available: false,
      ptSession: "",
      packageMembershipId: "",
      packagePTSelected: "",
    })
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

  searchMember = async event => {
    event.preventDefault()
    let newUserCheckin = await this.state.dataAnggota.filter(el => el.nickname.toLowerCase().match(new RegExp(this.state.searchingUser.toLowerCase())))
    this.setState({ dataAnggotaSearch: newUserCheckin })
    if (this.state.searchingUser === "") {
      this.setState({ dataAnggotaSearch: this.state.data })
    }
  }

  handleOpenModalDetailAnggota = args => {
    this.setState({ openModalDetailAnggota: true, dataUserSelected: args });
  };

  handleCloseModalDetailAnggota = () => {
    this.setState({ openModalDetailAnggota: false, dataUserSelected: {} });
  };

  handleOpenModalImportAnggota = () => {
    this.setState({ openModalImportAnggota: true });
  };

  handleCloseModalImportAnggota = () => {
    this.setState({ openModalImportAnggota: false });
  };

  handleSort = columnName => {
    this.setState(state => ({
      columnToSort: columnName,
      sortDirection: state.columnToSort === columnName
        ? invertDirection[state.sortDirection]
        : 'asc'
    }))
  }

  render() {
    return (
      <Grid style={{ display: 'flex' }}>
        <Paper style={{ padding: 30, backgroundColor: 'white', height: '100%' }}>
          <Typography style={{ fontSize: 30, textAlign: 'center', marginBottom: 20, marginTop: 50 }}>Add member/staff</Typography>
          <Stepper activeStep={this.state.activeStep} alternativeLabel style={{ paddingBottom: 5 }}>
            {this.state.steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            <form autoComplete="off" onSubmit={this.submit} style={{ display: 'flex', flexDirection: 'column', width: 350, margin: '30px auto', marginTop: 0 }}>
              {
                this.state.activeStep === 0
                  ? <>
                    <TextField
                      id="fullname"
                      label="Fullname"
                      value={this.state.fullname}
                      onChange={this.handleChange('fullname')}
                      margin="normal"
                      variant="outlined"
                      style={{ marginBottom: 15 }}
                      disabled={this.state.proses}
                    />
                    <TextField
                      id="nickname"
                      label="Nickname"
                      value={this.state.nickname}
                      onChange={this.handleChange('nickname')}
                      margin="normal"
                      variant="outlined"
                      style={{ marginBottom: 15 }}
                      disabled={this.state.proses}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="tnaggalLahir"
                        label="Tanggal Lahir"
                        value={this.state.dateOfBirth}
                        onChange={this.handleDateChange('dateOfBirth')}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        style={{ marginBottom: 20 }}
                      />
                    </MuiPickersUtilsProvider>
                    <FormControl component="fieldset" >
                      <FormLabel component="legend">Gender</FormLabel>
                      <RadioGroup aria-label="gender" name="gender" value={this.state.gender} onChange={this.handleChange("gender")}>
                        <FormControlLabel
                          value="female"
                          control={<Radio color="primary" />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio color="primary" />}
                          label="Male"
                        />
                      </RadioGroup>
                    </FormControl>
                    <TextField
                      id="noKtp"
                      type="number"
                      label="No KTP"
                      value={this.state.noKtp}
                      onChange={this.handleChange('noKtp')}
                      margin="normal"
                      variant="outlined"
                      style={{ marginBottom: 15 }}
                      disabled={this.state.proses}
                    />
                    <TextField
                      id="email"
                      label="Email"
                      type="email"
                      value={this.state.email}
                      onChange={this.handleChange('email')}
                      margin="normal"
                      variant="outlined"
                      style={{ marginBottom: 15 }}
                      disabled={this.state.proses}
                    />
                    <TextField
                      id="phone"
                      type="number"
                      label="Phone"
                      value={this.state.phone}
                      onChange={this.handleChange('phone')}
                      margin="normal"
                      variant="outlined"
                      disabled={this.state.proses}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.haveWhatsapp}
                          onChange={this.handleChangeChecked('haveWhatsapp')}
                          value="haveWhatsapp"
                          color="primary"
                        />
                      }
                      label="Have whatsapp"
                      style={{ marginTop: -10, marginBottom: 15 }}
                    />
                  </>
                  : <>
                    <TextField
                      id="username"
                      label="Username"
                      value={this.state.username}
                      onChange={this.handleChange('username')}
                      margin="normal"
                      variant="outlined"
                      style={{ marginBottom: 15 }}
                      disabled={this.state.proses}
                    />
                    <TextField
                      id="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={this.state.password}
                      onChange={this.handleChange('password')}
                      InputProps={{
                        endAdornment: <InputAdornment position="end"><LockIcon /></InputAdornment>,
                      }}
                      disabled={this.state.proses}
                    />
                    <TextField
                      id="igAccount"
                      label="ig Account"
                      value={this.state.igAccount}
                      onChange={this.handleChange('igAccount')}
                      margin="normal"
                      variant="outlined"
                      style={{ marginBottom: 15 }}
                      disabled={this.state.proses}
                    />
                    {
                      this.props.roleId !== 2 && <FormControl style={{ marginBottom: 15 }} >
                        <InputLabel id="role">Role</InputLabel>
                        <Select
                          labelId="role"
                          id="role"
                          value={this.state.roleId}
                          onChange={this.handleChange('roleId')}
                        >
                          <MenuItem value={3}>Staff</MenuItem>
                          <MenuItem value={4}>Member</MenuItem>
                        </Select>
                      </FormControl>
                    }


                    {
                      this.state.roleId === 4
                        ? this.state.roleId !== "" && <> {/* MEMBER */}
                          <FormControl style={{ marginBottom: 15 }}>
                            <InputLabel id="packageMembership">Paket langganan</InputLabel>
                            <Select
                              labelId="packageMembership"
                              id="packageMembership"
                              value={this.state.packageMembershipId}
                              onChange={this.handleChangeExpired('packageMembershipId')}
                            >
                              {
                                this.state.dataPackageMembership.map(el =>
                                  <MenuItem value={el.packageMembershipId} key={el.packageMembershipId}>{el.package}</MenuItem>
                                )
                              }
                            </Select>
                          </FormControl>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              id="tanggalExpired"
                              label="Tanggal Expired"
                              value={this.state.activeExpired}
                              onChange={this.handleDateChange('activeExpired')}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                              style={{ marginBottom: 20 }}
                            />
                          </MuiPickersUtilsProvider>
                          <FormControl style={{ marginBottom: 15 }}>
                            <InputLabel id="packageMembership">Paket PT</InputLabel>
                            <Select
                              labelId="packageMembership"
                              id="packageMembership"
                              value={this.state.packagePTSelected}
                              onChange={this.handleChange('packagePTSelected')}
                            >
                              {
                                this.state.dataPackagePT.map(el =>
                                  <MenuItem value={el.packageMembershipId} key={el.packageMembershipId}>{el.package}</MenuItem>
                                )
                              }
                            </Select>
                          </FormControl>
                        </>
                        : this.state.roleId !== "" && <> {/* STAFF */}
                          <FormControl style={{ marginBottom: 15 }}>
                            <InputLabel id="position">Posisi</InputLabel>
                            <Select
                              labelId="position"
                              id="position"
                              value={this.state.positionId}
                              onChange={this.handleChange('positionId')}
                            >
                              <MenuItem value={2}>Costumer service</MenuItem>
                              <MenuItem value={3}>PT</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">Jam masuk</FormLabel>
                            <RadioGroup aria-label="permanent" name="permanent" value={this.state.isPermanent} onChange={this.handleChange("isPermanent")}>
                              <FormControlLabel
                                value="1"
                                control={<Radio color="primary" />}
                                label="Tetap"

                              />
                              <FormControlLabel
                                value="0"
                                control={<Radio color="primary" />}
                                label="Shift"

                              />
                            </RadioGroup>
                          </FormControl>
                          <FormControlLabel
                            value="available"
                            control={<Switch
                              checked={this.state.available}
                              onChange={this.handleChangeChecked('available')}
                              color="primary" />}
                            label="Aktifkan akun"
                            style={{ textAlign: 'left' }}
                          />
                        </>
                    }

                    {
                      this.props.roleId === 2 && <> {/* MEMBER */}
                        <FormControl style={{ marginBottom: 15 }}>
                          <InputLabel id="packageMembership">Paket langganan</InputLabel>
                          <Select
                            labelId="packageMembership"
                            id="packageMembership"
                            value={this.state.packageMembershipId}
                            onChange={this.handleChangeExpired('packageMembershipId')}
                          >
                            {
                              this.state.dataPackageMembership.map(el =>
                                <MenuItem value={el.packageMembershipId} key={el.packageMembershipId}>{el.package}</MenuItem>
                              )
                            }
                          </Select>
                        </FormControl>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="tanggalExpired"
                            label="Tanggal Expired"
                            value={this.state.activeExpired}
                            onChange={this.handleDateChange('activeExpired')}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            style={{ marginBottom: 20 }}
                          />
                        </MuiPickersUtilsProvider>
                        <FormControl style={{ marginBottom: 15 }}>
                          <InputLabel id="packageMembership">Paket PT</InputLabel>
                          <Select
                            labelId="packageMembership"
                            id="packageMembership"
                            value={this.state.packagePTSelected}
                            onChange={this.handleChange('packagePTSelected')}
                          >
                            {
                              this.state.dataPackagePT.map(el =>
                                <MenuItem value={el.packageMembershipId} key={el.packageMembershipId}>{el.package}</MenuItem>
                              )
                            }
                          </Select>
                        </FormControl>
                      </>
                    }

                  </>
              }
              <div style={{ alignSelf: 'flex-end', marginTop: 20 }}>
                <Button
                  disabled={this.state.activeStep === 0}
                  onClick={this.handleBack}
                  style={{ marginRight: 10 }}
                >
                  Back
              </Button>
                {
                  this.state.activeStep === this.state.steps.length - 1
                    ? <Button variant="contained" color="primary" onClick={this.submit}>
                      Send
                  </Button>
                    : this.state.nextRegister
                      ?
                      <Button variant="contained" color="primary" onClick={this.handleNext}>
                        Next
                      </Button>
                      : <Button variant="contained" disabled>
                        Next
                      </Button>
                }
              </div>
            </form>
          </div>
        </Paper>
        <Grid style={{ padding: 30, width: '100%' }}>
          <Paper style={{ width: '95%', padding: 20 }}>
            <Typography style={{ fontSize: 30, textAlign: 'center', marginBottom: 20, marginTop: 30 }}>Daftar member/staf</Typography>
            <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Paper component="form" style={{
                padding: '0px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '50%',
                borderRadius: 30,
                backgroundColor: '#e8f0d5',
                marginBottom: 15
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
                />
                <IconButton type="submit" style={{ padding: 5, color: '#77942f' }} aria-label="search" onClick={this.searchMember}>
                  <SearchIcon />
                </IconButton>
              </Paper>
              <Button
                variant="contained"
                color="default"
                startIcon={<CloudUploadIcon />}
                onClick={this.handleOpenModalImportAnggota}
                style={{ marginBottom: 15 }}
              >Import anggota
              </Button>
            </Grid>
            <Table>
              <TableHead style={{ backgroundColor: '#f8f8f8' }}>
                <TableRow>
                  <TableCell style={{ marginLeft: 50, width: '40%' }} onClick={() => this.handleSort('nickname')}>
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                      Nama
                      {
                        this.state.columnToSort === 'nickname' ? (this.state.sortDirection === "desc" ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />) : null
                      }
                    </div>
                  </TableCell>
                  <TableCell style={{ width: '30%' }} align="center" onClick={() => this.handleSort('email')}>
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                      Email
                      {
                        this.state.columnToSort === 'email' ? (this.state.sortDirection === "desc" ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />) : null
                      }
                    </div>
                  </TableCell>
                  <TableCell style={{ width: '30%' }} align="center" onClick={() => this.handleSort('roleId')}>
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                      Role
                        {
                        this.state.columnToSort === 'roleId' ? (this.state.sortDirection === "desc" ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />) : null
                      }
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  orderBy(this.state.dataAnggotaSearch, this.state.columnToSort, this.state.sortDirection).slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((el, index) => (
                    <CardAnggota data={el} key={index} detailAnggota={this.handleOpenModalDetailAnggota} />
                  ))
                }
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={this.state.dataAnggotaSearch.length}
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
          </Paper>
        </Grid>

        <ModalDetailAnggota open={this.state.openModalDetailAnggota} data={this.state.dataUserSelected} handleCloseModalDetailAnggota={this.handleCloseModalDetailAnggota} />

        <ModalImportAnggota open={this.state.openModalImportAnggota} data={this.state.dataUserSelected} handleCloseModalImportAnggota={this.handleCloseModalImportAnggota} fetchDataAnggota={this.fetchData} />

      </Grid >
    )
  }
}

const mapStateToProps = ({ roleId }) => {
  return {
    roleId
  }
}

export default connect(mapStateToProps)(Anggota)
