import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default class CardCheck extends Component {
  render() {
    return (
      <TableRow>
        <TableCell component="th" scope="row" style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="icon" src={require('../asset/icon_user.png')} style={{ marginRight: 10 }} />
            Lulu
          </TableCell>
        <TableCell align="center">08:00</TableCell>
        <TableCell align="center">member</TableCell>
        <TableCell align="center">
          <Button variant="contained" style={{ backgroundColor: '#8eb52f', borderRadius: 10, color: 'white', width: 135 }}>
            CHECK OUT
          </Button>
        </TableCell>
      </TableRow>
    )
  }
}
