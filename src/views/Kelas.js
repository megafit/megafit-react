import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';

import CardClass from '../components/CardClass';
// xs, sm, md, lg, and xl.

export default class Kelas extends Component {
  state = {
    data: [
      {
        day: 'MON', kelas: [
          { class: "Zumba Fitness", classTimeIn: "09:00:00", classTimeOut: "10:00:00", color: 'black' },
          { class: "Yoga Lates", classTimeIn: "10:00:00", classTimeOut: "11:00:00", color: 'red' }
        ]
      },
      {
        day: 'TUE', kelas: [
          { class: "Zumba Fitness", classTimeIn: "09:00:00", classTimeOut: "10:00:00", color: 'black' },
          { class: "Mega Combat", classTimeIn: "10:00:00", classTimeOut: "11:00:00", color: 'yellow' }
        ]
      },
      {
        day: 'WED', kelas: [
          { class: "Cardio Dance", classTimeIn: "09:00:00", classTimeOut: "10:00:00", color: 'blue' },
          { class: "Hatha Yoga", classTimeIn: "10:00:00", classTimeOut: "11:00:00", color: 'orange' }
        ]
      },
      {
        day: 'THU', kelas: [
          { class: "Mega Pump", classTimeIn: "10:00:00", classTimeOut: "11:00:00", color: 'green' }
        ]
      },
      {
        day: 'FRI', kelas: [
          { class: "Spinning", classTimeIn: "09:00:00", classTimeOut: "10:00:00", color: 'gray' }
        ]
      },
      {
        day: 'SAT', kelas: [
          { class: "Mega Combat", classTimeIn: "10:00:00", classTimeOut: "11:00:00", color: 'yellow' }
        ]
      }
    ]
  }

  // componentDidMount() {

  // }  

  handleClick = event => {
    event.preventDefault();
  }

  render() {
    return (
      <Grid container style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 5, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 35, marginBottom: 5 }}>Hi Joe, ikuti kelas favoritmu.</p>

        <Breadcrumbs style={{ fontSize: 12, color: 'gray', marginBottom: 10 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'gray' }} >
            Home
          </Link>
          <Typography color="textPrimary" style={{ fontSize: 12 }}>Jadwal kelas</Typography>
        </Breadcrumbs>

        <Link style={{ color: '#8EB52F' }} >
          lihat minggu depan >
        </Link>

        <Grid container>
          {
            this.state.data.map((day, index) => <Grid item xs={2} sm={2} md={2} lg={2} xl={2} style={{ opacity: (index + 1) < new Date().getDay() ? 0.3 : 1 }} key={index}>
              <p style={{ color: '#8EB52F', fontWeight: 'bold', fontSize: 22, marginTop: 8, marginBottom: 0 }}>{day.day}</p>
              {
                day.kelas.map((kelas, index) => <CardClass data={kelas} key={index} />)
              }
            </Grid>
            )
          }
        </Grid>
      </Grid>
    )
  }
}
