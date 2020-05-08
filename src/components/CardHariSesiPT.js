import React, { Component } from 'react';
import Cookies from 'js-cookie';

import { Grid } from '@material-ui/core';

import CardJamSesiPT from './CardJamSesiPT';

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import { API } from '../config/API';

export default class CardHariSesiPT extends Component {
  state = {
    status: false,
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
  }


  handleChangeStatus = async () => {
    if (this.state.status) {
      let token = Cookies.get('MEGAFIT_TKN')

      await this.props.data.data.forEach(async element => {
        if (element.classPt) {
          await API.delete(`/class-pts/${element.classPt.classPtId}`, { headers: { token } })
        }
      });
      await this.props.fetchDataClassPt()

      if (!this.state.hasPartisipan) {
        this.setState({
          status: !this.state.status
        })
      }
    }

  }

  handleThereActive = () => {
    this.setState({
      status: true
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
      <Grid item style={{ width: 210, backgroundColor: '#e8e8e8', padding: 15, marginBottom: 10, marginRight: 10 }} >
        <p style={{ margin: 0, fontSize: 10 }}>{getDate(this.props.data.date)}</p>
        <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <p style={{ margin: 0, fontWeight: ' bold', fontSize: 18 }}>{this.props.data.day}</p>
          <PowerSettingsNewIcon style={{ color: 'white', backgroundColor: this.state.status ? '#22dd21' : 'red', borderRadius: 15, cursor: this.state.status ? 'pointer' : "" }} onClick={this.handleChangeStatus} />
        </Grid>

        {
          this.props.data.data.map((el, index) =>
            <CardJamSesiPT data={el} key={index} weekSelected={this.props.weekSelected} date={this.props.data.date} activeAll={this.state.status} thereActive={this.handleThereActive} />
          )
        }

      </Grid>
    )
  }
} 