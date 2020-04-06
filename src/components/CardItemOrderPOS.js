import React, { Component } from 'react'

import {
  TableCell, TableRow,
} from '@material-ui/core';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CloseIcon from '@material-ui/icons/Close';

export default class CardItemOrderPOS extends Component {
  state = {
    quantity: 1,
    price: 0,
  }

  componentDidMount() {
    this.setState({
      price: this.props.data.price
    })
    this.props.setTotalPrice('+', this.props.data.price)
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.quantity !== this.state.quantity) {
      let newprice = this.props.data.price * this.state.quantity
      this.setState({
        price: newprice
      })

      if (prevState.quantity > this.state.quantity) {
        this.props.setTotalPrice('-', this.props.data.price)
      } else {
        this.props.setTotalPrice('+', this.props.data.price)
      }
    }
  }

  setQuantity = (args) => {
    let counter = this.state.quantity

    if (args === '+') {
      this.setState({
        quantity: counter + 1
      })
    } else {
      this.setState({
        quantity: counter - 1
      })
    }
  }

  deleteOrder = () => {
    this.props.setTotalPrice('-', this.state.price)
    this.props.deleteOrder(this.props.order)
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
      <TableRow>
        <TableCell>
          {this.props.data.package}
        </TableCell>
        <TableCell>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {
              this.props.bayar
                ? <p style={{ margin: '0px 10px' }}>{this.state.quantity}</p>
                : <>
                  <RemoveCircleOutlineIcon style={{ color: '#c8c8c8', cursor: 'pointer' }} onClick={() => this.setQuantity('-')} />
                  <p style={{ margin: '0px 10px' }}>{this.state.quantity}</p>
                  <AddCircleOutlineIcon style={{ color: '#c8c8c8', cursor: 'pointer' }} onClick={() => this.setQuantity('+')} />
                </>
            }
          </div>
        </TableCell>

        <TableCell style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Rp {convertRupiah(this.state.price)}
          {
            !this.props.bayar && <CloseIcon style={{ color: '#c8c8c8', cursor: 'pointer', width: 18 }} onClick={this.deleteOrder} />
          }
        </TableCell>
      </TableRow>
    )
  }
}
