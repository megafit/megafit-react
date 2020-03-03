import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Link, withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import Appbar from './Appbar';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';

import { setUser } from '../store/action';

import { API } from '../config/API';

function Navsidebar(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  function handleListItemClick(event, index) {
    setSelectedIndex(index);
  }

  useEffect(() => {
    if (Cookies.get('MEGAFIT_TKN')) {
      API.get('/users/check-token', { headers: { token: Cookies.get('MEGAFIT_TKN') } })
        .then(({ data }) => {
          props.setUser({ userId: data.data.userId, roleId: data.data.roleId, fullname: data.data.fullname, nickname: data.data.nickname })

          if (data.data.roleId === 4) {
            props.history.push('/home')
          } else {
            props.history.push('/checkin')
          }
        })
        .catch(err => {
          console.log(err)
          props.history.push('/')
        })
    } else {
      props.history.push('/')
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (props.location.pathname === '/') {
      setSelectedIndex(1)
    } else if (props.location.pathname === '/kelas') {
      setSelectedIndex(2)
    } else if (props.location.pathname === '/checkin') {
      setSelectedIndex(3)
    }
  }, [props.location.pathname])

  useEffect(() => {
    if (props.roleId === 4) {
      props.history.push('/home')
    } else {
      props.history.push('/checkin')
    }
  }, [props.roleId, props.history])


  return (
    <Grid style={{ display: "flex" }}>
      {
        props.userId
        && <>
          <CssBaseline />
          <Appbar />
          <Grid variant="permanent" style={{
            zIndex: 5,
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            width: props.roleId === 4 ? 200 : 100,
            height: '100%',
            backgroundColor: '#8EB52F'
          }} open={false}>
            {
              props.roleId === 4 // FOR MEMBER
                ? <>
                  <img src={require('../asset/logo-megafit.png')} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 25 }} height={20} width={170} alt="logo-megafit" />
                  <List component="nav" style={{ color: "white", marginLeft: 30 }} >
                    <Link to='/home' onClick={event => handleListItemClick(event, 1)} style={{ textDecoration: "none" }}>
                      <ListItem button selected={selectedIndex === 1} style={{ display: 'flex', justifyContent: 'center', borderTopLeftRadius: 50, borderBottomLeftRadius: 50, paddingLeft: 30, marginBottom: 5 }}>
                        <HomeOutlinedIcon style={{ fontSize: 30, color: "white", marginRight: 10 }} />
                        <ListItemText primary="Beranda" style={{ fontSize: 20, color: "white" }} />
                      </ListItem>
                    </Link>
                    <Link to='/kelas' onClick={event => handleListItemClick(event, 2)} style={{ textDecoration: "none" }}>
                      <ListItem button selected={selectedIndex === 2} style={{ display: 'flex', justifyContent: 'center', borderTopLeftRadius: 50, borderBottomLeftRadius: 50, paddingLeft: 30, marginBottom: 5 }}>
                        <EventNoteOutlinedIcon style={{ fontSize: 30, color: "white", marginRight: 10 }} />
                        <ListItemText primary="Kelas" style={{ fontSize: 20, color: "white" }} />
                      </ListItem>
                    </Link>
                  </List>
                </>
                : <>
                  <img src={require('../asset/logo-megafit-2.png')} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 30 }} height={80} width={80} alt="logo-megafit" />
                  <List component="nav" style={{ color: "white" }} >
                    <Link to='/checkin' onClick={event => handleListItemClick(event, 3)} style={{ textDecoration: "none" }}>
                      <ListItem button selected={selectedIndex === 3} style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: "center", marginBottom: 5 }}>
                        <img src={require('../asset/checkin.png')} style={{ alignSelf: 'center' }} height={60} width={50} alt="logo-megafit" />
                      </ListItem>
                    </Link>
                    <Link to='/anggota' onClick={event => handleListItemClick(event, 4)} style={{ textDecoration: "none" }}>
                      <ListItem button selected={selectedIndex === 4} style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: "center", marginBottom: 5 }}>
                        <img src={require('../asset/anggota.png')} style={{ alignSelf: 'center' }} height={60} width={50} alt="logo-megafit" />
                      </ListItem>
                    </Link>
                  </List>
                </>
            }

          </Grid>
        </>
      }

    </Grid>
  );
}

const mapDispatchToProps = {
  setUser
}

const mapStateToProps = ({ roleId, userId }) => {
  return {
    roleId,
    userId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navsidebar))
