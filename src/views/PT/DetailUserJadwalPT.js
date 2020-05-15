import React, { Component } from 'react';
import Cookies from 'js-cookie';

import {
  Grid, Avatar, Chip, Divider, TextField, Button
} from '@material-ui/core';

import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import swal from 'sweetalert';

import { API } from '../../config/API';

export default class DetailUserPT extends Component {
  state = {
    historyPtSelected: null,
    dataMember: null,
    flagActive: true,
    sisaHari: 0,
    openHistoryPt: true,
    dataHistoryPt: [],
    newCatatan: '',
    editCatatan: false,
    nickname: '',
    expiredDate: '',
    lastCatatan: '',
    umur: '',
    tinggiBadan: '',
    beratBadan: '',
    triceps: '',
    dada: '',
    perut: '',
    pinggul: '',
    pinggang: '',
    paha: ''
  }

  async componentDidMount() {
    try {
      let token = await Cookies.get('MEGAFIT_TKN')

      let member = await API.get(`/users/${this.props.location.state.userId}`, { headers: { token } })
      // let listHistory = await API.get(`/history-pts?userId=${this.props.location.state.userId}&hasPassed=true&hour=${new Date().getHours()}&date=${this.getDate()}`, { headers: { token } })
      let listHistory = await API.get(`/history-pts?userId=${this.props.location.state.userId}`, { headers: { token } })
      let historyPtSelected = await listHistory.data.data.find(history => history.id === this.props.location.state.historyPtId)
      let listHistoryPassed = await listHistory.data.data.filter(history => (history.tblClassPt.date < new Date().getDate() && history.tblClassPt.month <= new Date().getMonth() + 1 && history.tblClassPt.year <= new Date().getFullYear()) || (Number(history.tblClassPt.time.slice(0, 2)) < new Date().getHours() && history.tblClassPt.date === new Date().getDate() && history.tblClassPt.month === new Date().getMonth() + 1 && history.tblClassPt.year === new Date().getFullYear()))


      this.setState({
        dataHistoryPt: listHistoryPassed,
        dataMember: member.data.data,
        newCatatan: historyPtSelected.catatan,
        linkZoom: historyPtSelected.tblClassPt.linkZoom,
        nickname: member.data.data.nickname,
        sisaHari: this.cekMembershipExpired(member.data.data.tblMember.activeExpired),
        flagActive: member.data.data.flagActive,
        expiredDate: member.data.data.tblMember.activeExpired,
        umur: member.data.data.tblMember.tblDataSizeMembers[member.data.data.tblMember.tblDataSizeMembers.length - 1].umur,
        tinggiBadan: member.data.data.tblMember.tblDataSizeMembers[member.data.data.tblMember.tblDataSizeMembers.length - 1].height,
        beratBadan: member.data.data.tblMember.tblDataSizeMembers[member.data.data.tblMember.tblDataSizeMembers.length - 1].weight,
        triceps: member.data.data.tblMember.tblDataSizeMembers[member.data.data.tblMember.tblDataSizeMembers.length - 1].triceps,
        dada: member.data.data.tblMember.tblDataSizeMembers[member.data.data.tblMember.tblDataSizeMembers.length - 1].dada,
        perut: member.data.data.tblMember.tblDataSizeMembers[member.data.data.tblMember.tblDataSizeMembers.length - 1].perut,
        pinggul: member.data.data.tblMember.tblDataSizeMembers[member.data.data.tblMember.tblDataSizeMembers.length - 1].pinggul,
        pinggang: member.data.data.tblMember.tblDataSizeMembers[member.data.data.tblMember.tblDataSizeMembers.length - 1].pinggang,
        paha: member.data.data.tblMember.tblDataSizeMembers[member.data.data.tblMember.tblDataSizeMembers.length - 1].paha
      })
    } catch (err) {
      swal("Please try again")
    }
  }

  handleSejarahPT = () => {
    this.setState({
      openHistoryPt: !this.state.openHistoryPt
    })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  submitCatatan = async () => {
    try {
      let token = await Cookies.get("MEGAFIT_TKN")
      await API.put(`/history-pts/${this.props.location.state.historyPtId}`, { catatan: this.state.newCatatan }, { headers: { token } })

      this.handleEditCatatan()
      swal("Tambah catatan berhasil", "", "success")
    } catch (err) {
      swal("please try again")
    }
  }

  handleEditCatatan = () => {
    this.setState({ editCatatan: !this.state.editCatatan })
  }

  cekMembershipExpired = args => {
    let sisaHari = new Date(args) - new Date()
    sisaHari = Math.round(Math.round((new Date(args).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)));

    return sisaHari
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
    function formatDate(args) {
      let newDate = new Date(args)
      let date = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()
      let month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1

      return `${date}/${month}/${newDate.getFullYear()}`
    }

    return (
      <Grid container style={{ display: 'flex', height: '100%' }}>
        <Grid item style={{ backgroundColor: '#F0F0F0', minWidth: 250, paddingTop: 50 }} xs={2}>

          <Avatar alt="icon" src={require('../../asset/icon_user.png')} style={{ height: 150, width: 150, margin: '0px auto', }} />

          {
            this.state.flagActive
              ? <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
                <CheckCircleOutlinedIcon style={{ color: '#8EB52F' }} />
                <p style={{ margin: 0, marginLeft: 5 }}>active member</p>
              </Grid>
              : this.state.sisaHari <= -7
                ? <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
                  <CancelOutlinedIcon style={{ color: '#bf0000' }} />
                  <p style={{ margin: 0, marginLeft: 5 }}>nonactive member</p>
                </Grid>
                : <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
                  <Chip
                    label="masa tenggang"
                    color="secondary"
                  />
                </Grid>
          }

          <p style={{ margin: 0, fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{this.state.nickname}</p>

          <Grid style={{ display: 'flex', justifyContent: 'center' }}>
            <p style={{ margin: 0, }}>aktif s/d</p>
            {
              this.state.expiredDate && <p style={{ margin: '0px 0px 0px 5px', fontWeight: 'bold' }}>{formatDate(this.state.expiredDate)}</p>
            }
          </Grid>

          <Grid style={{ padding: '15px 20px 5px 20px' }}>
            <Grid style={{ display: 'flex', marginBottom: 5 }}>
              <p style={{ margin: 0, width: 100 }}>Umur</p>
              <p style={{ margin: 0 }}>{this.state.umur} Tahun</p>
            </Grid>
            <Grid style={{ display: 'flex', marginBottom: 5 }}>
              <p style={{ margin: 0, width: 100 }}>Tinggi Badan</p>
              <p style={{ margin: 0 }}>{this.state.tinggiBadan} cm</p>
            </Grid>
            <Grid style={{ display: 'flex', marginBottom: 10 }}>
              <p style={{ margin: 0, width: 100 }}>Berat Badan</p>
              <p style={{ margin: 0 }}>{this.state.beratBadan} kg</p>
            </Grid>
            <p style={{ margin: '10px 0 5px 0', fontWeight: 'bold' }}>Ukuran</p>
            <Grid style={{ display: 'flex', marginBottom: 5 }}>
              <p style={{ margin: 0, width: 100 }}>Triceps</p>
              <p style={{ margin: 0 }}>{this.state.triceps} cm</p>
            </Grid>
            <Grid style={{ display: 'flex', marginBottom: 5 }}>
              <p style={{ margin: 0, width: 100 }}>dada</p>
              <p style={{ margin: 0 }}>{this.state.dada} cm</p>
            </Grid>
            <Grid style={{ display: 'flex', marginBottom: 5 }}>
              <p style={{ margin: 0, width: 100 }}>perut</p>
              <p style={{ margin: 0 }}>{this.state.perut} cm</p>
            </Grid>
            <Grid style={{ display: 'flex', marginBottom: 5 }}>
              <p style={{ margin: 0, width: 100 }}>pinggul</p>
              <p style={{ margin: 0 }}>{this.state.pinggul} cm</p>
            </Grid>
            <Grid style={{ display: 'flex', marginBottom: 5 }}>
              <p style={{ margin: 0, width: 100 }}>pinggang</p>
              <p style={{ margin: 0 }}>{this.state.pinggang} cm</p>
            </Grid>
            <Grid style={{ display: 'flex' }}>
              <p style={{ margin: 0, width: 100 }}>paha</p>
              <p style={{ margin: 0 }}>{this.state.paha} cm</p>
            </Grid>
          </Grid>

          <Grid style={{ padding: 10, margin: '5px 20px 20px 20px', border: '1px solid black' }}>
            {this.state.dataHistoryPt.length > 0 && (this.state.dataHistoryPt[this.state.dataHistoryPt.length - 1].catatan ? this.state.dataHistoryPt[this.state.dataHistoryPt.length - 1].catatan : "Tidak ada catatan di sesi PT terakhir")}
          </Grid>

          <Divider style={{ marginTop: 15 }} />
          <Grid style={{ padding: '10px 20px', minHeight: 250 }}>
            <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ margin: 0 }}>Sejarah PT</p>
              <ArrowDropDownIcon onClick={this.handleSejarahPT} />
            </Grid>
            {
              this.state.openHistoryPt && <Grid style={{ overflow: 'scroll', maxHeight: 200 }}>
                {
                  this.state.dataHistoryPt.map((history, index) =>
                    <Grid key={index}>
                      <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
                        <Grid item sm={5}>
                          <p style={{ margin: 0 }}>{history.tblClassPt.date > 10 ? history.tblClassPt.date : `0${history.tblClassPt.date}`}-{history.tblClassPt.month > 10 ? history.tblClassPt.month : `0${history.tblClassPt.month}`}-{history.tblClassPt.year}</p>
                          <p style={{ margin: 0 }}>{history.tblClassPt.tblUser.nickname}</p>
                        </Grid>
                        <Grid item sm={7}>
                          <p style={{ margin: 0 }}>{history.catatan ? history.catatan : "-"}</p>
                        </Grid>
                      </Grid>
                      <Divider />
                    </Grid>
                  )
                }
              </Grid>
            }
          </Grid>
        </Grid>

        <Grid item style={{ padding: '40px 30px' }}>
          <p style={{ margin: '0px 0px 20px 0px', fontSize: 18, cursor: 'pointer' }} onClick={() => this.props.history.push('/pt')}>{`< Jadwal`}</p>
          <Grid style={{ width: 600, border: '1px solid black', padding: '20px 25px' }}>
            <Grid style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
              <Avatar alt="icon" src={require('../../asset/icon_user.png')} style={{ height: 50, width: 50, marginRight: 15 }} />
              <p style={{ margin: 0 }}>{this.state.nickname}</p>
            </Grid>

            <Grid style={{ border: '1px solid black', padding: 10, marginBottom: 10 }}>
              {
                this.state.linkZoom
                  ? <a target="_blank" rel="noopener noreferrer" href={this.state.linkZoom} style={{ margin: 0 }}>Link Zoom</a>
                  : <p style={{ margin: 0 }}>Link Zoom not available</p>
              }
            </Grid>

            <p style={{ margin: '0px 0px 5px 0px' }}>Catatan</p>
            {
              this.state.editCatatan
                ? <>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={this.state.newCatatan}
                    onChange={this.handleChange('newCatatan')}
                    style={{ width: '100%', marginBottom: 20 }}
                  />
                  <Grid>
                    <Button style={{ width: 80, marginRight: 20 }} onClick={this.handleEditCatatan}>
                      Cancel
                    </Button>
                    <Button style={{ backgroundColor: '#8eb52f', color: 'white', width: 80 }} onClick={this.submitCatatan}>
                      Save
                    </Button>
                  </Grid>
                </>
                : <>
                  <Grid style={{ width: "100%", border: '1px solid black', padding: 10, marginBottom: 20, minHeight: 40 }}>
                    {
                      this.state.newCatatan
                        ? this.state.newCatatan
                        : "Tidak ada catatan"
                    }
                  </Grid>
                  <Button style={{ backgroundColor: '#8eb52f', color: 'white', width: 80 }} onClick={this.handleEditCatatan}>
                    Edit
                  </Button>
                </>
            }
          </Grid>
        </Grid>
      </Grid >
    )
  }
}
