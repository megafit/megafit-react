import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Grid, Typography, Breadcrumbs, Link } from '@material-ui/core';

class Paket extends Component {

  componentDidMount(){
    
  }

  navigateBack = event => {
    event.preventDefault()
    this.props.history.push('/home')
  }

  render() {
    return (
      <Grid container style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 5, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 35, marginBottom: 10 }}>Hi {this.props.nickname}, dapatkan penawaran terbaik.</p>

        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/" onClick={this.navigateBack}>
            Home
          </Link>
          <Typography color="textPrimary">paket</Typography>
        </Breadcrumbs>

        <p style={{ fontSize: 20, marginTop: 10, marginBottom: 0, fontWeight: 'bold' }}>Paket keanggotaan</p>
        <p style={{ marginTop: 0, marginBottom: 10 }}>Untuk semua paket akan diperpanjang secara otomatis setiap bulannya</p>
      </Grid>
    )
  }
}

const mapStateToProps = ({nickname}) => {
  return {
    nickname
  }
}

export default connect(mapStateToProps)(Paket)