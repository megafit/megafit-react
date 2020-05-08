import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { Modal, Backdrop, Fade, Grid, Button, Typography, IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import { API } from '../../config/API';

import swal from 'sweetalert';

import { fetchDataMyJoinedClassPt } from '../../store/action';

class ModalStartPTSession extends Component {
  state = {
    date: '',
    time: '',
    canCancel: true
  }

  componentDidMount() {
    console.log(this.props.data)
    if (this.props.data.tblClassPt.date > new Date().getDate()) {
      this.setState({
        canCancel: false
      })
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  cancel = async () => {
    try {
      let token = Cookies.get('MEGAFIT_TKN');
      await API.put(`/class-pts/cancelJoin/${this.props.data.id}`, {}, { headers: { token } })
      await this.props.fetchDataMyJoinedClassPt(this.getDate())

      swal("Batal gabung kelas pt sukses", "", "success")
      this.props.close()
    } catch (err) {
      swal("please try again")
    }
  }

  submit = () => {
    window.open(this.props.data.tblClassPt.linkZoom)
    this.props.close()
  }

  getDate = () => {
    let date = new Date().getDate()
    let month = new Date().getMonth() + 1
    let year = new Date().getFullYear()

    if (date < 10) date = `0${date}`
    if (month < 10) month = `0${month}`

    return `${year}-${month}-${date}`
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
                  <Button style={{ width: 130, marginRight: 20 }} onClick={this.props.close}>
                    Cancel
                </Button>
                  <Button style={{ width: 130, marginRight: 20 }} color="secondary" variant="contained" onClick={this.cancel} disabled={this.state.canCancel}>
                    Batal
                  </Button>
                  <Button style={{ backgroundColor: '#8cb32e', width: 130, color: 'white' }} onClick={this.submit}>
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

const mapDispatchToProps = {
  fetchDataMyJoinedClassPt
}

export default connect(null, mapDispatchToProps)(ModalStartPTSession)