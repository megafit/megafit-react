import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Grid, Divider } from '@material-ui/core';

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import ModalDetailMemberClassPt from './modal/ModalDetailMemberClassPt';
import ModalAddLinkZoom from './modal/ModalAddLinkZoom';

import { API } from '../config/API';

import swal from 'sweetalert';

class CardJamSesiPT extends Component {
  state = {
    status: false,
    openModalDetailMemberClassPt: false,
    openModalAddLinkZoom: false,
    hasPassed: false,
    hasPartisipan: false
  }

  componentDidMount() {
    if (this.props.data.classPt) {
      if (this.props.data.classPt.tblHistoryPTs.length > 0) {
        this.setState({
          status: true,
          hasPartisipan: true
        })
      } else {
        this.setState({
          status: true
        })
      }
    } else {
      this.setState({
        status: false
      })
    }

    if ((new Date(this.props.date).getDate() === new Date().getDate() && new Date().getHours() >= Number(this.props.data.jam.slice(0, 2))) || (new Date(this.props.date).getDate() < new Date().getDate())) {
      this.setState({
        hasPassed: true
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      if (!this.props.data.classPt) {
        this.setState({
          status: false
        })
      }
    }

    if (prevState.status !== this.state.status) {
      if (this.state.status) {
        this.props.thereActive()
      }
    }

    if (prevProps.activeAll !== this.props.activeAll) {
      this.setState({
        status: this.props.activeAll
      })
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

  fetchNewDataClassPt = async () => {
    await this.props.fetchDataClassPt()
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

  navigateDetailMember = (userId, historyPt) => {
    this.props.history.push('/pt/detail-user',
      {
        userId: userId,
        historyPtId: historyPt.id,
      }
    )
  }

  render() {
    return (
      <>
        {
          this.state.status
            ? <Grid style={{ display: 'flex', marginTop: 10, backgroundColor: this.state.hasPartisipan ? '#8eb52f' : 'white', padding: 10, borderRadius: 10, flexDirection: 'column' }} >

              <Grid style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <p style={{ margin: 0, fontSize: 18, cursor: 'pointer' }} onClick={this.handleModalAddLinkZoom}>{this.props.data.jam}</p>
                <PowerSettingsNewIcon style={{ color: 'white', backgroundColor: '#22dd21', borderRadius: 15, cursor: (this.state.hasPassed || this.state.hasPartisipan) ? null : 'pointer' }} onClick={(this.state.hasPassed || this.state.hasPartisipan) ? null : this.handleChangeStatus} />
              </Grid>

              {
                this.state.hasPartisipan &&
                <>
                  <Divider style={{ backgroundColor: 'white', margin: '7px 0px 5px 0px' }} />
                  {
                    this.props.data.classPt.tblHistoryPTs.map((user, index) =>
                      <p style={{ margin: 0, fontSize: 18, color: 'white', cursor: 'pointer' }} onClick={() => this.navigateDetailMember(user.tblUser.userId, { id: user.id, catatan: user.catatan })} key={index}>{user.tblUser.nickname}</p>
                    )
                  }
                </>
              }
            </Grid>
            : <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, backgroundColor: this.state.status ? 'white' : '#d1d1d1', padding: 10, borderRadius: 10 }}>
              <p style={{ margin: 0, fontSize: 18 }}>{this.props.data.jam}</p>
              <PowerSettingsNewIcon style={{ color: 'white', backgroundColor: 'red', borderRadius: 15, cursor: this.state.hasPassed ? null : 'pointer' }} onClick={this.state.hasPassed ? null : this.handleChangeStatus} />
            </Grid>
        }

        {
          this.state.openModalDetailMemberClassPt && <ModalDetailMemberClassPt open={this.state.openModalDetailMemberClassPt} close={this.handleChangeStatus} />
        }

        {
          this.state.openModalAddLinkZoom && <ModalAddLinkZoom open={this.state.openModalAddLinkZoom} close={this.handleModalAddLinkZoom} dataClass={this.props.data.classPt} fetchNewDataClassPt={this.fetchNewDataClassPt} hasPassed={this.state.hasPassed} />
        }
      </>
    )
  }
}


export default withRouter(CardJamSesiPT)
