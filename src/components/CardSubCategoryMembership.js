import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

import {
  Grid, Button, Paper, Switch,
  // Checkbox, 
} from '@material-ui/core';

import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// import FileCopyIcon from '@material-ui/icons/FileCopy';

import swal from 'sweetalert';

import { API } from '../config/API';

import { fetchDataSubCategoryMemberships } from '../store/action';

class CardSubCategoryMembership extends Component {
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

  handleChangeCheck = async event => {
    let isActive = event.target.name
    let newStatus = event.target.checked
    this.setState({ [isActive]: newStatus });

    try {
      let token = Cookies.get('MEGAFIT_TKN')
      await API.put(`/sub-category-memberships/${this.props.data.id}`, { activeFlag: newStatus }, { headers: { token } })
    } catch (err) {
      this.setState({ [isActive]: !newStatus });
    }
  };

  setMainPackage = async () => {
    try {
      let token = Cookies.get('MEGAFIT_TKN')
      let newData = {
        isMainPackage: 1,
        categoryMembershipId: this.props.data.categoryMembershipId
      }
      await API.put(`/sub-category-memberships/${this.props.data.id}`, newData, { headers: { token } })
      await this.props.fetchDataSubCategoryMemberships()
    } catch (err) {
      swal("please try again")
    }
  }

  delete = async () => {
    try {
      swal({
        title: "Apa kamu yakin menghapus paket ini?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then(async (willDelete) => {
          if (willDelete) {
            let token = Cookies.get('MEGAFIT_TKN')
            await API.delete(`/sub-category-memberships/${this.props.data.id}`, { headers: { token } })
            await this.props.fetchDataSubCategoryMemberships()
          }
        });
    } catch (err) {
      swal("please try again")
    }
  }

  edit = () => {
    this.props.history.push('/gym/addProduct', { data: this.props.data })
  }

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
          <Grid item md={4} sm={4} xs={4} style={{ display: 'flex', paddingLeft: 15 }}>
            {/* <Grid>
              <Checkbox
                checked={this.state.checked}
                onChange={this.handleChangeCheck}
                value="secondary"
                color="secondary"
              />
            </Grid> */}
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
                    : <Button onClick={this.setMainPackage}>
                      Jadikan harga utama
                  </Button>
                }

              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4} sm={4} xs={4}>
            <p style={{ margin: '8px 0px 5px 0px', fontWeight: 'bold', marginBottom: 8 }}>Rp {convertRupiah(this.props.data.tblPackageMemberships[0].price)} / {this.props.data.tblPackageMemberships[0].times} hari</p>
            <Grid style={{ display: 'flex', alignItems: 'center', marginBottom: 8, cursor: 'pointer' }} onClick={this.edit}>
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
              <DeleteIcon style={{ color: '#b3b3b3', marginTop: 7, marginBottom: 11, cursor: 'pointer' }} size={15} onClick={this.delete} />
              <EditIcon style={{ color: '#b3b3b3', marginBottom: 10, cursor: 'pointer' }} size={15} onClick={this.edit} />
              {/* <FileCopyIcon style={{ color: '#b3b3b3', marginBottom: 10 }} size={15} /> */}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

const mapDispatchToProps = {
  fetchDataSubCategoryMemberships
}

export default connect(null, mapDispatchToProps)(withRouter(CardSubCategoryMembership))