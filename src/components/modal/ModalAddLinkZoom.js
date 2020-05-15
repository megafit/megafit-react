import React, { Component } from 'react';
import Cookies from 'js-cookie';

import {
  Modal, Backdrop, Fade, Grid, Button, Typography, IconButton, TextField
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import swal from 'sweetalert';

import { API } from '../../config/API';

export default class ModalAddLinkZoom extends Component {
  state = {
    linkZoom: ''
  }

  componentDidMount() {
    this.setState({ linkZoom: this.props.dataClass.linkZoom || '' })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  cancel = () => {
    this.props.close()
  }

  submit = async () => {
    try {
      let token = Cookies.get('MEGAFIT_TKN')
      await API.put(`/class-pts/${this.props.dataClass.classPtId}`, { linkZoom: this.state.linkZoom }, { headers: { token } })
      this.props.fetchNewDataClassPt()
      this.props.close()
      swal("Link zoom berhasil ditambahkan", "", "success")
    } catch (err) {
      swal("please try again")
    }
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
            height: 330,
            width: 600,
            overflow: 'hidden',
            paddingBottom: 50,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <IconButton aria-label="close" style={{ position: "absolute", top: 10, right: 16, backgroundColor: '#d8d8d8' }} onClick={this.props.close}>
              <CloseIcon />
            </IconButton>
            <img src={require('../../asset/background-modal.png')} style={{ alignSelf: 'center', width: '100%' }} height={140} alt="modal-background" >
            </img>

            <Grid style={{ padding: 30, paddingTop: 10 }}>
              <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Masukan link zoom</Typography>
              <TextField
                id="linkZoom"
                label="Link Zoom"
                value={this.state.linkZoom}
                onChange={this.handleChange('linkZoom')}
                margin="normal"
                variant="outlined"
                style={{ marginBottom: 15, width: '100%' }}
                disabled={this.state.proses || this.props.hasPassed}
              />

              <Grid style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                <Button style={{ width: 130, marginRight: 20 }} onClick={this.cancel}>
                  Batal
                </Button>
                <Button style={{ backgroundColor: '#d8d8d8', width: 130 }} onClick={this.submit} disabled={this.props.hasPassed}>
                  Simpan
                </Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    )
  }
}
