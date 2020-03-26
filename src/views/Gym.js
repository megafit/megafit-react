import React, { Component } from 'react'

import PropTypes from 'prop-types';

import {
  Grid, Tabs, Tab, Divider, Box, Typography, Button, Paper, InputBase, IconButton, MenuItem, Select, Checkbox, Switch
} from '@material-ui/core';

// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SearchIcon from '@material-ui/icons/Search';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import SwipeableViews from 'react-swipeable-views';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box pt={2}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default class ListProduct extends Component {
  state = {
    value: 0,
    searchingUser: '',
    filterCategory: '',
    stillAvailable: false,
  }

  handleChangeTabs = (event, newValue) => {
    this.setState({ value: newValue })
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeCheck = event => {
    console.log(event.target.name, event.target.checked)
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    return (
      <Grid style={{ padding: 30 }}>
        <Tabs
          value={this.state.value}
          indicatorColor="primary"
          onChange={this.handleChangeTabs}
        >
          <Tab label="Product" style={{ marginRight: 30 }} />
          {/* <Tab label={this.state.banyakButuhTindakan === 0 ? "Butuh tindakan" : `Butuh tindakan (${this.state.banyakButuhTindakan})`} style={{ marginRight: 30 }} /> */}
        </Tabs>
        <Divider />

        <SwipeableViews
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
          style={{ height: '100%' }}>

          {/* Product */}
          <TabPanel value={this.state.value} index={0} style={{ height: '85vh' }}>
            <Grid style={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: 15, justifyContent: 'space-between' }}>
              <Typography style={{ fontSize: 30, }}>Daftar Produk</Typography>
              <Button style={{ backgroundColor: '#8eb52f', color: 'white' }} onClick={()=>this.props.history.push('/gym/addProduct')}>
                tambah baru
            </Button>
            </Grid>
            <Paper style={{ width: '100%', margin: '0px auto' }}>

              <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, padding: 20 }}>
                <Paper component="form" style={{
                  padding: '0px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 400,
                  borderRadius: 30,
                  backgroundColor: '#e8f0d5'
                }}>
                  <InputBase
                    style={{
                      marginLeft: 10,
                      flex: 1, color: '#77942f'
                    }}
                    placeholder="cari member"
                    inputProps={{ 'aria-label': 'id member' }}
                    onChange={this.handleChange('searchingUser')}
                    value={this.state.searchingUser}
                  />
                  <IconButton type="submit" style={{ padding: 5, color: '#77942f' }} aria-label="search" onClick={this.searchMember}>
                    <SearchIcon />
                  </IconButton>
                </Paper>

                <Paper component="form" style={{
                  padding: '0px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 300,
                  borderRadius: 30,
                  backgroundColor: '#e8f0d5'
                }}>
                  <Select
                    labelId="role"
                    id="role"
                    placeholder="FilterCategory"
                    value={this.state.filterCategory}
                    onChange={this.handleChange('filterCategory')}
                    style={{ width: 300 }}
                  >
                    <MenuItem value="">Filter Category</MenuItem>
                  </Select>
                </Paper>
              </Grid>

              <Grid container style={{ backgroundColor: '#f8f8f8', padding: '5px 10px', alignItems: 'center' }}>
                <Grid item md={4} sm={4} xs={4}>
                  <Checkbox
                    checked={this.state.checked}
                    onChange={this.handleChangeCheck}
                    value="secondary"
                    color="secondary"
                  />
            Produk
                </Grid>
                <Grid item md={4} sm={4} xs={4}>
                  Pengaturan harga
                </Grid>
                <Grid item md={4} sm={4} xs={4}>
                  Status
                </Grid>
              </Grid>
            </Paper>

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
                    <p style={{ margin: '8px 0px 5px 0px', color: '#8eb52f', fontWeight: 'bold', marginBottom: 8 }}>Presale Membership</p>
                    <Grid style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                      <PeopleAltRoundedIcon style={{ color: '#b3b3b3', marginRight: 8 }} size={2} />
                      <p style={{ margin: 0, fontSize: 13, color: '#b3b3b3' }}>300 user</p>
                    </Grid>
                    <Grid>
                      <p style={{ margin: 0, fontSize: 13, color: '#b3b3b3' }}>Harga Utama Member</p>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item md={4} sm={4} xs={4}>
                  <p style={{ margin: '8px 0px 5px 0px', fontWeight: 'bold', marginBottom: 8 }}>Rp 300.000 / 30 hari</p>
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
          </TabPanel>

        </SwipeableViews>

      </Grid >
    )
  }
}
