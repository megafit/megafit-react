import React, { Component } from 'react';
import Cookies from 'js-cookie';

import {
  Modal, Backdrop, Fade, TextField, Button, Checkbox, FormControlLabel, IconButton
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import swal from 'sweetalert';

import { API } from '../../config/API';

export default class ModalCheckin extends Component {
  state = {
    open: false,
    lockerKey: '',
    lupaKembalikanKunci: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.open !== this.props.open) {
      this.setState({ open: this.props.open })
    }
  }

  componentWillUnmount() {
    this.props.handleClose()
  }

  checkinMember = async event => {
    event.preventDefault()
    if (this.props.titleModal === "Checkin") {
      if ((this.state.lockerKey && (this.state.lockerKey > 999)) || !this.state.lockerKey) {
        try {
          let token = Cookies.get('MEGAFIT_TKN')
          let data = {
            userId: this.props.dataUser.userId,
            lockerKey: this.state.lockerKey,
          }
          let checkin = await API.post('/checkin-checkout', data, { headers: { token } })

          if (checkin) {
            this.props.fetchDataCheckin()
            this.setState({ lockerKey: "", open: false, dataUser: {}, searchUserId: "" })
            this.props.handleClose()
          }
        } catch (Error) {
          swal("Please try again")
        }
      }
    } else if (this.props.titleModal === "Checkout") {
      this.checkoutMember()
    } else {
      this.kembalikanKunciLoker()
    }
  }

  checkoutMember = async () => {
    let hasCheckin, checkout
    try {
      let token = Cookies.get('MEGAFIT_TKN')
      let data = {
        lockerKey: !this.state.lupaKembalikanKunci,
      }

      if (this.props.dataCheckSelected) { //checkout dari table checkin
        checkout = await API.put(`/checkin-checkout/${this.props.dataCheckSelected.checkId}`, data, { headers: { token } })

        if (checkout) {
          this.props.fetchDataCheckin()
          this.setState({ lockerKey: "", open: false })
          this.props.handleClose()
        }

      } else { //checkout dari searchbox
        hasCheckin = await this.props.data.find(el => el.userId === this.props.dataUser.userId)

        checkout = await API.put(`/checkin-checkout/${hasCheckin.checkId}`, data, { headers: { token } })

        if (checkout) {
          this.props.fetchDataCheckin()
          this.setState({ lockerKey: "", open: false })
          this.props.handleClose()
        }
      }
    } catch (Error) {
      swal("Please try again")
    }
  }

  kembalikanKunciLoker = async () => {
    let checkout
    if (String(this.state.lockerKey) === String(this.props.dataUser.lockerKey)) {
      try {
        let token = Cookies.get('MEGAFIT_TKN')
        let data = {
          lockerKey: 0,
        }
        checkout = await API.put(`/checkin-checkout/${this.props.dataUser.checkId}?lockerKey=true`, data, { headers: { token } })

        if (checkout) {
          this.props.fetchDataUser()
          this.setState({ lockerKey: "", open: false })
          this.props.handleClose()
        }
      } catch (Error) {
        swal("Please try again")
      }
    } else {
      swal("Kunci loker berbeda", "", "error")
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false, lockerKey: "" });
    this.props.handleClose()
  };

  handleChangeChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };

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
        open={this.state.open}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.open}>
          <div style={{
            backgroundColor: 'white',
            boxShadow: 5,
            borderRadius: 20,
            height: 'auto',
            width: 500,
            overflow: 'hidden',
            paddingBottom: 25,
            position: 'relative'
          }}>
            <IconButton aria-label="close" style={{ position: "absolute", top: 10, right: 16, backgroundColor: '#BEBEBE' }} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
            <img src={require('../../asset/background-modal.png')} style={{ alignSelf: 'center' }} height={140} alt="modal-background" >
            </img>
            <form style={{ paddingTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={this.checkinMember}>
              <h1 id="transition-modal-title" style={{ margin: 0 }} >{this.props.titleModal}</h1>
              {
                this.props.titleModal !== "Checkout"
                  ? <TextField
                    id="lockerKey"
                    label="Locker key"
                    value={this.state.lockerKey}
                    onChange={this.handleChange('lockerKey')}
                    margin="normal"
                    variant="outlined"
                    style={{ marginBottom: 40, width: 300 }}
                    disabled={this.state.proses}
                    inputProps={{ maxLength: 4, minLength: 4 }}
                  />
                  : <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.lupaKembalikanKunci}
                        onChange={this.handleChangeChecked('lupaKembalikanKunci')}
                        value="lupaKembalikanKunci"
                        color="primary"
                      />
                    }
                    label="Lupa kembalikan kunci loker"
                    style={{ marginTop: -10, marginBottom: 15 }}
                  />
              }

              <Button variant="contained" style={{ backgroundColor: '#8eb52f', borderRadius: 10, color: 'white', width: '90%' }} onClick={this.checkinMember}>
                Oke
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    )
  }
}
