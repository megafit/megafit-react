import React, { Component } from 'react'
import Cookies from 'js-cookie';

import PropTypes from 'prop-types';

import {
  Grid, Tabs, Tab, Divider, Box, Typography, Button, Paper, InputBase, IconButton, MenuItem, Select, Checkbox
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import SwipeableViews from 'react-swipeable-views';

import CardSubCategoryMembership from '../components/CardSubCategoryMembership'

import { API } from '../config/API';

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
    dataAllSubCategoryMemberships: [],
  }

  componentDidMount() {
    this.fetchDataProduct()
  }

  fetchDataProduct = async () => {
    let token = Cookies.get('MEGAFIT_TKN')

    let dataSubCategoryMemberships = await API.get('/sub-category-memberships', { headers: { token } })

    this.setState({
      dataAllSubCategoryMemberships: dataSubCategoryMemberships.data.data
    })
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
              <Button style={{ backgroundColor: '#8eb52f', color: 'white' }} onClick={() => this.props.history.push('/gym/addProduct')}>
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

            {
              this.state.dataAllSubCategoryMemberships.map((element, index) =>
                <CardSubCategoryMembership data={element} key={index}/>
              )
            }
          </TabPanel>

        </SwipeableViews>

      </Grid >
    )
  }
}
