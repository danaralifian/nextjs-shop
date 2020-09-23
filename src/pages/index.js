import React, { Component } from 'react'
import Head from 'next/head'
import LandingPage from '../views/LandingPage/LandingPages'

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '~/utils/Redux'

class index extends Component {

  componentDidMount() {
    if(localStorage.getItem('cart')){
      let cartItems = JSON.parse(localStorage.getItem('cart'))
       this.props.updateCart(cartItems) 
    }
  }
  
  static async getInitialProps(context) {
    return{}
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>MeShop - Solusi terbaik belanja anda</title>
          <meta name="description" content="Solusi terbaik belanja anda"></meta>
        
        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://demo1.danar.site/"></meta>
        <meta property="og:title" content="MeShop"></meta>
        <meta property="og:description" content="Solusi terbaik belanja anda"></meta>
        <meta property="og:image" content={require("~/public/assets/img/shop-favicon.png")}></meta>

        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:url" content="https://metatags.io/"></meta>
        <meta property="twitter:title" content="MeShop"></meta>
        <meta property="twitter:description" content="Solusi terbaik belanja anda"></meta>
        <meta property="twitter:image" content={require("~/public/assets/img/shop-favicon.png")}></meta>
        </Head>
        <LandingPage/>
      </React.Fragment>
    )
  }
}
export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(index)