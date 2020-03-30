import React, { Component } from 'react'

import {
  Grid, Button, Paper, Checkbox, Switch
} from '@material-ui/core';

import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';

export default class CardSubCategoryMembership extends Component {
  state = {
    stillAvailable: false,
    totalActiveMember: 0
  }

  componentDidMount() {
    let counter = 0
    this.props.data.tblPackageMemberships.forEach(el => {
      counter += el.activeMember
    })
    this.setState({
      totalActiveMember: counter,
      stillAvailable: this.props.data.activeFlag
    })
  }


  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeCheck = event => {
    console.log(event.target.name, event.target.checked)
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    function convertRupiah(args) {
      let separator
      var number_string = args.toString(),
        sisa = number_string.length % 3,
        rupiah = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);

      if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
      }

      return rupiah
    }

    return (
      <Paper style={{ width: '100%', margin: '10px auto', padding: '5px 10px' }}>
        <Grid container>
          <Grid item md={4} sm={4} xs={4} style={{ display: 'flex' }}>
            <Grid>
              <Checkbox
                checked={this.state.checked}
                onChange={this.handleChangeCheck}
                value="secondary"
                color="secondary"
              />
            </Grid>
            <Grid>
              <p style={{ margin: '8px 0px 5px 0px', color: '#8eb52f', fontWeight: 'bold', marginBottom: 8 }}>{this.props.data.subCategoryMembership}</p>
              <Grid style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <PeopleAltRoundedIcon style={{ color: '#b3b3b3', marginRight: 8 }} size={2} />
                <p style={{ margin: 0, fontSize: 13, color: '#b3b3b3' }}>{this.state.totalActiveMember} user</p>
              </Grid>
              <Grid>
                {
                  this.props.data.isMainPackage
                  ? <p style={{ margin: 0, fontSize: 13, color: '#b3b3b3' }}>Harga Utama Member</p>
                  : <Button>
                    Jadikan harga utama
                  </Button>
                }
                
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4} sm={4} xs={4}>
            <p style={{ margin: '8px 0px 5px 0px', fontWeight: 'bold', marginBottom: 8 }}>Rp {convertRupiah(this.props.data.tblPackageMemberships[0].price)} / {this.props.data.tblPackageMemberships[0].times} hari</p>
            <Grid style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <ListAltRoundedIcon style={{ color: '#8eb52f', marginRight: 8, fontSize: 20 }} />
              <p style={{ margin: 0, fontSize: 13, color: '#8eb52f' }}>Tambah harga grosir</p>
            </Grid>
            <Grid style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <LocalOfferRoundedIcon style={{ color: '#8eb52f', marginRight: 8, fontSize: 20 }} />
              <p style={{ margin: 0, fontSize: 13, color: '#8eb52f' }}>Atur Diskon</p>
            </Grid>
          </Grid>

          <Grid item md={4} sm={4} xs={4} style={{ display: 'flex', justifyContent: 'space-between', paddingRight: 20 }}>
            <Grid style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ margin: '10px 0px 5px 0px', fontSize: 13, color: '#b3b3b3' }}>Access - Unlimited</p>
              <p style={{ margin: '11px 0px 5px 0px', fontSize: 13, color: '#b3b3b3' }}>Admin Fee - Pertama</p>
              <Grid style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <p style={{ margin: 0, fontSize: 13, color: '#b3b3b3' }}>masih berlaku</p>
                <Switch
                  checked={this.state.stillAvailable}
                  onChange={this.handleChangeCheck}
                  color="primary"
                  name="stillAvailable"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </Grid>
            </Grid>
            <Grid style={{
              display: 'flex', flexDirection: 'column'
            }} >
              <DeleteIcon style={{ color: '#b3b3b3', marginTop: 7, marginBottom: 11 }} size={15} />
              <EditIcon style={{ color: '#b3b3b3', marginBottom: 10 }} size={15} />
              <FileCopyIcon style={{ color: '#b3b3b3', marginBottom: 10 }} size={15} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}
