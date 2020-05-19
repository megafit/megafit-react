import React, { Component } from 'react';

import {
  Modal, Backdrop, Fade, Grid, IconButton
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

export default class ModalDetailAnggota extends Component {
  state = {
    statusMember: "",
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

  cekMembershipExpired = args => {
    let sisaHari = new Date(args.activeExpired) - new Date()
    sisaHari = Math.round(Math.round((new Date(args.tblMember.activeExpired).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)));

    if (sisaHari > 0) {
      this.setState({ statusMember: 'Active' })
    } else if (sisaHari >= -7) {
      this.setState({ statusMember: 'Masa tenggang' })
    } else {
      this.setState({ statusMember: 'Non active' })
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
            borderRadius: 20,
            height: 'auto',
            width: 500,
            overflow: 'hidden',
            paddingBottom: 50,
            position: 'relative'
          }}>
            <IconButton aria-label="close" style={{ position: "absolute", top: 10, right: 16, backgroundColor: '#BEBEBE' }} onClick={this.props.data}>
              <CloseIcon />
            </IconButton>
            <img src={require('../../asset/background-modal.png')} style={{ alignSelf: 'center', width: '100%' }} height={140} alt="modal-background" >
            </img>
            <h1 id="transition-modal-title" style={{ textAlign: 'center', marginTop: 0 }} >Detail Anggota</h1>
            <Grid style={{ marginLeft: 100 }}>
              <Grid style={{ display: 'flex', marginBottom: 10 }}>
                <p style={{ margin: 0, width: 100 }}>Fullname</p>
                <p style={{ margin: 0 }}>: {this.props.data.fullname}</p>
              </Grid>
              <Grid style={{ display: 'flex', marginBottom: 10 }}>
                <p style={{ margin: 0, width: 100 }}>Nickname</p>
                <p style={{ margin: 0 }}>: {this.props.data.nickname}</p>
              </Grid>
              <Grid style={{ display: 'flex', marginBottom: 10 }}>
                <p style={{ margin: 0, width: 100 }}>Date of birth</p>
                <p style={{ margin: 0 }}>: {this.props.data && String(this.props.data.dateOfBirth).slice(0, 10)}</p>
              </Grid>
              <Grid style={{ display: 'flex', marginBottom: 10 }}>
                <p style={{ margin: 0, width: 100 }}>Status</p>
                <p style={{ margin: 0 }}>: {this.state.statusMember}</p>
              </Grid>
              <Grid style={{ display: 'flex', marginBottom: 10 }}>
                <p style={{ margin: 0, width: 100 }}>Role</p>
                <p style={{ margin: 0 }}>: {this.props.data.tblRole && this.props.data.tblRole.role}</p>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    )
  }
}
