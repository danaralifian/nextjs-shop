import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core'
import styles from './styles'
import screen1 from '~/public/assets/img/ss-1.png'
import screen2 from '~/public/assets/img/ss-2.png'
import playstore from '~/public/assets/img/playstore.png'

class SectionPortofolio extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <h2 className={classes.sectionTitle}>Portofolio</h2>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div style={{display : 'flex', justifyContent : 'space-between'}}>
              <img src={screen1} className={classes.portoMobile} style={{marginTop : 40}} alt='mobile portofolio'/>
              <img src={screen2} className={classes.portoMobile} alt='mobile portofolio'/>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <h4 style={{fontWeight : 'bold'}}>Mobile Apps</h4>
            <p style={{fontSize : 16}}>
            This is a fall detection application designed to help people who may have a high risk 
            of experiencing a fall, this device will notify their family members. 
            and this device makes use of the MiBand device to measure the user's heart rate value.
            </p>
            <p style={{fontWeight : 'bold', marginBottom :0}}>Application Features:</p>
            <ol style={{marginTop : 0}}>
              <li>Send notification when a fall event is detected.</li>
              <li>Provide information on the location of the fall.</li>
              <li>Provides heart rate information.</li>
              <li>Provide information on the nearest hospital.</li>
              <li>Integrated with MiBand devices.</li>
            </ol>
            <a href='https://play.google.com/store/apps/details?id=com.alifian.dan.sevaraapps' target='_blank'>
              <img src={playstore} alt='get it on playstore' className={classes.playstore}/>
            </a>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(SectionPortofolio)