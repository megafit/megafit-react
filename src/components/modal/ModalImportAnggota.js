import React, { Component } from 'react';
import Cookies from 'js-cookie';

import {
  Modal, Backdrop, Fade, Button, IconButton, LinearProgress
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import swal from 'sweetalert';

import { API } from '../../config/API';

export default class ModalImportAnggota extends Component {
  state = {
    open: false,
    fileSelected: null,
    completed: null
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.open !== this.props.open) {
      this.setState({ open: this.props.open })
      if (this.props.data.tblMember) this.cekMembershipExpired(this.props.data)
      else {
        this.setState({ statusMember: this.props.data.flagActive ? 'Active' : 'Non active' })
      }
    }
  }

  handleFileSelect = e => {
    this.setState({ fileSelected: e.target.files[0] })
  }

  uploadFile = () => {
    let token = Cookies.get('MEGAFIT_TKN')
    let fd = new FormData()

    fd.append("file", this.state.fileSelected)

    API.post('/users/import', fd, {
      headers: { token },
      onUploadProgress: progressEvent => {
        this.setState({ completed: Math.round(progressEvent.loaded / progressEvent.total * 100) })
      }
    })
      .then(data => {
        if (this.state.completed === 100 && data) {
          this.props.close()
          this.props.fetchDataAnggota()
        }
      })
      .catch(Error => {
        swal("Please try again")
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
        open={this.state.open}
        onClose={this.props.close}
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
            position: 'relative',
            textAlign: 'center'
          }}>
            <IconButton aria-label="close" style={{ position: "absolute", top: 10, right: 16, backgroundColor: '#BEBEBE' }} onClick={this.props.close}>
              <CloseIcon />
            </IconButton>
            <img src={require('../../asset/background-modal.png')} style={{ alignSelf: 'center', }} height={140} alt="modal-background" >
            </img>
            {
              this.state.completed && <LinearProgress variant="determinate" value={this.state.completed} />
            }
            <h1 id="transition-modal-title" style={{ textAlign: 'center', marginTop: 0 }} >Import Anggota</h1>

            <input type="file" onChange={e => this.handleFileSelect(e)} />
            <Button variant="contained" style={{ backgroundColor: '#8eb52f', borderRadius: 10, color: 'white', width: '90%', marginTop: 30 }} onClick={this.uploadFile}>
              Send
            </Button>
          </div>
        </Fade>
      </Modal>
    )
  }
}
