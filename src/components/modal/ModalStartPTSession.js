import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import {
  Modal, Backdrop, Fade, Grid, Button, Typography, IconButton
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import swal from 'sweetalert';

import { fetchDataMyJoinedClassPt } from '../../store/action';

import { API } from '../../config/API';

class ModalStartPTSession extends Component {
  state = {
    date: '',
    time: '',
    canCancel: false
  }

  componentDidMount() {

    // console.log("bulan depan",(this.props.data.tblClassPt.month > new Date().getMonth() + 1 && this.props.data.tblClassPt.year >= new Date().getFullYear()))

    // console.log("bulan sama tanggal depan", (this.props.data.tblClassPt.date > new Date().getDate() + 1 && this.props.data.tblClassPt.month === new Date().getMonth() + 1 && this.props.data.tblClassPt.year === new Date().getFullYear()))

    // console.log("bulan sama tanggal sama jam depan", (Number(this.props.data.tblClassPt.time.slice(0, 2)) >= new Date().getHours() && this.props.data.tblClassPt.date - 1 === new Date().getDate() && this.props.data.tblClassPt.month === new Date().getMonth() + 1 && this.props.data.tblClassPt.year === new Date().getFullYear()))
    if (
      (this.props.data.tblClassPt.month > new Date().getMonth() + 1 && this.props.data.tblClassPt.year >= new Date().getFullYear()) || 
      (this.props.data.tblClassPt.date > new Date().getDate() + 1 && this.props.data.tblClassPt.month === new Date().getMonth() + 1 && this.props.data.tblClassPt.year === new Date().getFullYear()) ||
      (Number(this.props.data.tblClassPt.time.slice(0, 2)) >= new Date().getHours() && this.props.data.tblClassPt.date - 1 === new Date().getDate() && this.props.data.tblClassPt.month === new Date().getMonth() + 1 && this.props.data.tblClassPt.year === new Date().getFullYear()) // Validation Hour
    ) {
      this.setState({
        canCancel: true
      })
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  cancel = async () => {
    try {
      let token = Cookies.get('MEGAFIT_TKN');
      await API.delete(`/history-pts/${this.props.data.id}`, { headers: { token } })

      swal("Batal gabung kelas pt sukses", "", "success")
      this.props.cancelJoinClass()
      this.props.close()
    } catch (err) {
      swal("please try again")
      console.log(err)
    }
  }

  submit = async () => {
    let url


    try {
      let token = Cookies.get("MEGAFIT_TKN")
      await API.put(`/history-pts/${this.props.data.id}`, { hasJoined: 1 }, { headers: { token } })

      if (this.props.data.tblClassPt.linkZoom.slice(0, 4) === "http") {
        url = this.props.data.tblClassPt.linkZoom
      } else {
        url = "http://" + this.props.data.tblClassPt.linkZoom
      }
      window.open(url, '_blank')
      this.props.close()
    } catch (err) {
      swal("please try again")
    }
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
              height: 360,
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

                <p style={{ margin: '5px 0px', textAlign: 'center', fontWeight: 'bold' }}>Pembatalan kelas PT hanya bisa dilakukan 24 jam sebelum sesi dimulai</p>

                {
                  this.props.data.tblClassPt.linkZoom
                    ? <p style={{ margin: 0, textAlign: 'center', fontStyle: 'italic' }}>pastikan internet kamu lancar</p>
                    : <p style={{ margin: 0, textAlign: 'center', color: 'red', fontStyle: 'italic' }}>link zoom belum tersedia</p>
                }

                <Grid style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                  <Button style={{ width: 130, marginRight: 20 }} onClick={this.props.close}>
                    Cancel
                </Button>
                  <Button style={{ width: 130, marginRight: 20 }} color="secondary" variant="contained" onClick={this.cancel} disabled={!this.state.canCancel}>
                    Batal
                  </Button>
                  <Button style={{ backgroundColor: this.props.data.tblClassPt.linkZoom ? '#8cb32e' : '#e0e0e0', width: 130, color: this.props.data.tblClassPt.linkZoom ? 'white' : '#a8a8a8' }} onClick={this.submit} disabled={!this.props.data.tblClassPt.linkZoom}>
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