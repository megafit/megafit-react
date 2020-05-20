import React, { Component } from 'react'
import { connect } from 'react-redux';

import {
  Grid, Popover, Button, Select, MenuItem, Tooltip
} from '@material-ui/core';

import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RefreshIcon from '@material-ui/icons/Refresh';

import CardHariSesiPT from '../../components/CardHariSesiPT';

import { fetchDataClassPt, resetClassPt } from '../../store/action';

class PT extends Component {
  state = {
    openPopover: false,
    anchorEl: null,
    weekSelected: 0,
    week: [],
    loading: false,
  }

  async componentDidMount() {
    this.props.resetClassPt()
    let week = []
    for (let i = this.getNumberOfWeek(new Date()); i < 53; i++) {
      week.push(i)
    }

    let date = new Date(new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - (new Date().getDay() - 1))

    await this.props.fetchDataClassPt({ date, week: this.getNumberOfWeek(new Date()), year: new Date().getFullYear() })

    this.setState({
      week,
      weekSelected: this.getNumberOfWeek(new Date())
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.weekSelected !== this.state.weekSelected) {
      if (prevState.weekSelected !== 0) {
        this.refresh()
      }
    }
  }

  fetchDataClassPt = async () => {
    let date = new Date(new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - (new Date().getDay() - 1))

    let selisihWeek = this.state.weekSelected - this.getNumberOfWeek(date)

    let newDate = new Date(new Date(date).getFullYear(),
      new Date(date).getMonth(),
      new Date(date).getDate() + (selisihWeek * 7))

    this.handleClose()

    await this.props.fetchDataClassPt({ date: newDate, week: this.state.weekSelected, year: new Date(newDate).getFullYear() })
  }

  handleClick = (event) => {
    this.setState({
      openPopover: true,
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      openPopover: false,
      anchorEl: null
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  getNumberOfWeek = date => {
    let theDay = date
    var target = new Date(theDay);
    var dayNr = (new Date(theDay).getDay() + 6) % 7;

    target.setDate(target.getDate() - dayNr + 3);

    var reference = new Date(target.getFullYear(), 0, 4);
    var dayDiff = (target - reference) / 86400000;
    var weekNr = 1 + Math.ceil(dayDiff / 7);

    return weekNr;
  }

  thisWeek = () => {
    this.setState({
      weekSelected: this.getNumberOfWeek(new Date())
    })
  }

  changeWeek = () => {
    this.setState({
      weekSelected: this.getNumberOfWeek(new Date()) + 1
    })
  }

  refresh = async () => {
    this.setState({ loading: true })
    await this.fetchDataClassPt()
    this.setState({ loading: false })
  }

  render() {
    function getDate(data) {
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

      if (data[0]) return `${new Date(data[0].date).getDate()} ${months[new Date(data[0].date).getMonth()]} - ${new Date(data[data.length - 1].date).getDate()} ${months[new Date(data[data.length - 1].date).getMonth()]}`
    }

    return (
      <>
        <Grid container style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 5, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: 35, marginBottom: 20 }}>Hi {this.props.nickname}, ayo cek jadwalmu.</p>


          <Grid container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ margin: 0, fontSize: 20, marginRight: 5 }}>Jadwal Kelas</p>
              <Tooltip title="Refresh" aria-label="refresh" placement="bottom-start">
                <RefreshIcon style={{ cursor: 'pointer' }} onClick={() => this.refresh()} />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <DateRangeOutlinedIcon />
              <p style={{ margin: 0 }}>{getDate(this.props.dataClassPt)}</p>
              <Grid style={{ border: '0.1px solid #e1e1e1', padding: '5px 10px', borderRadius: 10, marginLeft: 20, display: 'flex', alignItems: 'center', width: 150, justifyContent: 'space-between', cursor: 'pointer' }} onClick={this.handleClick}>
                week {this.state.weekSelected}
                <ArrowDropDownIcon />
              </Grid>
            </Grid>
          </Grid>

          {
            this.state.loading
              ? <img src={require('../../asset/loading.gif')} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 25 }} height={150} width={150} alt="loading" />
              : <Grid container spacing={3}>
                {
                  this.props.dataClassPt.map((classPT, index) =>
                    <CardHariSesiPT key={index} data={classPT} weekSelected={this.state.weekSelected} fetchDataClassPt={this.fetchDataClassPt} refresh={this.refresh} />
                  )
                }

              </Grid>
          }

        </Grid>


        <Popover
          open={this.state.openPopover}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Grid style={{ width: 200, padding: 10 }} >
            <Button style={{ color: '#70bc6a', width: '100%', marginBottom: 10 }} onClick={this.thisWeek}> Minggu ini </Button>
            <Button style={{ color: '#70bc6a', width: '100%', marginBottom: 10 }} onClick={this.changeWeek}> Minggu depan </Button>
            <p style={{ margin: 0 }}>Custom</p>
            <Select
              variant="outlined"
              labelId="role"
              id="role"
              value={this.state.weekSelected}
              onChange={this.handleChange('weekSelected')}
              style={{ width: '100%', padding: 0 }}
            >
              {
                this.state.week.map(week =>
                  <MenuItem value={week} key={week}>week {week}</MenuItem>
                )
              }
            </Select>
            <Grid style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <Button style={{ width: 80 }} onClick={this.handleClose}>Batal</Button>
              {/* <Button style={{ width: 80, color: 'white', backgroundColor: '#57b150' }}>Simpan</Button> */}
            </Grid>
          </Grid>
        </Popover>

      </>
    )
  }
}

const mapDispatchToProps = {
  fetchDataClassPt,
  resetClassPt
}

const mapStateToProps = ({ loading, nickname, dataClassPt }) => {
  return {
    loading,
    nickname,
    dataClassPt
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PT)