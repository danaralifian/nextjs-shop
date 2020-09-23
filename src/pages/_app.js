import React from 'react'
import App from 'next/app'
import Router from "next/router"
import withGA from "next-ga"
import '~/assets/scss/nextjs-material-kit.scss'
import Store from '~/utils/store'
import { Provider as ReduxProvider } from 'react-redux'
import { SnackbarProvider } from 'notistack';
import {Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Config from '~/utils/Config'

class MyApp extends App {

  render() {
    const stripePromise = loadStripe('STRIPE_KEY');
    const { Component, pageProps } = this.props
    const styles = {
      success: { backgroundColor: 'purple' },
      error: { backgroundColor: 'blue' },
      warning: { backgroundColor: 'green' },
      info: { backgroundColor: 'yellow' },
  };
    return (
      <ReduxProvider store={Store}>
        <SnackbarProvider 
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          dense={false}
          transitionDuration={{
            enter: 225, 
            exit: 100 
           }}>
            <Elements stripe={stripePromise}>
              <Component {...pageProps} />
            </Elements>
        </SnackbarProvider>
      </ReduxProvider>
    )
  }
}

export default withGA("UA-154580794-1", Router)(MyApp)
