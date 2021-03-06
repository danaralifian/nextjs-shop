import React, { Component } from 'react'
import Head from 'next/head'
import CheckoutPage from '../views/CheckoutPage/CheckoutPage'

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
          <title>MeShop - Your best shopping solution</title>
          <meta name="description" content="Your best shopping solution"></meta>
        
        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://demo1.danar.site/"></meta>
        <meta property="og:title" content="MeShop - Checkout"></meta>
        <meta property="og:description" content="Your best shopping solution"></meta>
        <meta property="og:image" content={require("~/public/assets/img/shop-favicon.png")}></meta>

        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:url" content="https://metatags.io/"></meta>
        <meta property="twitter:title" content="MeShop - Checkout"></meta>
        <meta property="twitter:description" content="Your best shopping solution"></meta>
        <meta property="twitter:image" content={require("~/public/assets/img/shop-favicon.png")}></meta>
        </Head>
        <CheckoutPage/>
      </React.Fragment>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index)