import React, { Component } from 'react';
import Cookies from 'js-cookie';

import {
  Modal, Grid, Backdrop, Fade, Typography, TextField, Radio, Button, RadioGroup, FormControl, FormLabel, InputLabel, MenuItem, Select, Checkbox, FormControlLabel, InputAdornment, Stepper, Step, StepLabel
} from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import LockIcon from '@material-ui/icons/Lock';

import swal from 'sweetalert';

import { API } from '../../config/API';

export default class ModalCreateEditUser extends Component {
  constructor(props) {
    super(props)
    this._isMounted = false
    this.state = {
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
      rowsPerPage: 10,

      openModalDetailAnggota: false,
      dataUserSelected: {},
      openModalImportAnggota: false,

      nextRegister: false,
      statusEdit: false
    }
  }

  componentDidMount() {
    this._isMounted = true
    this._isMounted && this.fetchData()

    if (this.props.data) {
      this.setState({ statusEdit: true })
    }
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

    if (prevState.statusEdit !== this.state.statusEdit) {
      console.log(this.props.data)
      this.setState({
        username: this.props.data.username,
        fullname: this.props.data.fullname,
        nickname: this.props.data.nickname,
        noKtp: this.props.data.noKtp,
        dateOfBirth: new Date(this.props.data.dateOfBirth),
        email: this.props.data.email,
        phone: this.props.data.phone,
        gender: this.props.data.gender,
        igAccount: this.props.data.igAccount,
        haveWhatsapp: this.props.data.haveWhatsapp,
        activeExpired: this.props.data.tblMember.activeExpired,
      })
    }
  }

  fetchData = async () => {
    try {
      let token = Cookies.get('MEGAFIT_TKN')
      let allPackageMembership = await API.get('package-memberships?onlyActive=true', { headers: { token } })

      let dataPackageMembership = allPackageMembership.data.data.filter(el => el.tblSubCategoryMembership.categoryMembershipId === 1
      )

      let dataPackagePT = allPackageMembership.data.data.filter(el => el.tblSubCategoryMembership.categoryMembershipId === 2
      )

      this._isMounted && this.setState({ dataPackageMembership, dataPackagePT })

    } catch (Error) {
      swal("Please try again")
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
      newData.append("igAccount", this.state.igAccount)
      newData.append("activeExpired", this.state.activeExpired)

      newData.append("roleId", 4)

      if (this.state.statusEdit) {
        this.state.password && newData.append("password", this.state.password)
        this.state.packageMembershipId && newData.append("packageMembershipId", this.state.packageMembershipId)
      } else {
        newData.append("password", this.state.password)
        newData.append("packageMembershipId", this.state.packageMembershipId)
      }

      if (this.state.packagePTSelected) {
        let ptSession = await this.state.dataPackagePT.find(el => el.packageMembershipId === this.state.packagePTSelected)
        newData.append("ptSession", ptSession.times)
      }

      if (this.state.statusEdit) {
        await API.post('/users/signup', newData, { headers: { token } })
      } else {
        await API.put(`/users/${this.props.data}`, newData, { headers: { token } })
      }

      this.props.fetchData()
      this.reset()
      this.props.handleModalDetailAnggota()

      swal("Add members successfully", "", "success")
    } catch (Error) {
      swal("Please try again")
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

  render() {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        scroll='paper'
        open={this.props.open}
        onClose={this.props.close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.props.open}>
          <div style={{
            backgroundColor: 'white',
            boxShadow: 5,
            borderRadius: 20,
            height: 'auto',
            width: 900,
            overflow: 'hidden',
            paddingBottom: 50,
            position: 'relative'
          }}>
            {
              this.state.statusEdit
                ? <Typography style={{ fontSize: 30, textAlign: 'center', marginBottom: 20, marginTop: 50 }}>Add member</Typography>
                : <Typography style={{ fontSize: 30, textAlign: 'center', marginBottom: 20, marginTop: 50 }}>Add member</Typography>
            }

            <Stepper activeStep={this.state.activeStep} alternativeLabel style={{ paddingBottom: 5 }}>
              {this.state.steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              <form autoComplete="off" onSubmit={this.submit} style={{ display: 'flex', flexDirection: 'column', width: '80%', margin: '30px auto', marginTop: 0 }}>
                {
                  this.state.activeStep === 0
                    ? <Grid container style={{ display: 'flex' }}>
                      <Grid item md={6} style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
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
                            id="tanggalLahir"
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
                      </Grid>
                      <Grid item md={6} style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
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
                      </Grid>
                    </Grid>
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
                      {/* {
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
                      } */}


                      {/* {
                        this.state.roleId === 4
                          ? this.state.roleId !== "" && <>  MEMBER */}
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
                      {/* //   </>
                      //     : this.state.roleId !== "" && <> STAFF
                      //     <FormControl style={{ marginBottom: 15 }}>
                      //         <InputLabel id="position">Posisi</InputLabel>
                      //         <Select
                      //           labelId="position"
                      //           id="position"
                      //           value={this.state.positionId}
                      //           onChange={this.handleChange('positionId')}
                      //         >
                      //           <MenuItem value={2}>Costumer service</MenuItem>
                      //           <MenuItem value={3}>PT</MenuItem>
                      //         </Select>
                      //       </FormControl>
                      //       <FormControl component="fieldset">
                      //         <FormLabel component="legend">Jam masuk</FormLabel>
                      //         <RadioGroup aria-label="permanent" name="permanent" value={this.state.isPermanent} onChange={this.handleChange("isPermanent")}>
                      //           <FormControlLabel
                      //             value="1"
                      //             control={<Radio color="primary" />}
                      //             label="Tetap"

                      //           />
                      //           <FormControlLabel
                      //             value="0"
                      //             control={<Radio color="primary" />}
                      //             label="Shift"

                      //           />
                      //         </RadioGroup>
                      //       </FormControl>
                      //       <FormControlLabel
                      //         value="available"
                      //         control={<Switch
                      //           checked={this.state.available}
                      //           onChange={this.handleChangeChecked('available')}
                      //           color="primary" />}
                      //         label="Aktifkan akun"
                      //         style={{ textAlign: 'left' }}
                      //       />
                      //     </>
                      // } */}

                      {/* {
                        this.props.roleId === 2 && <> MEMBER
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
                                  <MenuItem value={el.packageMembershipId} key={el.packageMembershipId}> ===- {el.package}</MenuItem>
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
                                  <MenuItem value={el.packageMembershipId} key={el.packageMembershipId}>{el.packageMembershipId} - {el.package}</MenuItem>
                                )
                              }
                            </Select>
                          </FormControl>
                        </>
                      } */}

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
          </div>
        </Fade>
      </Modal>
    )
  }
}
