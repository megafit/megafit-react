import React, { Component } from 'react';

import {
  Avatar, Button, TableCell, TableRow
} from '@material-ui/core';

export default class CardCheck extends Component {
  state = {
    open: false
  }

  checkoutMember = () => {
    this.props.checkoutMember(this.props.data)
  }

  detailMember = () => {
    this.props.detailMember(this.props.data)
  }

  render() {
    return (
      <TableRow >
        <TableCell align="center" component="th" scope="row" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <Avatar alt="icon" src={require('../asset/icon_user.png')} style={{ marginRight: 10 }} />
          <p onClick={this.detailMember}>{this.props.data.member.nickname}</p>
        </TableCell>
        <TableCell align="center">{this.props.data.checkinTime.slice(0, 5)}</TableCell>
        <TableCell align="center">{this.props.data.lockerKey}</TableCell>
        <TableCell align="center">
          <Button variant="contained" style={{ backgroundColor: '#8eb52f', borderRadius: 10, color: 'white' }} onClick={this.checkoutMember}>
            CHECK OUT
            </Button>
        </TableCell>
      </TableRow>
    )
  }
}
