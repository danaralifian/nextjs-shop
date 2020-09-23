import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core'
import ScrollContainer from 'react-indiana-drag-scroll'

import banner from '~/public/assets/img/banner-1.jpg'
import styles from './styles'

import energy from '~/public/assets/img/energy.png'
import gift from '~/public/assets/img/gift.png'
import lifestyle from '~/public/assets/img/lifestyle.png'
import shoe from '~/public/assets/img/shoe.png'
import tshirt from '~/public/assets/img/tshirt.png'
import smartphone from '~/public/assets/img/smartphone.png'

class SectionIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories : [
        {icon : energy, label : 'Elektronik'},
        {icon : smartphone, label : 'Handphone'},
        {icon : tshirt, label : 'Pakaian'},
        {icon : shoe, label : 'Sepatu'},
        {icon : gift, label : 'Hiburan'},
        {icon : lifestyle, label : 'Sehari-hari'},
      ]
    }
  }
  

  render() {
    const { classes } = this.props
    return (
      <div style={{position : 'relative'}}>
        <ScrollContainer className="scroll-container">
        <div style={{display : 'flex', alignItems : 'center', padding : '5px 0px 10px', marginBottom : 10}}>
          {this.state.categories.map((obj,key)=>
            <React.Fragment key={key}>
              <div className={classes.category}>
                <img src={obj.icon} alt={obj.label} className={classes.iconCategory}/>
                <p>{obj.label}</p>
              </div>
            </React.Fragment>
          )}
        </div>
        </ScrollContainer>
        <img src={banner} className={classes.banner} alt='banner'/>
        <p className={classes.promo}>DAPATKAN DISKON 50%</p>
      </div>
    )
  }
}

export default withStyles(styles)(SectionIntro)