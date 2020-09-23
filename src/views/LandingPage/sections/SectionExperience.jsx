import React, { Component } from 'react'
import mobile from '~/public/assets/img/mobile_apps.svg'
import web from '~/public/assets/img/web.svg'
import backend from '~/public/assets/img/backend.svg'
import Fade from 'react-reveal/Fade'
import experience from '~/public/assets/img/experience.svg'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core'
import styles from './styles'

class SectionExperience extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <h2 className={classes.sectionTitle}>Experience</h2>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <div className={classes.wrapper}>
              <div className={classes.dots}/>
              <p className={classes.jobs}>Front End Developer</p>
              <p className={classes.company}>PT Asteris Digital Lab</p>
              <label>October 2019</label>
            </div>
            <div className={classes.wrapper}>
              <div className={classes.dots}/>
              <p className={classes.jobs}>Web Developer</p>
              <p className={classes.company}>Freelance</p>
              <label>June 2017 - September 2018</label>
            </div>
            <div className={classes.wrapper}>
              <div className={classes.dots}/>
              <p className={classes.jobs}>Software Enginer</p>
              <p className={classes.company}>Rocket And Unmanned System Division (Organization)</p>
              <p className={classes.company}>Universitas Komputer Indonesia</p>
              <label>November 2016 - March 2018</label>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src={experience} alt='experience danar alifian' style={{width : '100%', height : '100%', objectFit : 'contain'}}/>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(SectionExperience)