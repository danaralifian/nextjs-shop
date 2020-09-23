import React, { Component } from 'react'
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "~/src/components/Header/Header.js";
import HeaderLinks from "~/src/components/Header/HeaderLinks.js";
import Footer from "~/src/components/Footer/Footer.js";
import GridContainer from "~/src/components/Grid/GridContainer.js";
import GridItem from "~/src/components/Grid/GridItem.js";
import Button from "~/src/components/CustomButtons/Button.js";
import Parallax from "~/src/components/Parallax/Parallax.js";
import { withRouter } from 'next/router'

import SectionCart from './sections/SectionCart'
import SectionRecommendation from './sections/SectionRecommendation'
import SectionPortofolio from './sections/SectionPortofolio'
import SectionSkills from './sections/SectionSkills'
import SectionAbout from './sections/SectionRecommendation'

import styles from "~/assets/jss/nextjs-material-kit/pages/components.js";
import { ButtonBase } from '@material-ui/core';

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      const  { classes, rest } = this.props
      return (
          <div>
          <Header
            brand="NextJS Material Kit"
            rightLinks={<HeaderLinks />}
            fixed
            color="transparent"
            changeColorOnScroll={{
              height: 20,
              color : 'white'
            }}
            {...rest}
          />
          <div className={classes.container} style={{marginTop : 100}}>
            <div className={classNames(classes.main)}>
              <SectionCart/>
              <SectionRecommendation/>
            </div>
          </div>
          <Footer />
        </div>
      )
  }
}

export default withStyles(styles)(withRouter(CheckoutPage))