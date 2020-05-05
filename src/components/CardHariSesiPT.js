import React, { Component } from 'react';

import { Grid } from '@material-ui/core';

import CardJamSesiPT from './CardJamSesiPT';

export default class CardHariSesiPT extends Component {

  handleChangeStatus = () => {
    if (!this.state.hasPartisipan) {
      this.setState({
        status: !this.state.status
      })
    }
  }

  render() {
    return (
      <Grid item style={{ width: 210, backgroundColor: '#e8e8e8', padding: 15, marginBottom: 10, marginRight: 10 }} >
        <p style={{ margin: 0, fontSize: 10 }}>13/04/2020</p>
        <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <p style={{ margin: 0, fontWeight: ' bold', fontSize: 18 }}>{this.props.data.day}</p>
        </Grid>

        {
          this.props.data.data.map((el, index) =>
            <CardJamSesiPT data={el} key={index} weekSelected={this.props.weekSelected} date={this.props.data.date} />
          )
        }
        {/* 
<CardJamSesiPT data={this.state.data[0]} confHasPartisipan={this.confHasPartisipan} isAvaiable={this.state.status}/> */}

      </Grid>
    )
  }
} 