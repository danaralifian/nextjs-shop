import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { Dialog, DialogContent, DialogTitle, withStyles, ButtonBase } from '@material-ui/core'
import withWidth from '@material-ui/core/withWidth'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import CurrencyFormat from 'react-currency-format'
import _ from 'lodash'
import { withSnackbar } from 'notistack'
import Cookies from 'js-cookie'
import PaymentForm from '~/src/components/PaymentForm'

import Button from "~/src/components/CustomButtons/Button.js"
import styles from './styles'
import StripeLogo from '~/assets/img/stripe_logo.png'

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '~/utils/Redux'

class SectionCart extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      products : [],
      total : 0,
      totalItem : 0,
      open : false,
      paymentProgress : false
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      products : nextProps.View.cartItems
    },()=>this.countTotal())
  }

  componentDidMount() {
    this.setState({
      products : this.props.View.cartItems
    },()=>this.countTotal())
  }

  handleCount=(name, id)=>{
    let records = Object.assign(this.state.products)
    let record = _.find(records, {id : id})
    if(name === 'increase'){
      record.qty = record.qty + 1
    }else{
      if(record.qty > 1){
        record.qty = record.qty - 1
      }
    }
    this.setState({
      products : records
    },()=>{
      this.updateCart()
      this.countTotal()
    })
  }

  handleDelete=(id)=>{
    let products = this.state.products.filter(el => el.id !== id)
    this.setState({
      products
    },()=>this.updateCart())
  }

  updateCart=()=>{
    this.props.updateCart(this.state.products)
  }

  countTotal=()=>{
    let total = 0
    let totalItem = 0
    this.state.products.map((obj)=>{
      total = total + (obj.price * obj.qty)
      totalItem = totalItem + obj.qty
    })
    this.setState({total, totalItem})
  }

  checkout=()=>{
    const { classes } = this.props
    if(Cookies.get('accessToken')){
      if(this.props.View.cartItems.length === 0){
        this.props.enqueueSnackbar('', {
          content: (key) => (
          <div key={key} className={classes.snackbar}>
            <p>The shopping cart is empty, please add items</p>
          </div>
          ),
        })
      }else{
        this.setState({
          open : true
        },()=>{
          this.props.setAmount(this.state.total)
        })
      }
    }else{
      this.props.enqueueSnackbar('', {
        content: (key) => (
        <div key={key} className={classes.snackbar}>
          <p>Please login first</p>
        </div>
        ),
      })
    }
  }

  onClose=()=>{
    if(!this.state.paymentProgress){
      this.setState({open : false})
    }
  }

  onSuccess=(status)=>{
    const { classes } = this.props
    if(status){
      this.props.enqueueSnackbar('', {
        content: (key) => (
        <div key={key} className={classes.snackbar}>
            <p>Your payment was successful</p>
        </div>
        ),
      })
    }
  }

  onProgress=(status)=>{
    this.setState({
      paymentProgress : status
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <h2 className={classes.sectionTitle}>Shopping Cart</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {this.state.products.map((obj,key)=>
              <div key={key} className={classes.cart}>
                <div style={{width : 110, marginRight : 10}}>
                <img src={obj.images.large_urls[0]} alt={obj.name} className={classes.imageCart}/>
                </div>
                <div style={{width : '80%'}}>
                  <p className={classes.name}>{obj.name}</p>
                  <strong>
                    <CurrencyFormat value={obj.price*obj.qty} displayType={'text'} thousandSeparator={true} prefix={'Rp'}/>
                  </strong><br/>
                  <div className={classes.counterWrapper}>
                    <Button color='transparent' className={classes.btnDelete} onClick={this.handleDelete.bind(this, obj.id)}>
                      Delete
                    </Button>
                    <Button
                      className={classes.btnDecreament}
                      onClick={this.handleCount.bind(this,'decrease',obj.id)}
                    >
                      -
                    </Button>
                    <p className={classes.count}>{obj.qty}</p>
                    <Button
                      className={classes.btnIncreament}
                      onClick={this.handleCount.bind(this,'increase',obj.id)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <div style={{border : '1px solid #ddd', borderRadius : 5, padding : 15}}>
              <p style={{fontSize : 16}}><strong>Total Payment</strong></p>
              <p style={{margin : 0}}>Total item  : {this.state.totalItem}</p>
              <p style={{margin : 0, fontWeight : 'bold', fontSize : 20, marginBottom : 10}}>
                <CurrencyFormat value={this.state.total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} className={classes.price}/>
              </p>
              <Button fullWidth style={{textTransform : 'capitalize'}} onClick={this.checkout}>
                Order now
              </Button>
            </div>
          </Grid>
        </Grid>
        <Dialog open={this.state.open} onClose={this.onClose} fullWidth maxWidth={'sm'} fullScreen={this.props.width === 'xs'}>
          <div style={{position : 'relative'}}>
            <ButtonBase className={classes.btnClose} onClick={this.onClose}>
              <CloseRoundedIcon/>
            </ButtonBase>
            <DialogTitle className={classes.payment} style={{paddingBottom : 0}}>
              Payment Details
            </DialogTitle>
            <DialogContent style={{padding : 24}}>
              <PaymentForm 
                onClose={this.onClose} 
                onSuccess={this.onSuccess}
                onProgress={this.onProgress}/>
              <div className={classes.paymentProvider}>
                <p>Powered by</p>
                <img src={StripeLogo} style={{width : '10%'}} alt='powered by stripe'/>
              </div>
            </DialogContent>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withSnackbar(withWidth()(SectionCart))))