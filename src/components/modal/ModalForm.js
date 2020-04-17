import React, { Component } from 'react';

import { Modal, Backdrop, Fade, Grid, Button } from '@material-ui/core';

export default class ModalForm extends Component {

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

              <Grid style={{ display: 'flex', justifyContent: 'end' }}>
                <Button style={{ backgroundColor: '#d8d8d8', width: 80 }} onClick={this.props.next}>
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
