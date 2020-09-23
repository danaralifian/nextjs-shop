import React, { Component } from 'react'
import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core'
import CurrencyFormat from 'react-currency-format'
import _ from 'lodash'
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import StarRoundedIcon from '@material-ui/icons/StarRounded'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import InfoRoundedIcon from '@material-ui/icons/InfoRounded'
import parse from 'html-react-parser'
import { withSnackbar } from 'notistack'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { TwitterShareButton, EmailShareButton, FacebookShareButton, WhatsappShareButton,} from "react-share"
import { TwitterIcon, EmailIcon, FacebookIcon, WhatsappIcon } from "react-share"
import Cookies from 'js-cookie'

import Button from "~/src/components/CustomButtons/Button.js"
import styles from './styles'

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '~/utils/Redux'
import Router, { withRouter } from 'next/router'
import Config from '~/utils/Config'

class SectionProduct extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      products : [],
      total : 0
    }
  }

  addCart=(data)=>{
    const { classes } = this.props
    if(Cookies.get('accessToken')){
        let record = data
      record.qty = 1
      this.props.addCart(record)
      this.props.enqueueSnackbar('', {
        content: (key) => (
          <div key={key} className={classes.snackbar}>
            <p>Barang sudah ditambahkan ke keranjang</p>
          </div>
        ),
      })
    }else{
      this.props.enqueueSnackbar('', {
        content: (key) => (
        <div key={key} className={classes.snackbarErr}>
            <p>Silahkan login terlebih dahulu</p>
        </div>
        ),
      })
    }
  }

  checkoutNow=(data)=>{
    const { classes } = this.props
    if(Cookies.get('accessToken')){
      let record = data
      record.qty = 1
      this.props.addCart(record)
      Router.push('/checkout')
    }else{
      this.props.enqueueSnackbar('', {
        content: (key) => (
        <div key={key} className={classes.snackbarErr}>
            <p>Silahkan login terlebih dahulu</p>
        </div>
        ),
      })
    }
  }

  render() {
    const { classes, productData } = this.props
    return (
      <div>
        <div className={classes.breadcrumb}>
            <p>
              <Link href='/'><a style={{color : '#3c4858'}}>MeShop</a></Link> 
            </p>
            <NavigateNextOutlinedIcon/>
            <h1 className={classes.name}>{productData.data.name}</h1>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img src={productData.data.images.large_urls[0]} alt={productData.data.name} className={classes.productImage}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <h1 className={classes.productName}>{productData.data.name}</h1>
            {productData.data.rating.average_rate !== 0 &&
            <div className={classes.rating}>
              {[...Array(5)].map((obj,key)=>
                <StarRoundedIcon key={key} className={classes.rate}/>
              )}
              <p>{productData.data.rating.average_rate}</p>
              <p> | {productData.data.stats.sold_count !== 0 && ' Terjual '+ productData.data.stats.sold_count}</p>
            </div>}
            <p className={classes.price}>
              <CurrencyFormat value={productData.data.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'}/>
            </p>
            <p>Tersedia {productData.data.stock} stok barang</p>
            <div style={{display : 'flex'}}>
              <Button className={classes.hollow} onClick={this.addCart.bind(this, productData.data)}>Tambah Ke <ShoppingCartOutlinedIcon/></Button>
              <Button style={{marginLeft : 10}} onClick={this.checkoutNow.bind(this, productData.data)}>Beli Sekarang</Button>
            </div>
            <ul className={classes.ul}>
              <li>
                <VerifiedUserIcon/>
                <p>Product Guarantee, 100% uang kembali, bila rusak atau gak asli</p>
              </li>
              <li>
                <InfoRoundedIcon/>
                <p>Bayar sebelum jam 16:00 WIB agar barang dikirim hari ini</p>
              </li>
              <li>
                <InfoRoundedIcon/>
                <p>Waktu Proses 2 Hari Kerja</p>
              </li>
            </ul>
            <div>
              <div style={{display : 'flex', alignItems : 'center', flexWrap : 'wrap'}}>
                <p style={{cursor : 'pointer',display: 'flex', whiteSpace : 'nowrap'}}>Tambahkan ke Wishlist <FavoriteBorderIcon style={{ marginLeft : 5, marginRight : 10}}/> </p>
                <div style={{display : 'flex', alignItems : 'center'}}>
                  <p style={{marginRight : 8}}>Bagikan</p>
                  <FacebookShareButton url={Config.host+'/product/'+productData.data.id +'-'+ productData.data.name.replace(/\s+/g, '-')}>
                    <FacebookIcon style={{margin : 3}} size={32} round={true}/>
                  </FacebookShareButton>
                  <TwitterShareButton url={Config.host+'/product/'+productData.data.id +'-'+ productData.data.name.replace(/\s+/g, '-')}>
                    <TwitterIcon style={{margin : 3}} size={32} round={true}/>
                  </TwitterShareButton>
                  <WhatsappShareButton url={Config.host+'/product/'+productData.data.id +'-'+ productData.data.name.replace(/\s+/g, '-')}>
                    <WhatsappIcon style={{margin : 3}} size={32} round={true}/>
                  </WhatsappShareButton>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <h2 className={classes.description}>Spesifikasi Produk</h2>
        <div className={classes.spec}>
          <label className={classes.label}>Kategori</label>
          <p className={classes.contentSpec}>{productData.data.category.name}</p>
        </div>
        <div className={classes.spec}>
          <label className={classes.label}>Kondisi</label>
          <p className={classes.contentSpec}>{productData.data.condition}</p>
        </div>
        <div className={classes.spec}>
          <label className={classes.label}>Dikirim Dari</label>
          <p className={classes.contentSpec}>{productData.data.store.address.city} | {productData.data.store.address.province}</p>
        </div>
        <h2 className={classes.description}>Deskripsi Produk</h2>
        <div>
          {parse(productData.data.description)}
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(withSnackbar(SectionProduct))))