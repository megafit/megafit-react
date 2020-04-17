import React, { Component } from 'react';

import { Modal, Backdrop, Fade, Grid, Button, Typography, Select, MenuItem } from '@material-ui/core';

// import { API } from '../config/API';

export default class ModalSelectTimePT extends Component {
  state = {
    date: '',
    time: ''
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

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
              height: 320,
              width: 600,
              overflow: 'hidden',
              paddingBottom: 50,
              position: 'relative',
              padding: 30,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography style={{ fontSize: 25, textAlign: 'center', marginBottom: 30 }}>
                PILIH TANGGAL & JAM ONLINE PT
              </Typography>

              <Grid container style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }} spacing={3}>
                <Grid item style={{ width: 180 }}>
                  <p style={{ margin: 0 }}>tanggal tersedia</p>
                  <Select
                    labelId="role"
                    id="role"
                    value={this.state.date}
                    onChange={this.handleChange('date')}
                    style={{ width: 150 }}
                  >
                    <MenuItem value={1} >Senin 14 April</MenuItem>
                  </Select>
                </Grid>
                <Grid item style={{ width: 180 }}>
                  <p style={{ margin: 0 }}>jam tersedia</p>
                  <Select
                    labelId="role"
                    id="role"
                    value={this.state.time}
                    onChange={this.handleChange('time')}
                    style={{ width: 150 }}
                  >
                    <MenuItem value={1} >06:00 - 07:00</MenuItem>
                    <MenuItem value={2} >09:00 - 10:00</MenuItem>
                  </Select>
                </Grid>
              </Grid>

              <Typography style={{ textAlign: 'center' }}>
                info: Pembatalan hanya dapat dilakaukan 24 jam sebelumnya
              </Typography>
              <Typography style={{ textAlign: 'center' }}>
                Apabila sesi tidak dibatalkan, dianggap tetap terpotong
              </Typography>

              <Grid style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                <Button style={{ backgroundColor: '#d8d8d8', width: 130 }} onClick={this.props.jadwalkan}>
                  Jadwalkan
                </Button>
              </Grid>
            </div>
          </Fade>
        </Modal>


      </>
    )
  }
}
