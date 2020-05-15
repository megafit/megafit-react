import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import {
  Modal, Backdrop, Fade, Grid, Button, TextField, Typography
} from '@material-ui/core';

import swal from 'sweetalert';

import { API } from '../../config/API';

class ModalFormMember extends Component {
  state = {
    umur: '',
    height: '',
    weight: '',
    triceps: '',
    dada: '',
    perut: '',
    pinggul: '',
    pinggang: '',
    paha: ''
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  submit = async () => {
    try {
      let token = Cookies.get('MEGAFIT_TKN')

      let newData = {
        umur: this.state.umur ? this.state.umur : 0,
        height: this.state.height ? this.state.height : 0,
        weight: this.state.weight ? this.state.weight : 0,
        triceps: this.state.triceps ? this.state.triceps : 0,
        dada: this.state.dada ? this.state.dada : 0,
        perut: this.state.perut ? this.state.perut : 0,
        pinggul: this.state.pinggul ? this.state.pinggul : 0,
        pinggang: this.state.pinggang ? this.state.pinggang : 0,
        paha: this.state.paha ? this.state.paha : 0
      }

      let addData = await API.put(`/users/${this.props.userId}?data-size=true`, newData, { headers: { token } })

      addData && this.props.next()
    } catch (err) {
      swal("Please try again")
    }
  }

  render() {
    return (
      <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          open={this.props.open}
          onClose={this.props.close}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.props.open}>
            <div style={{
              backgroundColor: 'white',
              boxShadow: 5,
              height: 520,
              width: 600,
              overflow: 'hidden',
              paddingBottom: 50,
              position: 'relative',
              padding: 30,
            }}>
              <Typography style={{ margin: 0, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Form Data Diri</Typography>
              <form style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} onSubmit={this.submit}>
                <TextField
                  id="umur"
                  label="Umur"
                  value={this.state.umur}
                  onChange={this.handleChange('umur')}
                  margin="normal"
                  variant="outlined"
                  disabled={this.state.proses}
                  defaultValue="Small"
                  size="small"
                />

                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <TextField
                      id="tinggiBadan"
                      label="Tinggi Badan"
                      value={this.state.height}
                      onChange={this.handleChange('height')}
                      margin="normal"
                      variant="outlined"
                      style={{ width: '100%' }}
                      disabled={this.state.proses}
                      defaultValue="Small"
                      size="small"
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField
                      id="beratBadan"
                      label="Berat Badan"
                      value={this.state.weight}
                      onChange={this.handleChange('weight')}
                      margin="normal"
                      variant="outlined"
                      style={{ width: '100%' }}
                      disabled={this.state.proses}
                      defaultValue="Small"
                      size="small"
                    />
                  </Grid>
                </Grid>



                <Grid style={{ border: '1px solid gray', borderRadius: 10, padding: 10, margin: '10px 0px' }}>
                  <Typography style={{ marginBottom: 0 }}>Ukuran</Typography>
                  <Grid container spacing={2} >
                    <Grid item sm={6}>
                      <TextField
                        id="triceps"
                        label="Triceps"
                        value={this.state.triceps}
                        onChange={this.handleChange('triceps')}
                        margin="normal"
                        variant="outlined"
                        style={{ width: '100%' }}
                        disabled={this.state.proses}
                        defaultValue="Small"
                        size="small"
                      />
                      <TextField
                        id="dada"
                        label="Dada"
                        value={this.state.dada}
                        onChange={this.handleChange('dada')}
                        margin="normal"
                        variant="outlined"
                        style={{ width: '100%' }}
                        disabled={this.state.proses}
                        defaultValue="Small"
                        size="small"
                      />
                      <TextField
                        id="perut"
                        label="Perut"
                        value={this.state.perut}
                        onChange={this.handleChange('perut')}
                        margin="normal"
                        variant="outlined"
                        style={{ width: '100%' }}
                        disabled={this.state.proses}
                        defaultValue="Small"
                        size="small"
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <TextField
                        id="pinggul"
                        label="Pinggul"
                        value={this.state.pinggul}
                        onChange={this.handleChange('pinggul')}
                        margin="normal"
                        variant="outlined"
                        style={{ width: '100%' }}
                        disabled={this.state.proses}
                        defaultValue="Small"
                        size="small"
                      />
                      <TextField
                        id="pinggang"
                        label="Pinggang"
                        value={this.state.pinggang}
                        onChange={this.handleChange('pinggang')}
                        margin="normal"
                        variant="outlined"
                        style={{ width: '100%' }}
                        disabled={this.state.proses}
                        defaultValue="Small"
                        size="small"
                      />
                      <TextField
                        id="paha"
                        label="Paha"
                        value={this.state.paha}
                        onChange={this.handleChange('paha')}
                        margin="normal"
                        variant="outlined"
                        style={{ width: '100%' }}
                        disabled={this.state.proses}
                        defaultValue="Small"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                  <p style={{ margin: 0, fontSize: 13, fontStyle: 'italic' }}>*ukuran dalam centimeter</p>
                </Grid>
              </form>

              <Grid style={{ display: 'flex', justifyContent: 'end' }}>
                <Button style={{ backgroundColor: '#d8d8d8', width: 80 }} onClick={this.submit}>
                  Lanjut
                </Button>
              </Grid>
            </div>
          </Fade>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = ({ userId }) => {
  return {
    userId
  }
}

export default connect(mapStateToProps)(ModalFormMember)