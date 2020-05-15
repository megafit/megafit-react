import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import {
  Grid, Typography, Breadcrumbs
} from '@material-ui/core';

import swal from 'sweetalert';

import CardClass from '../components/CardClass';

import { API } from '../config/API';

class Kelas extends Component {
  state = {
    data: [],
    firstDateInWeek: new Date().getDate() - (new Date().getDay() - 1)
  }

  async componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    try {
      let token = Cookies.get('MEGAFIT_TKN');

      let temp = [
        { day: 'MON', date: 0, kelas: [] },
        { day: 'TUE', date: 0, kelas: [] },
        { day: 'WED', date: 0, kelas: [] },
        { day: 'THU', date: 0, kelas: [] },
        { day: 'FRI', date: 0, kelas: [] },
        { day: 'SAT', date: 0, kelas: [] }
      ]

      temp.forEach((el, index) => {
        el.date = this.state.firstDateInWeek + index
      })

      let { data } = await API.get('/classes', { headers: { token } })

      data.data.forEach(element => {
        if (element.classDay) {
          let classDay = element.classDay.split(',')

          if (classDay) classDay.forEach(el => {
            temp[el - 1].kelas.push(element)
          })
        }

        temp.forEach(el => {
          if (el.date === new Date(element.classDate).getDate()) el.kelas.push(element)
        })
      });

      this.setState({
        data: temp
      })
    } catch (Error) {
      swal("Please try again")
    }
  }

  handleClickNext = async event => {
    event.preventDefault();
    let newDate = this.state.firstDateInWeek + 7
    await this.setState({
      firstDateInWeek: newDate
    })
    this.fetchData()
  }

  handleClickPrev = async event => {
    event.preventDefault();
    let newDate = this.state.firstDateInWeek - 7
    await this.setState({
      firstDateInWeek: newDate
    })
    this.fetchData()
  }

  render() {
    function getWeeks(args) {
      let theDay = new Date(new Date().getFullYear(), new Date().getMonth(), args)
      var target = new Date(theDay);
      var dayNr = (new Date(theDay).getDay() + 6) % 7;

      target.setDate(target.getDate() - dayNr + 3);

      var reference = new Date(target.getFullYear(), 0, 4);
      var dayDiff = (target - reference) / 86400000;
      var weekNr = 1 + Math.ceil(dayDiff / 7);

      return weekNr;
    }

    return (
      <Grid container style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 5, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 35, marginBottom: 5 }}>Hi {this.props.nickname}, ikuti kelas favoritmu.</p>

        <Breadcrumbs style={{ fontSize: 12, color: 'gray', marginBottom: 10 }}>
          <Link to="/home" style={{ textDecoration: 'none', color: 'gray' }} >
            Home
          </Link>
          <Typography color="textPrimary" style={{ fontSize: 12 }}>Jadwal kelas</Typography>
        </Breadcrumbs>

        <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/#" onClick={this.handleClickPrev} style={{ color: '#8EB52F' }} >lihat minggu sebelumnya </a>
          <p style={{ color: '#8EB52F', fontSize: 40 }} >Week {getWeeks(this.state.firstDateInWeek)}</p>
          <a href="/#" onClick={this.handleClickNext} style={{ color: '#8EB52F' }} >lihat minggu sesudahnya </a>
        </Grid>

        <Grid container>
          {
            this.state.data.map((day, index) => <Grid item xs={6} sm={4} md={3} lg={2} xl={2} style={{ opacity: (index + 1) < new Date().getDay() ? 0.3 : 1 }} key={index}>
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

const mapStateToProps = ({ nickname }) => {
  return {
    nickname
  }
}

export default connect(mapStateToProps)(Kelas)
