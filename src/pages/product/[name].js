import React, { Component } from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import _ from 'lodash'
import { withRouter } from 'next/router'
import Config from '~/utils/Config'
import ProductPage from '../../views/ProductPage/ProductPage'

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '~/utils/Redux'

class Product extends Component {

    componentDidMount() {
        if(localStorage.getItem('cart')){
           let cartItems = JSON.parse(localStorage.getItem('cart'))
            this.props.updateCart(cartItems) 
        }
    }
    
    static async getInitialProps(context) {
        const { name } = context.query
        let product = null
        const res = await fetch(
            Config.BASE_URL + '/shop/product/' + name,
            {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            }
          )
         
        if (!res.ok) {
            return {
            pageError: true,
        }
        } else {
            product = await res.json()
        }
        return {
            product : product,
        }
    }

    render() {
        const {product} = this.props
        let regex = /<[^>]*(>|$)|&nbsp;|<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;|(\r\n|\n|\r)/gm
        return (
            <div>
                {!this.props.pageError ? 
                <Head>
                    <title>MeShop - {product.data.name}</title>
                    <meta name="Description" content={this.props.product.data.description.replace(regex, '').substr(0,300)}></meta>
                    
                    <meta property="og:type" content={"website"}></meta>
                    <meta property="og:url" content={"https://demo1.danar.site/product/"+this.props.router.query.name}></meta>
                    <meta property="og:title" content={product.data.name}></meta>
                    <meta property="og:description" content={this.props.product.data.description.replace(regex, '').substr(0,300)}></meta>
                    <meta property="og:image" content={product.data.images.large_urls[0]}></meta>
            
                    <meta property="twitter:card" content="summary_large_image"></meta>
                    <meta property="twitter:url" content={"https://demo1.danar.site/product/"+this.props.router.query.name}></meta>
                    <meta property="twitter:title" content={product.data.name}></meta>
                    <meta property="twitter:description" content={this.props.product.data.description.replace(regex, '').substr(0,300)}></meta>
                    <meta property="twitter:image" content={product.data.images.large_urls[0]}></meta>
                </Head> : 
                <Head>
                    <title>MeShop - Produk tidak ditemukan</title>
                </Head>}
                <ProductPage 
                    pageError={this.props.pageError} 
                    productData={this.props.product}/>
            </div>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Product))