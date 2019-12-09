import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
// xs, sm, md, lg, and xl.

export default class Profil extends Component {
  render() {
    return (
      <Grid container style={{padding: 20}}>
        <Grid item lg={2} />
        <Grid item lg={4} md={6} sm={12} xs={12} style={{padding:30, paddingTop:0}}>
          <p style={{fontWeight:'bold', fontSize:20, marginBottom:10}}>Member ID : 29</p>
          <img src={require('../asset/29.png')} style={{ alignSelf: 'center'}} height={200} width={200} alt="logo-megafit" />
          <Grid style={{display:'flex'}}>
            <p style={{margin:0}}>berlaku sampai</p>
            <p style={{fontWeight:'bold', margin:0}}>&nbsp;02/12/2019</p>
          </Grid>
          <p style={{fontWeight:'bold', fontSize:20, marginBottom:5}}>Informasi Umum</p>
          <Divider/>
          <p style={{margin:0, marginTop:15}}>Joe Taslim</p>
          <p style={{margin:0, marginTop:10}}>Laki-laki</p>
          <Grid style={{display:'flex'}}>
            <p style={{margin:0, marginTop:10, fontWeight:'bold'}}>No KTP:</p>
            <p style={{margin:0, marginTop:10}}>&nbsp;xxxxxxxxxxxxx1002</p>
          </Grid>
          <Grid style={{display:'flex'}}>
            <p style={{margin:0, marginTop:10, fontWeight:'bold'}}>Tgl. Lahir:</p>
            <p style={{margin:0, marginTop:10}}>&nbsp;26/02/1988</p>
          </Grid>
          <Grid style={{display:'flex'}}>
            <p style={{margin:0, marginTop:10, fontWeight:'bold'}}>No. WA:</p>
            <p style={{margin:0, marginTop:10}}>&nbsp;081788723</p>
          </Grid>
          <Grid style={{display:'flex'}}>
            <p style={{margin:0, marginTop:10, fontWeight:'bold'}}>Email:</p>
            <p style={{margin:0, marginTop:10}}>&nbsp;joe@hotmail.com</p>
          </Grid>
        </Grid>
        <Grid item lg={6} md={5} sm={12} xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <img src={require('../asset/Group_306_@1x.png')} height='80%' width='80%' alt="logo-megafit" />
        </Grid>
      </Grid>
    )
  }
}
