import React, { Component } from 'react';
import Cookies from 'js-cookie';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// import Switch from '@material-ui/core/Switch';
import LockIcon from '@material-ui/icons/Lock';
import SearchIcon from '@material-ui/icons/Search';

import CloseIcon from '@material-ui/icons/Close';

import { API } from '../config/API';

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
    }
  }

  componentDidMount() {
    this._isMounted = true
    this._isMounted && this.fetchData()
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
      
      let dataPackageMembership = allPackageMembership.data.data.filter(el => el.tblCategoryMembership.isMembership
      )

      let dataPackagePT = allPackageMembership.data.data.filter(el => !el.tblCategoryMembership.isMembership
      )

      this._isMounted && this.setState({ dataPackageMembership, dataPackagePT })

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

      // if (this.props.roleId === 2) {
      //   let ptSession = await this.state.dataPackagePT.find(el => el.packageMembershipId === this.state.packagePTSelected)
      //   newData.append("roleId", 4)
      //   newData.append("packageMembershipId", this.state.packageMembershipId)
      //   newData.append("activeExpired", this.state.activeExpired)
      //   newData.append("ptSession", ptSession.times)
      // }
      // else 
      newData.append("roleId", 4)



      // if (this.state.roleId === 4) {
        let ptSession = await this.state.dataPackagePT.find(el => el.packageMembershipId === this.state.packagePTSelected)
        newData.append("packageMembershipId", this.state.packageMembershipId)
        newData.append("activeExpired", this.state.activeExpired)
        newData.append("ptSession", ptSession.times)
      // } else {
      //   newData.append("positionId", this.state.positionId)
      //   newData.append("isPermanent", this.state.isPermanent)
      //   newData.append("available", this.state.available)
      // }

      console.log(newData)
      let addAnggota = await API.post('/users/signup', newData, { headers: { token } })

      if (addAnggota) {
        console.log(addAnggota)
        this.props.fetchData()
        this.reset()
        this.props.handleModalDetailAnggota()
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
        open={this.props.open}
        onClose={this.props.handleModalDetailAnggota}
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
            width: 500,
            overflow: 'hidden',
            paddingBottom: 50,
            position: 'relative'
          }}>
            <Typography style={{ fontSize: 30, textAlign: 'center', marginBottom: 20, marginTop: 50 }}>Add member</Typography>
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

                      {
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
          </div>
        </Fade>
      </Modal>
    )
  }
}
