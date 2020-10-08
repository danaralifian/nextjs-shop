import { ButtonBase, withStyles, IconButton } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import React, { useEffect } from 'react'
import { Dialog, InputBase, TextField, Button } from "@material-ui/core";
import { useState } from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import axios from'axios'
import md5 from 'md5'
import Cookies from 'js-cookie'
import CircularProgress from '@material-ui/core/CircularProgress'

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '~/utils/Redux'

import logo from '~/public/assets/img/shop-logo.png'
import Config from '~/utils/Config'

function AuthForm(props) {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ rePassword, setRepassword ] = useState('')
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(false)
    const [ isRepasswordVisible, setIsRepasswordVisible] = useState(false)
    const [ isLogin, setIsLogin] = useState(true)
    const [ errLogin, setErrLogin] = useState('')
    const [ errSignUp, setErrSignUp] = useState('')
    const [isLoading, setLoading] = useState(false)

    const { classes } = props
    const rgx = /\S+@\S+\.\S+/ //regex email checker

    useEffect(()=>{

    })

    const signIn=()=>{  
        if(!rgx.test(email)){
            setErrLogin('Email format is wrong')
        }else{
            authLogin(email, password)
        }
    }

    const signUp=()=>{
        if(!rgx.test(email)){
            setErrSignUp('FEmail format is wrong')
        }else if(!email || !password || !rePassword){
            setErrSignUp('Mohon lengkapi form')
        }else if (password !== rePassword){
            setErrSignUp('Password not match')
        }else{
            setLoading(true)
            axios({
                method : 'POST',
                url : Config.BASE_URL+'/user',
                data : {
                    email : email,
                    password : md5(password)
                }
            })
            .then(res=>{
                authLogin(email, password)
                setErrSignUp('')
            })
            .catch(err=>{
                if(err.response.data.keyValue && err.response.data.keyValue.email === email){
                    setErrSignUp('Email telah digunakan')
                }
            })
            .finally(()=>setLoading(false))
        }
    }

    const authLogin = (emailSignIn,passwordSignIn)=>{
        setLoading(true)
        axios({
            method : 'POST',
            url : Config.BASE_URL+'/auth',
            data : {
                email : emailSignIn,
                password : md5(passwordSignIn)
            }
        })
        .then(res=>{
            Cookies.set('accessToken', res.data.accessToken, { expires: 7 })
            Cookies.set('email', res.data.email, { expires: 7 })
            Cookies.set('refreshToken', res.data.refreshToken, { expires: 7 })
            handleClose()
            setEmail('')
            setPassword('')
            setRepassword('')
            setErrLogin('')
        })
        .catch(err=>{
            setErrLogin(err.response.data.message)
        })
        .finally(()=>setLoading(false))
    }

    const handleClose = ()=>{
        props.openAuthModal(false)
    }

    return (
        <Dialog open={props.View.isOpenAuthModal} onClose={handleClose}>
            <div style={{position : 'flex', flexDirection : 'column'}}>
                <ButtonBase className={classes.btnClose} onClick={handleClose}>
                    <CloseRoundedIcon/>
                </ButtonBase>
                <div style={{flex : '1 1', padding : 24}}>
                <img src={logo} alt='MeShop' className={classes.logo}/>
                {isLogin ? 
                <React.Fragment>
                    <div className={classes.form} style={{padding : '0px 5px'}}>
                        <InputBase 
                            type='email' 
                            className={classes.input} 
                            placeholder='Email' 
                            fullWidth value={email} 
                            onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className={classes.form} style={{padding : '0px 5px'}}>
                        <InputBase 
                            type={isPasswordVisible ? 'text' : 'password'} 
                            className={classes.input} 
                            placeholder='Password' 
                            fullWidth value={password} 
                            onChange={(e)=>setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>{setIsPasswordVisible(!isPasswordVisible)}}
                                >
                                    {isPasswordVisible ? <Visibility className={classes.icon}/> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }/>
                    </div>
                    <small>{errLogin}</small>
                    <Button fullWidth onClick={signIn} className={classes.btnPrimary} style={{height : 40}}>
                    {isLoading ? 
                    <CircularProgress className={classes.loadingBar}/> : 'Login'}
                    </Button>
                </React.Fragment> : 
                <React.Fragment>
                    <div className={classes.form} style={{padding : '0px 5px'}}>
                        <InputBase 
                            type='email' 
                            className={classes.input} 
                            placeholder='Email' 
                            fullWidth value={email} 
                            onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className={classes.form} style={{padding : '0px 5px'}}>
                        <InputBase 
                            type={isPasswordVisible ? 'text' : 'password'} 
                            className={classes.input} 
                            placeholder='Password' 
                            fullWidth value={password} 
                            onChange={(e)=>setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>{setIsPasswordVisible(!isPasswordVisible)}}
                                >
                                    {isPasswordVisible ? <Visibility className={classes.icon}/> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }/>
                    </div>
                    <div className={classes.form} style={{padding : '0px 5px'}}>
                        <InputBase 
                            type={isRepasswordVisible ? 'text' : 'password'} 
                            className={classes.input} 
                            placeholder='Retype Password' 
                            fullWidth value={rePassword} 
                            onChange={(e)=>setRepassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>{setIsRepasswordVisible(!isRepasswordVisible)}}
                                >
                                    {isRepasswordVisible ? <Visibility className={classes.icon}/> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }/>
                    </div>
                    <small>{errSignUp}</small>
                    <Button fullWidth onClick={signUp} className={classes.btnPrimary} style={{height : 40}}>
                    {isLoading ? 
                    <CircularProgress className={classes.loadingBar}/> : 'Register'}
                    </Button>
                </React.Fragment>}
                <small>Email Tester : test@gmail.com , Pass : test123</small>
                </div>
                <div style={{padding : '10px 24px', borderTop : '1px solid #ddd'}}>
                {isLogin ? 
                    <p style={{textAlign : 'center'}}>Don't have an account yet? <strong className={classes.btn} onClick={()=>{setIsLogin(false)}}>Register</strong></p> : 
                    <p style={{textAlign : 'center'}}>Have an Account? <strong className={classes.btn} onClick={()=>{setIsLogin(true)}}>Login</strong></p>
                }
                </div>
            </div>
        </Dialog>
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
        fontFamily : Config.font,
        padding : 0
    },
    btnClose : {
        position : 'absolute',
        right : 10,
        top : 10,
        color : '#747474'
    },
    header : {
        textAlign : 'center'
    },
    logo : {
        width : '50%', 
        display : 'block', 
        margin : 'auto',
        marginBottom : 20
    },
    btn : {
        cursor : 'pointer'
    },
    icon : {
        color : Config.primaryColor
    },
    btnPrimary : {
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
        textTransform : 'capitalize',
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
  )(withStyles(styles)(AuthForm))