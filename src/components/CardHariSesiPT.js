import React, { Component } from 'react';
import Cookies from 'js-cookie';

import { Grid } from '@material-ui/core';

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import swal from 'sweetalert';

import CardJamSesiPT from './CardJamSesiPT';

import { API } from '../config/API';

export default class CardHariSesiPT extends Component {
  state = {
    status: false,
    checkAll: null,
    hasPassed: false,
    hasPartisipan: false,
  }

  componentDidMount() {
    if (new Date(this.props.data.date).getDate() < new Date().getDate() && new Date(this.props.data.date).getMonth() <= new Date().getMonth() && new Date(this.props.data.date).getFullYear() <= new Date().getFullYear()) {
      this.setState({
        hasPassed: true
      })
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.data !== this.props.data.data) {
      let thereActive = false
      await this.props.data.data.forEach(element => {
        if (element.classPt) thereActive = true
      });
      this.setState({
        status: thereActive
      })
    }

    if (prevState.checkAll !== this.state.checkAll) {
      if (this.state.checkAll) {
        await this.createClassAll()
      } else {
        await this.deleteClassAll()
      }
    }
  }

  deleteClassAll = async () => {
    try {
      let token = Cookies.get('MEGAFIT_TKN')
      let promises = []

      await this.props.data.data.forEach(async element => {
        if (element.classPt) {
          promises.push(API.delete(`/class-pts/${element.classPt.classPtId}`, { headers: { token } }))
        }
      });
      await Promise.all(promises)

      await this.props.fetchDataClassPt()
      this.setState({
        status: false
      })
    } catch (err) {
      swal("Please try again")
    }
  }

  createClassAll = async () => {
    try {
      let token = Cookies.get('MEGAFIT_TKN')
      let promises = []

      await this.props.data.data.forEach(async element => {
        if (!element.classPt &&
          ((new Date(this.props.data.date).getMonth() >= new Date().getMonth() && new Date(this.props.data.date).getFullYear() >= new Date().getFullYear()) || (new Date(this.props.data.date).getDate() === new Date().getDate() && Number(element.jam.slice(0, 2) > new Date().getHours())))) {
          let newData = {
            time: element.jam.slice(0, 5),
            date: new Date(this.props.data.date).getDate(),
            week: this.props.weekSelected,
            month: new Date(this.props.data.date).getMonth() + 1,
            year: new Date(this.props.data.date).getFullYear(),
          }
          promises.push(API.post('/class-pts', newData, { headers: { token } }))
        }
      });
      await Promise.all(promises)

      await this.props.fetchDataClassPt()
    } catch (err) {
      swal("Please try again")
    }
  }

  handleCheckAll = async () => {
    if (this.state.status !== this.state.checkAll && this.state.status) {
      await this.deleteClassAll()
    } else {
      let newStatus = !this.state.status
      this.setState({
        status: newStatus,
        checkAll: newStatus
      })
    }
  }

  handleThereActive = () => {
    this.setState({
      status: true
    })
  }

  handleHasPartisipan = () => {
    this.setState({
      hasPartisipan: true
    })
  }

  render() {
    function getDate(args) {
      let date = new Date(args).getDate()
      let month = new Date(args).getMonth() + 1
      let year = new Date(args).getFullYear()

      if (date < 10) date = `0${date}`
      if (month < 10) month = `0${month}`

      return `${date}/${month}/${year}`
    }

    return (
      <Grid item style={{ width: 210, backgroundColor: '#e8e8e8', padding: 15, marginBottom: 10, marginRight: 10, opacity: this.state.hasPassed ? 0.5 : 1 }} >
        <p style={{ margin: 0, fontSize: 10 }}>{getDate(this.props.data.date)}</p>
        <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <p style={{ margin: 0, fontWeight: ' bold', fontSize: 18 }}>{this.props.data.day}</p>
          <PowerSettingsNewIcon style={{ color: 'white', backgroundColor: this.state.status ? '#22dd21' : 'red', borderRadius: 15, cursor: (this.state.hasPassed || this.state.hasPartisipan) ? null : 'pointer' }} onClick={(this.state.hasPassed || this.state.hasPartisipan) ? null : this.handleCheckAll} />
        </Grid>

        {
          this.props.data.data.map((el, index) =>
            <CardJamSesiPT data={el} key={index} weekSelected={this.props.weekSelected} date={this.props.data.date} activeAll={this.state.checkAll} thereActive={this.handleThereActive} fetchDataClassPt={this.props.fetchDataClassPt} handleHasPartisipan={this.handleHasPartisipan} />
          )
        }

      </Grid>
    )
  }
} 