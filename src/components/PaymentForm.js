import React, { useEffect, useState } from 'react'
import {CardElement} from '@stripe/react-stripe-js';
import {useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios'
import Button from "~/src/components/CustomButtons/Button.js";
import { InputBase, withStyles, ButtonBase } from '@material-ui/core';
import CurrencyFormat from 'react-currency-format'
import { withSnackbar } from 'notistack'
import Cookies from 'js-cookie'
import CircularProgress from '@material-ui/core/CircularProgress'
import _ from 'lodash'

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '~/utils/Redux'

import Config from '~/utils/Config'
import { TrendingUpTwoTone } from '@material-ui/icons';

function PaymentForm(props) {
    //instance payment gateway
    const stripe = useStripe();
    const elements = useElements();
    const { classes } = props
    
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [cardInfo, setCardInfo] = useState({})

    useEffect(() => {
        props.onProgress(isLoading)
    })

    const onChange=(e)=>{
        setCardInfo(e)
    }

    const handleSubmit = () => {
        const { classes } = props
        if(_.isEmpty(cardInfo) || !name || !address){
            props.enqueueSnackbar('', {
                content: (key) => (
                <div key={key} className={classes.snackbar}>
                    <p>Mohon lengkapi form</p>
                </div>
                ),
              })
        }else if(cardInfo.complete){
            setLoading(true)
            paymentCheckout()
        }
    }

    const paymentCheckout=()=>{
        setLoading(true)
        axios({
            method : 'POST',
            url : Config.BASE_URL+'/test/payment',
            headers : {
                Authorization : 'Bearer '+Cookies.get('accessToken')
            },
            data : {
                amount : Math.ceil((props.View.amount / 14800)),
            }
        })
        .then(res=>{
            stripe.confirmCardPayment(res.data.clientSecret, {
                payment_method : {
                    card : elements.getElement(CardElement)
                }
            })
            .then(result=>{
                let record = {
                    carts : props.View.cartItems,
                    name : name,
                    address : address,
                    totalAmount : props.View.amount,
                    amountInDollar : result.paymentIntent.amount,
                    paymentId : result.paymentIntent.id,
                    status : result.paymentIntent.status,
                    receiptEmail : result.paymentIntent.receipt_email
                }
                confirmPayment(record)
            })
            .catch(err=>{
                setLoading(false)
                props.enqueueSnackbar('', {
                    content: (key) => (
                    <div key={key} className={classes.snackbar}>
                        <p>Terjadi kesalahan</p>
                    </div>
                    ),
                })
            })
        })
        .catch(err=>{
            setLoading(false)
            props.enqueueSnackbar('', {
                content: (key) => (
                <div key={key} className={classes.snackbar}>
                    {err.response.data.message === `you're unathorized` ? 
                    <p>Silahkan login terlebih dahulu</p> : 
                    <p>Terjadi kesalahan pembayaran</p>}
                </div>
                ),
            })
        })
    }

    const confirmPayment=(record)=>{
        setLoading(true)
        axios({
            method : 'POST',
            url : Config.BASE_URL + '/test/confirm-payment',
            headers : {
                Authorization : 'Bearer '+Cookies.get('accessToken')
            },
            data : {
                ...record
            }
        })
        .then(res=>{
            props.updateCart([])
            localStorage.removeItem('cart')
            setLoading(false)
            props.onClose()
            if(props.onSuccess){
                props.onSuccess(true)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(setLoading(false))
    }
    return (
        <form>
            <div className={classes.form} style={{padding : '0px 5px'}}>
                <InputBase className={classes.input} placeholder='Nama Anda' fullWidth value={name} style={{padding : 0}} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className={classes.form} style={{padding : '0px 5px'}}>
                <InputBase className={classes.input} placeholder='Alamat' fullWidth value={address} style={{padding : 0}} onChange={(e)=>setAddress(e.target.value)}/>
            </div>
            <div className={classes.form} style={{padding : '6px 5px 7px'}}>
                <CardElement
                    onChange={onChange}
                    options={{
                        style: {
                        base: {
                            fontFamily : Config.font,
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                            color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                        },
                    }}
                />
            </div>  
            <div style={{display : 'flex', flexDirection : 'column'}}>
            {cardInfo.error &&<small style={{color : '#f44336'}}>{cardInfo.error.message}</small>}
            <label>Contoh : 4242 4242 4242 4242 - 04/24 - 242 - 42424 (Visa uji coba)</label>
            {/* <label>
                Jumlah pembayaran akan dikonversi ke mata uang dollar, dengan asumsi kurs Rp14,800. <br/>jumlah pembayaran Anda dalam mata uang dollar
                <CurrencyFormat value={Math.ceil(props.View.amount/14800)} displayType={'text'} thousandSeparator={true} prefix={'$'} className={classes.price}/>
            </label> */}
            </div>
            <ButtonBase className={classes.btnPay} onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 
                <CircularProgress className={classes.loadingBar}/> : 
                <React.Fragment>
                    Bayar <CurrencyFormat value={props.View.amount} displayType={'text'} thousandSeparator={true} prefix={'Rp'} className={classes.price}/>
                </React.Fragment>}
            </ButtonBase>      
        </form>
    )
}

const styles = {
    form : {
        border : '1px solid #ddd',
        backgroundColor : '#f5f5f5',
        marginBottom : 10,
        borderRadius : 3
    },
    input : {
        fontFamily : Config.font
    },
    price : {
        marginLeft : 5
    },
    snackbar : {
        '& p' : {
          margin : 0,
          fontSize : 16,
        },
        padding : '15px 20px',
        width : 344,
        borderLeft : '5px solid #f44336',
        backgroundColor : '#fff',
        borderRadius : 5,
        boxShadow:
        "0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)"
    },
    btnPay : {
        fontSize: 16,
        color: '#fff',
        borderRadius: 3,
        padding : '12px 30px',
        backgroundColor : Config.primaryColor,
        marginTop : 15, 
        height : 38,
        width : '100%',
        fontFamily : Config.font,
        fontWeight : 'bold',
        boxShadow:
      "0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)",
      transition:
      "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover,&:focus": {
        color: "#FFFFFF",
        backgroundColor: Config.primaryColor,
        boxShadow:
          "0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)"
      },
    },
    loadingBar : {
        color : '#fff',
        width : '24px !important',
        height : '24px !important'
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(withSnackbar(PaymentForm)))