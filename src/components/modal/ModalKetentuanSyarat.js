import React, { Component } from 'react';

import { Modal, Backdrop, Fade, Grid, FormControlLabel, Checkbox, Button } from '@material-ui/core';

export default class ModalKetentuanSyarat extends Component {
  state = {
    statusChecked: false
  }

  handleChecked = name => (event) => {
    this.setState({ [name]: event.target.checked });
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
              height: 550,
              width: 600,
              overflow: 'hidden',
              paddingBottom: 50,
              position: 'relative',
              padding: 30
            }}>
              <Grid style={{ overflow: 'scroll', height: 420, border: '0.3px solid black', paddingLeft: 10 }}>
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
                asdasdasd
            </Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.statusChecked}
                    onChange={this.handleChecked('statusChecked')}
                    name="statusChecked"
                    color="primary"
                  />
                }
                label="saya sudah baca & setuju terhadap semua syarat & ketentuan"
              />
              <Grid style={{ display: 'flex', justifyContent: 'end' }}>
                <Button style={{ backgroundColor: '#d8d8d8', width: 80 }} disabled={!this.state.statusChecked} onClick={this.props.next}>
                  Lanjut
                </Button>
              </Grid>
            </div>
          </Fade>
        </Modal>
      </>
    )
  }
}
