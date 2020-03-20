import 'date-fns';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

import SearchIcon from '@material-ui/icons/Search';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';

import { API } from '../config/API';
import { Typography } from '@material-ui/core';

import CardAnggota from '../components/CardAnggota';
import ModalDetailAnggota from '../components/ModalDetailAnggota';
import ModalImportAnggota from '../components/ModalImportAnggota';
import ModalCreateEditUser from '../components/ModalCreateEditUser';

// import Download from '../components/exportToExcel';

import orderBy from 'lodash/orderBy';

const invertDirection = {
  asc: "desc",
  desc: "asc"
}

class Anggota extends Component {
  constructor(props) {
    super(props)
    this._isMounted = false
    this.state = {
      dataPackageMembership: [],
      dataPackagePT: [],
      dataAnggota: [],
      dataAnggotaSearch: [],

      page: 0,
      rowsPerPage: 10,

      openModalDetailAnggota: false,
      dataUserSelected: {},
      openModalImportAnggota: false,

      columnToSort: "",
      sortDirection: "desc",
      nextRegister: false,

      buttonSelected: 0,
      selectAll: false,
      statusCheckAll: false,

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

      openModalCreateEditUser: false
    }
  }

  componentDidMount() {
    this._isMounted = true
    this._isMounted && this.fetchData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.fullname !== this.state.fullname || prevState.nickname !== this.state.nickname || prevState.activeExpired !== this.state.activeExpired || prevState.gender !== this.state.gender || prevState.noKtp !== this.state.noKtp || prevState.email !== this.state.email || prevState.phone !== this.state.phone) {

      if (this.state.fullname !== "" && this.state.nickname !== "" && this.state.activeExpired !== new Date() && this.state.gender !== "" && this.state.noKtp !== "" && this.state.email !== "" && this.state.phone !== "") {
        if (!this.state.nextRegister) {
          this.setState({ nextRegister: true })
        }
      } else {
        this.setState({ nextRegister: false })
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }


  fetchData = async () => {
    try {
      let token = Cookies.get('MEGAFIT_TKN')

      let anggota = await API.get('/users', { headers: { token } })

      let listAnggota = await anggota.data.data.filter(element =>
        element.tblMember
      )

      //Prepare Data

      console.log(listAnggota)
      await listAnggota.forEach(element => {
        let sisaHari = Math.round(Math.round((new Date(element.tblMember.activeExpired).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)));
        element.sisaHariMembership = sisaHari

        let dateGabung = new Date(element.tblMember.activeDate)
        element.gabung = `${dateGabung.getDate()}/${dateGabung.getMonth() + 1}/${dateGabung.getFullYear()}`
        let dateLastCheckin = new Date(element.tblMember.lastCheckin)

        element.dataReportAll = [{
          id: element.tblMember.memberId,
          name: element.nickname ? element.nickname : element.fullname,
          gabung: `${dateGabung.getDate()}/${dateGabung.getMonth() + 1}/${dateGabung.getFullYear()}`,
          kontak: `${element.email} ${element.phone && `(${element.phone})`}`,
          package: element.tblMember.tblPackageMembership ? element.tblMember.tblPackageMembership.package : "",
          sisaPT: element.tblMember.ptSession,
          lastCheckin: `${dateLastCheckin.getDate()}/${dateLastCheckin.getMonth() + 1}/${dateLastCheckin.getFullYear()}`,
        }]
      });

      this._isMounted && this.setState({ dataAnggotaSearch: listAnggota, dataAnggota: listAnggota })

    } catch (Error) {
      alert("Server error")
      console.log(Error)
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleDateChange = name => date => {
    this.setState({ [name]: date })
  };

  handleChangeExpired = () => async event => {
    let checkDate = await this.state.dataPackageMembership.find(el => el.packageMembershipId === event.target.value)

    this.setState({ packageMembershipId: event.target.value, activeExpired: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + checkDate.times) })
  };

  reset() {
    this.setState({
      activeStep: 0,
      username: "",
      password: "",
      fullname: "",
      nickname: "",
      noKtp: "",
      dateOfBirth: new Date(),
      email: "",
      phone: "",
      gender: "",
      igAccount: "",
      roleId: "",
      haveWhatsapp: false,
      positionId: "",
      isPermanent: "",
      available: false,
      ptSession: "",
      packageMembershipId: "",
      packagePTSelected: "",
    })
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    })
  }

  handleChangeRowsPerPage = event => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0
    })
  }

  searchMember = async event => {
    event.preventDefault()
    let newUserCheckin = await this.state.dataAnggota.filter(el => el.nickname.toLowerCase().match(new RegExp(this.state.searchingUser.toLowerCase())))
    this.setState({ dataAnggotaSearch: newUserCheckin })
    if (this.state.searchingUser === "") {
      this.setState({ dataAnggotaSearch: this.state.dataAnggota })
    }
  }

  handleOpenModalDetailAnggota = args => {
    this.setState({ openModalDetailAnggota: true, dataUserSelected: args });
  };

  handleCloseModalDetailAnggota = () => {
    this.setState({ openModalDetailAnggota: false, dataUserSelected: {} });
  };

  handleOpenModalImportAnggota = () => {
    this.setState({ openModalImportAnggota: true });
  };

  handleCloseModalImportAnggota = () => {
    this.setState({ openModalImportAnggota: false });
  };

  handleSort = columnName => {
    this.setState(state => ({
      columnToSort: columnName,
      sortDirection: state.columnToSort === columnName
        ? invertDirection[state.sortDirection]
        : 'asc'
    }))
  }

  buttonSelect = args => async () => {
    this.setState({
      buttonSelected: args
    })

    if (args === 0) {
      this.setState({
        dataAnggotaSearch: this.state.dataAnggota
      })
    } else {
      if (args === 1) {
        let dataAnggotaSearch = await this.state.dataAnggota.filter(el => el.sisaHariMembership >= 0)
        this.setState({
          dataAnggotaSearch
        })
      } else if (args === 2) {
        let dataAnggotaSearch = await this.state.dataAnggota.filter(el => el.sisaHariMembership >= -7 && el.sisaHariMembership < 0)
        this.setState({
          dataAnggotaSearch
        })
      } else {
        let dataAnggotaSearch = await this.state.dataAnggota.filter(el => el.sisaHariMembership < -7)
        this.setState({
          dataAnggotaSearch
        })
      }
    }
  }

  handleChangeCheck = event => {
    this.setState({
      selectAll: event.target.checked,
      statusCheckAll: event.target.checked,
    })

    // if (!event.target.checked) {
    //   this.setState({
    //     dataNilaiReport: [],
    //     dataNilaiKPIM: [],
    //     dataNilaiTAL: []
    //   })
    // }
  };

  handleModalDetailAnggota = () => {
    this.setState({
      openModalCreateEditUser: !this.state.openModalCreateEditUser
    });
  };

  render() {
    return (
      <Grid style={{ display: 'flex' }}>
        <Grid style={{ padding: 30, width: '100%' }}>
          <Grid style={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: 15, justifyContent: 'space-between' }}>
            <Typography style={{ fontSize: 30, }}>Daftar Megarangers</Typography>
            <Button style={{ backgroundColor: '#8eb52f', color: 'white' }} onClick={this.handleModalDetailAnggota}>
              tambah baru
            </Button>
          </Grid>
          <Paper style={{ width: '100%', padding: 20, margin: '0px auto' }}>

            <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
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
              <Button
                variant="contained"
                color="default"
                startIcon={<CloudUploadIcon />}
                onClick={this.handleOpenModalImportAnggota}
              >Import anggota
              </Button>
            </Grid>
            <Grid style={{ display: 'flex', marginBottom: 15 }}>
              <Button variant="outlined" style={{ borderRadius: 15, padding: '0px 15px', marginRight: 10, backgroundColor: this.state.buttonSelected === 0 ? '#e8f0d5' : 'white', color: this.state.buttonSelected === 0 ? '#5f810c' : 'black' }} onClick={this.buttonSelect(0)}>
                Semua
              </Button>
              <Button variant="outlined" style={{ borderRadius: 15, padding: '0px 15px', marginRight: 10, backgroundColor: this.state.buttonSelected === 1 ? '#e8f0d5' : 'white', color: this.state.buttonSelected === 1 ? '#5f810c' : 'black' }} onClick={this.buttonSelect(1)}>
                aktif
              </Button>
              <Button variant="outlined" style={{ borderRadius: 15, padding: '0px 15px', marginRight: 10, backgroundColor: this.state.buttonSelected === 2 ? '#e8f0d5' : 'white', color: this.state.buttonSelected === 2 ? '#5f810c' : 'black' }} onClick={this.buttonSelect(2)}>
                tenggang
              </Button>
              <Button variant="outlined" style={{ borderRadius: 15, padding: '0px 15px', marginRight: 10, backgroundColor: this.state.buttonSelected === 3 ? '#e8f0d5' : 'white', color: this.state.buttonSelected === 3 ? '#5f810c' : 'black' }} onClick={this.buttonSelect(3)}>
                berhenti
              </Button>
            </Grid>
            <Table>
              <TableHead style={{ backgroundColor: '#f8f8f8' }}>
                <TableRow>
                  <TableCell style={{ marginLeft: 50, width: '1%' }} onClick={() => this.handleSort('checklist')}>
                    <Checkbox
                      checked={this.state.statusCheckAll}
                      onChange={this.handleChangeCheck}
                      value="secondary"
                      color="secondary"
                    />
                  </TableCell>
                  <TableCell style={{ width: '5%' }} onClick={() => this.handleSort('memberId')}>
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                      ID
                      {
                        this.state.columnToSort === 'memberId' ? (this.state.sortDirection === "desc" ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />) : null
                      }
                    </div>
                  </TableCell>
                  <TableCell style={{ width: '15%' }} onClick={() => this.handleSort('nickname')}>
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                      Nama
                      {
                        this.state.columnToSort === 'nickname' ? (this.state.sortDirection === "desc" ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />) : null
                      }
                    </div>
                  </TableCell>
                  <TableCell style={{ width: '9%' }} align="center" onClick={() => this.handleSort('gabung')}>
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                      Gabung
                      {
                        this.state.columnToSort === 'gabung' ? (this.state.sortDirection === "desc" ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />) : null
                      }
                    </div>
                  </TableCell>
                  <TableCell style={{ width: '15%' }}>
                    Kontak
                  </TableCell>
                  <TableCell style={{ width: '10%' }} align="center" onClick={() => this.handleSort('tblMember.tblPackageMembership.package')}>
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                      Paket
                      {
                        this.state.columnToSort === 'tblMember.tblPackageMembership.package' ? (this.state.sortDirection === "desc" ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />) : null
                      }
                    </div>
                  </TableCell>
                  <TableCell style={{ width: '10%' }} align="center" onClick={() => this.handleSort('tblMember.ptSession')}>
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                      Sisa PT
                      {
                        this.state.columnToSort === 'tblMember.ptSession' ? (this.state.sortDirection === "desc" ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />) : null
                      }
                    </div>
                  </TableCell>
                  <TableCell style={{ width: '10%' }} align="center" onClick={() => this.handleSort('tblMember.lastCheckin')}>
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                      Terakhir datang
                      {
                        this.state.columnToSort === 'tblMember.lastCheckin' ? (this.state.sortDirection === "desc" ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />) : null
                      }
                    </div>
                  </TableCell>
                  <TableCell style={{ width: '10%' }} align="center" onClick={() => this.handleSort('packagePTId')}>
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                      PT
                      {
                        this.state.columnToSort === 'packagePTId' ? (this.state.sortDirection === "desc" ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />) : null
                      }
                    </div>
                  </TableCell>
                  <TableCell style={{ width: '15%' }} align="center" onClick={() => this.handleSort('status')}>
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                      Status Penagihan
                      {
                        this.state.columnToSort === 'status' ? (this.state.sortDirection === "desc" ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />) : null
                      }
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  orderBy(this.state.dataAnggotaSearch, this.state.columnToSort, this.state.sortDirection).slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((el, index) => (
                    <CardAnggota data={el} key={index} detailAnggota={this.handleOpenModalDetailAnggota} />
                  ))
                }
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 20, 50, 100]}
              component="div"
              count={this.state.dataAnggotaSearch.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              backIconButtonProps={{
                'aria-label': 'previous page',
              }}
              nextIconButtonProps={{
                'aria-label': 'next page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>

        <ModalDetailAnggota open={this.state.openModalDetailAnggota} data={this.state.dataUserSelected} handleCloseModalDetailAnggota={this.handleCloseModalDetailAnggota} />

        {
          this.state.openModalImportAnggota && <ModalImportAnggota open={this.state.openModalImportAnggota} data={this.state.dataUserSelected} handleCloseModalImportAnggota={this.handleCloseModalImportAnggota} fetchDataAnggota={this.fetchData} />
        }
        {
          this.state.openModalCreateEditUser && <ModalCreateEditUser open={this.state.openModalCreateEditUser} handleModalDetailAnggota={this.handleModalDetailAnggota} fetchData={this.fetchData} />
        }

      </Grid >
    )
  }
}

const mapStateToProps = ({ roleId }) => {
  return {
    roleId
  }
}

export default connect(mapStateToProps)(Anggota)
