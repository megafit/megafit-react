import React, { Component } from 'react';

import { Grid } from '@material-ui/core';

import CardJamSesiPT from './CardJamSesiPT';

export default class CardHariSesiPT extends Component {
  state = {
    data: [
      { jam: '06:00-07:00', status: true, partisipan: "" },
      { jam: '07:00-08:00', status: true, partisipan: "" },
      { jam: '08:00-09:00', status: false, partisipan: "" },
      { jam: '09:00-10:00', status: true, partisipan: "" },
      { jam: '10:00-11:00', status: true, partisipan: "" },
      { jam: '11:00-12:00', status: true, partisipan: "" },
      { jam: '12:00-13:00', status: false, partisipan: "" },
      { jam: '13:00-14:00', status: true, partisipan: "" },
      { jam: '14:00-15:00', status: true, partisipan: "" },
      { jam: '15:00-16:00', status: false, partisipan: "" },
      { jam: '16:00-17:00', status: true, partisipan: "" },
      { jam: '17:00-18:00', status: true, partisipan: "" },
      { jam: '18:00-19:00', status: false, partisipan: "" },
      { jam: '19:00-20:00', status: true, partisipan: "" },
      { jam: '20:00-21:00', status: true, partisipan: "" },
      { jam: '21:00-22:00', status: true, partisipan: "Bagio, Panjul" }
    ]
  }

  handleChangeStatus = () => {
    if(!this.state.hasPartisipan){
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
          <p style={{ margin: 0, fontWeight: ' bold', fontSize: 18 }}>{this.props.data}</p>
        </Grid>

        {
          this.state.data.map((el, index) =>
            <CardJamSesiPT data={el} key={index}/>
          )
        }
{/* 
<CardJamSesiPT data={this.state.data[0]} confHasPartisipan={this.confHasPartisipan} isAvaiable={this.state.status}/> */}

      </Grid>
    )
  }
} 