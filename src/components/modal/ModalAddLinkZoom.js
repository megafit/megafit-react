import React, { Component } from 'react';

import { Modal, Backdrop, Fade, Grid, Button, Typography, IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
// import { API } from '../config/API';

export default class ModalAddLinkZoom extends Component {
  state = {
    date: '',
    time: ''
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  cancel = () => {
    this.props.close()
  }

  render() {
    return (
      <>
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
                <Typography style={{ fontSize: 25, textAlign: 'center' }}>
                  Klik <b>MULAI</b> untuk memulai sesi atau klik <b>BATAL</b> untuk membatalkan sesi
                </Typography>
                <p style={{ margin: 0, textAlign: 'center', fontStyle: 'italic' }}>pastikan internet kamu lancar</p>

                <Grid style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                  <Button style={{ width: 130, marginRight: 20 }} onClick={this.cancel}>
                    Batal
                </Button>
                  <Button style={{ backgroundColor: '#d8d8d8', width: 130 }} onClick={this.props.jadwalkan}>
                    Mulai
                </Button>
                </Grid>
              </Grid>
            </div>
          </Fade>
        </Modal>


      </>
    )
  }
}
