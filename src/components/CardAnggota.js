import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default class CardAnggota extends Component {
  state = {
    open: false,
    statusMember: "",
  }

  componentDidMount() {
    if (this.props.data.tblMember) this.cekMembershipExpired(this.props.data)
    else {
      this.setState({ statusMember: this.props.data.flagActive ? 'Active' : 'Non active' })
    }
  }

  checkoutMember = () => {
    this.props.checkoutMember(this.props.data)
  }

  cekMembershipExpired = args => {
    let sisaHari = new Date(args.activeExpired) - new Date()
    sisaHari = Math.round(Math.round((new Date(args.tblMember.activeExpired).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)));

    if (sisaHari > 0) {
      this.setState({ statusMember: 'Active' })
    } else if (sisaHari >= -7) {
      this.setState({ statusMember: 'Masa tenggang' })
    } else {
      this.setState({ statusMember: 'Non active' })
    }
  }

  detailAnggota = () => {
    this.props.detailAnggota(this.props.data)
  }

  render() {
    return (
      <>
        <TableRow onClick={this.detailAnggota} style={{cursor:'pointer'}}>
          <TableCell component="th" scope="row" style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt="icon" src={require('../asset/icon_user.png')} style={{ marginRight: 10 }} />
            {this.props.data.nickname}
          </TableCell>
          <TableCell align="center">{this.props.data.email ? this.props.data.email : '-'}</TableCell>
          <TableCell align="center">{this.props.data.tblRole.role}</TableCell>
          <TableCell align="center">{this.state.statusMember}</TableCell>
        </TableRow>
      </>
    )
  }
}
