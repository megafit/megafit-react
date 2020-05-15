import React, { Component } from 'react'

import { Grid } from '@material-ui/core';

export default class cardClass extends Component {
  render() {
    return (
      <Grid style={{ marginRight: 10, backgroundColor: this.props.data.color, padding: 3, paddingLeft: 15, borderRadius: 10, marginBottom: 10 }}>
        <p style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 0 }}>{this.props.data.class}</p>
        <p style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginTop: 0 }}>{this.props.data.classTimeIn.slice(0, 5)}-{this.props.data.classTimeOut.slice(0, 5)}</p>
      </Grid>
    )
  }
}
