import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Grid, Popover, Button, Select, MenuItem } from '@material-ui/core';

import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import CardHariSesiPT from '../../components/CardHariSesiPT';


class PT extends Component {
  state = {
    openPopover: false,
    anchorEl: null,
    weekSelected: 32,
    days: ["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU", "MINGGU"]
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

  render() {
    return (
      <>
        <Grid container style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 5, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: 35, marginBottom: 20 }}>Hi {this.props.nickname}, ayo cek jadwalnya.</p>

          <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <p style={{ margin: 0, fontSize: 20, marginRight: 20 }}>Jadwal Kelas</p>
            <Grid style={{ display: 'flex', alignItems: 'center' }}>
              <DateRangeOutlinedIcon />
              <p style={{ margin: 0 }}>15 oktober - 22 oktober</p>
              <Grid style={{ border: '0.1px solid #e1e1e1', padding: '5px 10px', borderRadius: 10, marginLeft: 20, display: 'flex', alignItems: 'center', width: 150, justifyContent: 'space-between', cursor: 'pointer' }} onClick={this.handleClick}>
                week 32
                <ArrowDropDownIcon />
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {
              this.state.days.map((day, index) =>
                <CardHariSesiPT key={index} data={day}/> 
              )
            }
            
          </Grid>
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
            <Button style={{ color: '#70bc6a', width: '100%', marginBottom: 10 }}> Minggu ini </Button>
            <Button style={{ color: '#70bc6a', width: '100%', marginBottom: 10 }}> Minggu depan </Button>
            <p style={{ margin: 0 }}>Custom</p>
            <Select
              variant="outlined"
              labelId="role"
              id="role"
              value={this.state.weekSelected}
              onChange={this.handleChange('weekSelected')}
              style={{ width: '100%', padding: 0 }}
            >
              <MenuItem value={32} >week 32</MenuItem>
              <MenuItem value={33} >week 33</MenuItem>
            </Select>
            <Grid style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
              <Button style={{ width: 80 }}>Batal</Button>
              <Button style={{ width: 80, color: 'white', backgroundColor: '#57b150' }}>Simpan</Button>
            </Grid>
          </Grid>
        </Popover>

      </>
    )
  }
}

const mapStateToProps = ({ nickname, positionId }) => {
  return {
    nickname,
    positionId
  }
}
export default connect(mapStateToProps)(PT)