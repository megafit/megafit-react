import React, { Component } from 'react';
import { Avatar, Checkbox, Grid, Button, Popover, MenuList, MenuItem } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Download from './exportToExcel';

export default class CardAnggota extends Component {
  state = {
    open: false,
    checked: false,
    anchorElMenu: null,
    openMenu: false,
    anchorElSubMenu: null,
    openSubMenu: false,
    unduhLaporan: ["semua", "data pribadi", "membership", "PT", "pembayaran"],
    labelValue: [
      {
        label: "ID",
        value: "id"
      }, {
        label: "Name",
        value: "name"
      }, {
        label: "Tanggal Gabung",
        value: "gabung"
      }, {
        label: "Kontak",
        value: "kontak"
      }, {
        label: "Package",
        value: "package"
      }, {
        label: "Sisa PT",
        value: "sisaPT"
      }, {
        label: "Terakhir datang",
        value: "lastCheckin"
      }
    ],
  }

  // componentDidMount() {
  //   console.log(this.props.data)
  // }

  checkoutMember = () => {
    this.props.checkoutMember(this.props.data)
  }

  detailAnggota = () => {
    this.props.detailAnggota(this.props.data)
  }

  handleChangeCheck = () => {
    this.setState({
      checked: !this.state.checked
    })
  }

  handleClickMenu = event => {
    this.setState({
      anchorElMenu: event.currentTarget,
      openMenu: true
    })
  };

  handleCloseMenu = () => {
    this.setState({
      anchorElMenu: null,
      openMenu: false
    })
  };

  handleClickSubMenu = event => {
    this.setState({
      anchorElSubMenu: event.currentTarget,
      openSubMenu: true
    })
  };

  handleCloseSubMenu = () => {
    this.setState({
      anchorElSubMenu: null,
      openSubMenu: false,
      anchorElMenu: null,
      openMenu: false
    })
  };

  render() {
    function dateFormatGabung(args) {
      let date = new Date(args)
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    return (
      <>
        {/* <TableRow onClick={this.detailAnggota} style={{ cursor: 'pointer' }}> */}
        <TableRow>
          <TableCell>
            <Checkbox
              checked={this.state.checked}
              onChange={this.handleChangeCheck}
              value="secondary"
              color="secondary"
            />
          </TableCell>
          <TableCell>{this.props.data.tblMember ? this.props.data.tblMember.memberId : "-"}</TableCell>

          <TableCell >
            <Grid style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar alt="icon" src={require('../asset/icon_user.png')} style={{ marginRight: 10 }} />
              <Grid style={{ display: 'flex', flexDirection: 'column' }}>
                <p>{this.props.data.nickname ? this.props.data.nickname : this.props.data.fullname} </p>
                {
                  this.props.data.sisaHariMembership >= 0
                    ? <Grid style={{ backgroundColor: '#8eb52f', color: 'white', borderRadius: 15, width: 80, textAlign: 'center' }}>
                      aktif
                    </Grid>
                    : this.props.data.sisaHariMembership >= -7
                      ? <Grid style={{ backgroundColor: '#d1b112', color: 'white', borderRadius: 15, width: 80, textAlign: 'center' }}>
                        tenggang
                    </Grid>
                      : <Grid style={{ backgroundColor: '#eb4410', color: 'white', borderRadius: 15, width: 80, textAlign: 'center' }}>
                        berhenti
                    </Grid>
                }
              </Grid>
            </Grid>
          </TableCell>
          <TableCell>{this.props.data.tblMember ? this.props.data.gabung : "-"}</TableCell>
          <TableCell>
            <Grid style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ margin: 0 }}>{this.props.data.email ? this.props.data.email : '-'}</p>
              <p style={{ margin: 0 }}>{this.props.data.phone ? this.props.data.phone : '-'}</p>
            </Grid>
          </TableCell>
          <TableCell>{this.props.data.tblMember ? this.props.data.tblMember.tblPackageMembership.package : '-'}</TableCell>
          <TableCell>{this.props.data.tblMember ? this.props.data.tblMember.ptSession : '-'}</TableCell>
          <TableCell>{this.props.data.tblMember ? dateFormatGabung(this.props.data.tblMember.lastCheckin) : '-'}</TableCell>
          <TableCell>PT</TableCell>
          <TableCell>
            {
              this.props.data.sisaHariMembership > 7
                ? <Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>

                  <Button variant="contained" style={{ minWidth: 40, height: 30, padding: 0, marginLeft: 10 }} onClick={this.handleClickMenu}>
                    ...
                  </Button>
                </Grid>
                : this.props.data.sisaHariMembership >= 0
                  ? <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Grid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <p style={{ margin: '0px 15px 10px 0px', textAlign: 'center', color: '#d1b112' }}>Jatuh dalam {this.props.data.sisaHariMembership} hari</p>
                      <Button variant="outlined" style={{ textTransform: 'none', color: '#d1b112' }} href="https://api.whatsapp.com/send?phone=6281383386284" target="_blank">
                        telpon
                      </Button>
                    </Grid>
                    <Button variant="contained" style={{ minWidth: 40, height: 30, padding: 0, marginLeft: 10 }} onClick={this.handleClickMenu}>
                      ...
                  </Button>
                  </Grid>
                  : this.props.data.sisaHariMembership >= -7
                    ? <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Grid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <p style={{ margin: '0px 15px 10px 0px', textAlign: 'center', color: '#af5558' }}>Terlambat ({Math.abs(this.props.data.sisaHariMembership)} hari)</p>
                        <Button variant="outlined" style={{ textTransform: 'none', color: '#af5558' }}  href="https://api.whatsapp.com/send?phone=6281383386284" target="_blank">
                          kirim peringatan
                        </Button>
                      </Grid>
                      <Button variant="contained" style={{ minWidth: 40, height: 30, padding: 0, marginLeft: 10 }} onClick={this.handleClickMenu}>
                        ...
                  </Button>
                    </Grid>
                    : <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Grid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <p style={{ margin: '0px 15px 10px 0px', textAlign: 'center', }}>Sudah lewat tenggang</p>
                        <Button variant="outlined" style={{ textTransform: 'none' }}  href="https://api.whatsapp.com/send?phone=6281383386284" target="_blank">
                          hubungi kembali
                      </Button>
                      </Grid>
                      <Button variant="contained" style={{ minWidth: 40, height: 30, padding: 0, marginLeft: 10 }} onClick={this.handleClickMenu}>
                        ...
                      </Button>
                    </Grid>
            }

          </TableCell>
        </TableRow>

        <Popover id="menu unduhan"
          open={this.state.openMenu}
          anchorEl={this.state.anchorElMenu}
          onClose={this.handleCloseMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuList style={{ width: 200 }} >
            <MenuItem>
              <p style={{ margin: 0 }}>ubah data pribadi</p>
            </MenuItem>
            {/* <MenuItem onClick={this.handleClickSubMenu}>
              <p style={{ margin: 0 }}>unduh</p>
            </MenuItem> */}
            <MenuItem>
              <Download
                nameSheet="semua"
                title="Semua"
                labelValueReportNilai={this.state.labelValue}
                dataReportAll={this.props.data.dataReportAll} />
            </MenuItem>
          </MenuList>
        </Popover>

        <Popover id="Sub menu unduh"
          open={this.state.openSubMenu}
          anchorEl={this.state.anchorElSubMenu}
          onClose={this.handleCloseSubMenu}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuList style={{ width: 150 }} >
            {
              this.state.unduhLaporan.map((el, index) =>
                <MenuItem key={index}>
                  <MenuItem>
                    <Download
                      nameSheet={el}
                      title={el}
                      labelValueReportNilai={this.state.labelValue}
                      dataReportAll={this.props.data.dataReportAll} />
                  </MenuItem>
                </MenuItem>
              )
            }
          </MenuList>
        </Popover>
      </>
    )
  }
}
