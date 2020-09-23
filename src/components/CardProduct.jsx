import { withStyles } from '@material-ui/core'
import React, { Component } from 'react'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import CurrencyFormat from 'react-currency-format'
import StarRoundedIcon from '@material-ui/icons/StarRounded'
import Link from 'next/link'
import SkeletonLoader from "tiny-skeleton-loader-react"
import { withSnackbar } from 'notistack'
import Cookies from 'js-cookie'

import Button from "~/src/components/CustomButtons/Button.js";
import Config from '~/utils/Config'

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '~/utils/Redux'

class CardProduct extends Component {

    addCart=(data)=>{
        const { classes } = this.props
        if(Cookies.get('accessToken')){
            this.props.addCart({...data, qty : 1})
        }else{
            this.props.enqueueSnackbar('', {
                content: (key) => (
                <div key={key} className={classes.snackbar}>
                    <p>Silahkan login terlebih dahulu</p>
                </div>
                ),
            })
        }
    }

    render() {
        const { classes, data } = this.props
        return (
            <div className={classes.card}>
                {!this.props.skeleton ? 
                <Link href={'/product/'+data.id +'-'+ data.name.replace(/\s+/g, '-').toLowerCase()}>
                    <a>
                    <img src={data.images.large_urls[0]} alt={data.name} className={classes.image}/>
                    </a>
                </Link> : 
                <React.Fragment>
                    <SkeletonLoader width='100%' height='180px'/>
                </React.Fragment>}
                <div className={classes.content}>
                    {!this.props.skeleton ? 
                    <div>
                        <Link href={'/product/'+data.id +'-'+ data.name.replace(/\s+/g, '-').toLowerCase()}>
                            <a>
                            <p className={classes.name}>{data.name}</p>
                            </a>
                        </Link>
                        <CurrencyFormat value={data.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} className={classes.price}/>
                        <div className={classes.rate}>
                            {data.rating.average_rate !== 0 &&
                            <React.Fragment>
                                <StarRoundedIcon/>
                                {data.rating.average_rate}
                            </React.Fragment>}
                            {data.stats.sold_count !== 0 && ' Terjual '+data.stats.sold_count}
                        </div>
                    </div> : 
                    <React.Fragment>
                        <SkeletonLoader width='100%' height='18px'/>
                        <SkeletonLoader width='100px' height='16px'/>
                    </React.Fragment>}
                    {!this.props.skeleton ? 
                    <Button disableRipple color='transparent' fullWidth className={classes.btn} onClick={this.addCart.bind(this, data)}>
                        Tambah Ke <ShoppingCartOutlinedIcon style={{marginLeft : 5}}/>
                    </Button> : 
                    <Button disableRipple color='transparent' fullWidth className={classes.btn}>
                        Tambah Ke <ShoppingCartOutlinedIcon style={{marginLeft : 5}}/>
                    </Button>}
                </div>
            </div>
        )
    }
}

const styles = {
    card : {
        height : 337,
        border : '1px solid #ddd',
        borderRadius : 5,
        transition: "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover,&:focus": {
            boxShadow:
              "0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)"
          }
    },
    image : {
        width : '100%',
        height : '180px',
        objectFit : 'cover',
        borderRadius : '5px 5px 0px 0px'
    },
    content : {
        padding : 10,
        height : 155,
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-between'
    },
    name : {
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        lineHeight : 1.2,
        height : 32,
        marginBottom : 5,
        color : '#3c4858',
        '&:hover' : {
            textDecoration : 'underline'
        }
    },
    btn : {
        height : 40,
        textTransform : 'capitalize',
        fontSize : 16,
        transition: "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
            backgroundColor : Config.primaryColor,
            color : '#fff',
         boxShadow:
            "0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)"
        } 
    },
    wrapperPrice : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    price : {
        fontWeight : 'bold',
        fontSize : 18
        // color : Config.primaryColor
    },
    rate : {
        display : 'flex',
        alignItems : 'center',
        color : Config.primaryColor,
        fontSize : 14,
        marginTop : 5
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
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(withSnackbar(CardProduct)))