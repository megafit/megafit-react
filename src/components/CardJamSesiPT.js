import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Grid, Divider } from '@material-ui/core';

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import ModalAddLinkZoom from './modal/ModalAddLinkZoom';

class CardJamSesiPT extends Component {
  state = {
    status: false,
    openModalAddLinkZoom: false,
  }

  componentDidMount() {
      this.setState({
        status: this.props.data.status
      })
  }

  handleChangeStatus = () => {
    this.setState({
      status: !this.state.status
    })
  }

  handleModalAddLinkZoom = () => {
    this.setState({
      ModalAddLinkZoom: !this.state.ModalAddLinkZoom
    })
  }

  render() {
    return (
      <>
        {
          this.props.data.partisipan !== ""
            ? <Grid style={{ marginTop: 10, backgroundColor: '#8eb52f', padding: 10, borderRadius: 10 }}>
              <Grid style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <p style={{ margin: 0, fontSize: 18, color: 'white' }}>08:00 - 09:00</p>
                <PowerSettingsNewIcon style={{ color: 'white', backgroundColor: '#22dd21', borderRadius: 15 }} onClick={this.handleChangeStatus} />
              </Grid>
              <Divider style={{ backgroundColor: 'white' }} />
              <p style={{ margin: 0, fontSize: 18, color: 'white' }} onClick={() => this.props.history.push('/pt/detail-user')}>{this.props.data.partisipan}</p>
            </Grid>
            : <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, backgroundColor: this.state.status ? 'white' : '#d1d1d1', padding: 10, borderRadius: 10, cursor: 'pointer' }} onClick={this.handleModalAddLinkZoom}>
              <p style={{ margin: 0, fontSize: 18 }}>06:00 - 07:00</p>
              <PowerSettingsNewIcon style={{ color: 'white', backgroundColor: this.state.status ? '#22dd21' : 'red', borderRadius: 15, cursor: 'pointer' }} onClick={this.handleChangeStatus} />
            </Grid>
        }

        {
          this.state.openModalAddLinkZoom && <ModalAddLinkZoom open={this.state.openModalAddLinkZoom} close={this.handleChangeStatus}/>
        }
      </>
    )
  }
}

export default withRouter(CardJamSesiPT)
