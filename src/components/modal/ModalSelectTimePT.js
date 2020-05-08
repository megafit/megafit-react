import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { Modal, Backdrop, Fade, Grid, Button, Typography, Select, MenuItem } from '@material-ui/core';

import { fetchDataMyJoinedClassPt } from '../../store/action';

import { API } from '../../config/API';

import swal from 'sweetalert';

class ModalSelectTimePT extends Component {
  state = {
    date: '',
    time: '',
    optionClass: [],
    classPt: []
  }

  async componentDidMount() {
    try {
      let token = Cookies.get('MEGAFIT_TKN');
      let getData = await API.get(`/class-pts?all=true&date=${this.getDate()}&hour=${new Date().getHours()}`, { headers: { token } })

      let data = [], tempDate = 0, tempData = []
      if (getData.data.data.length > 0) {
        await getData.data.data.forEach(classPt => {
          if (tempDate !== classPt.date) {
            if (tempDate !== 0) {
              data.push(tempData)
              tempData = []
            }
            tempDate = classPt.date
          }
          tempData.push(classPt)
        })
        data.push(tempData)
      }

      this.setState({
        classPt: data
      })
    } catch (err) {
      swal("please refresh this page")
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.date !== this.state.date) {
      this.setState({
        optionClass: this.state.classPt[this.state.date]
      })
    }
  }

  submit = async () => {
    try {
      let token = Cookies.get('MEGAFIT_TKN');

      await API.put(`/class-pts/join/${this.state.time}`, {}, { headers: { token } })
      swal("Join class pt success", "", "success")
      this.props.jadwalkan()
      await this.props.fetchDataMyJoinedClassPt(this.getDate())
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
    function getDate(args) {
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
      const day = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]

      return `${day[args.getDay()]} ${args.getDate()} ${months[args.getMonth()]}`
    }

    function getTime(args) {
      let time1 = args.slice(0, 5)
      let time2 = args.slice(0, 2)

      if (Number(time2) + 1 < 10) time2 = `0${Number(time2) + 1}:00`
      else time2 = `${Number(time2) + 1}:00`

      return `${time1} - ${time2}`
    }

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
                <Grid item style={{ width: 220 }}>
                  <p style={{ margin: 0 }}>tanggal tersedia</p>
                  <Select
                    labelId="role"
                    id="role"
                    value={this.state.date}
                    onChange={this.handleChange('date')}
                    style={{ width: 200 }}
                    disabled={this.state.classPt.length === 0}
                  >
                    {
                      this.state.classPt.length > 0 && this.state.classPt.map((classPtDay, index) =>
                        <MenuItem value={index} key={index}>{getDate(new Date(classPtDay[0].year, Number(classPtDay[0].month) - 1, classPtDay[0].date))}</MenuItem>
                      )
                    }
                  </Select>
                </Grid>
                <Grid item style={{ width: 220 }}>
                  <p style={{ margin: 0 }}>jam tersedia</p>
                  <Select
                    labelId="role"
                    id="role"
                    value={this.state.time}
                    onChange={this.handleChange('time')}
                    style={{ width: 200 }}
                    disabled={this.state.date === ''}
                  >
                    {
                      this.state.optionClass.map((el, index) =>
                        <MenuItem value={el.classPtId} key={'key' + index}>{getTime(el.time)}</MenuItem>
                      )
                    }
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
                <Button style={{ backgroundColor: '#d8d8d8', width: 130 }} onClick={this.submit}>
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

const mapDispatchToProps = {
  fetchDataMyJoinedClassPt
}

export default connect(null, mapDispatchToProps)(ModalSelectTimePT)