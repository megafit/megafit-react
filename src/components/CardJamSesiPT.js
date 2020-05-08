import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Grid, Divider } from '@material-ui/core';

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import ModalDetailMemberClassPt from './modal/ModalDetailMemberClassPt';
import ModalAddLinkZoom from './modal/ModalAddLinkZoom';

import { API } from '../config/API';

import { fetchDataClassPt } from '../store/action';

import swal from 'sweetalert';

class CardJamSesiPT extends Component {
  state = {
    status: false,
    openModalDetailMemberClassPt: false,
    openModalAddLinkZoom: false,
  }

  componentDidMount() {
    if (this.props.data.classPt) {
      this.setState({
        status: true
      })
    } else {
      this.setState({
        status: false
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.status !== this.state.status) {
      this.props.thereActive()
    }

    if (prevProps.activeAll !== this.props.activeAll) {
      if (this.props.activeAll === false) {
        this.setState({
          status: false
        })
      }
    }
  }


  handleChangeStatus = async () => {
    try {
      let token = Cookies.get('MEGAFIT_TKN')
      if (!this.state.status) {
        let newData = {
          time: this.props.data.jam.slice(0, 5),
          date: new Date(this.props.date).getDate(),
          week: this.props.weekSelected,
          month: new Date(this.props.date).getMonth() + 1,
          year: new Date(this.props.date).getFullYear(),
        }

        await API.post('/class-pts', newData, { headers: { token } })
      } else {
        await API.delete(`/class-pts/${this.props.data.classPt.classPtId}`, { headers: { token } })
      }

      this.fetchNewDataClassPt()
      this.setState({
        status: !this.state.status
      })
    } catch (err) {
      swal("please try again")
    }
  }

  fetchNewDataClassPt = () => {

    let newDate = new Date(this.props.date.getFullYear(), this.props.date.getMonth(), this.props.date.getDate() - (this.props.date.getDay() - 1))

    this.props.fetchDataClassPt({ date: newDate, week: this.props.weekSelected, year: new Date(newDate).getFullYear() })

  }

  handleModalAddLinkZoom = () => {
    this.setState({
      openModalAddLinkZoom: !this.state.openModalAddLinkZoom
    })
  }

  handleModalDetailMemberClassPt = () => {
    this.setState({
      openModalDetailMemberClassPt: !this.state.openModalDetailMemberClassPt
    })
  }

  getNumberOfWeek = date => {
    let theDay = date
    var target = new Date(theDay);
    var dayNr = (new Date(theDay).getDay() + 6) % 7;

    target.setDate(target.getDate() - dayNr + 3);

    var jan4 = new Date(target.getFullYear(), 0, 4);
    var dayDiff = (target - jan4) / 86400000;
    var weekNr = 1 + Math.ceil(dayDiff / 7);

    return weekNr;
  }

  render() {
    return (
      <>
        {
          this.props.data.partisipan !== ""
            ? <Grid style={{ marginTop: 10, backgroundColor: '#8eb52f', padding: 10, borderRadius: 10 }}>
              <Grid style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <p style={{ margin: 0, fontSize: 18, color: 'white' }}>{this.props.data.jam}</p>
                <PowerSettingsNewIcon style={{ color: 'white', backgroundColor: '#22dd21', borderRadius: 15 }} onClick={this.handleModalAddLinkZoom} />
              </Grid>
              <Divider style={{ backgroundColor: 'white' }} />
              <p style={{ margin: 0, fontSize: 18, color: 'white' }} onClick={() => this.props.history.push('/pt/detail-user')}>{this.props.data.partisipan}</p>
            </Grid>
            : this.state.status
              ? <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, backgroundColor: 'white', padding: 10, borderRadius: 10 }} >
                <p style={{ margin: 0, fontSize: 18, cursor: 'pointer' }} onClick={this.handleModalAddLinkZoom}>{this.props.data.jam}</p>
                <PowerSettingsNewIcon style={{ color: 'white', backgroundColor: '#22dd21', borderRadius: 15, cursor: 'pointer' }} onClick={this.handleChangeStatus} />
              </Grid>
              : <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, backgroundColor: this.state.status ? 'white' : '#d1d1d1', padding: 10, borderRadius: 10 }}>
                <p style={{ margin: 0, fontSize: 18 }}>{this.props.data.jam}</p>
                <PowerSettingsNewIcon style={{ color: 'white', backgroundColor: 'red', borderRadius: 15, cursor: 'pointer' }} onClick={this.handleChangeStatus} />
              </Grid>
        }

        {
          this.state.openModalDetailMemberClassPt && <ModalDetailMemberClassPt open={this.state.openModalDetailMemberClassPt} close={this.handleChangeStatus} />
        }

        {
          this.state.openModalAddLinkZoom && <ModalAddLinkZoom open={this.state.openModalAddLinkZoom} close={this.handleModalAddLinkZoom} dataClass={this.props.data.classPt} fetchNewDataClassPt={this.fetchNewDataClassPt} />
        }
      </>
    )
  }
}

const mapDispatchToProps = {
  fetchDataClassPt
}

export default connect(null, mapDispatchToProps)(withRouter(CardJamSesiPT))
