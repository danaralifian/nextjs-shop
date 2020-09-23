/*eslint-disable*/
import React from "react";
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import Cookies from 'js-cookie'
import Router, { withRouter } from "next/router"

// core components
import Button from "~/src/components/CustomButtons/Button.js";

import styles from "~/assets/jss/nextjs-material-kit/components/headerLinksStyle.js";
import { ButtonBase, Hidden } from "@material-ui/core";

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '~/utils/Redux'

const useStyles = makeStyles(styles);

function HeaderLinks(props) {
  const classes = useStyles();

  const handleOpen=()=>{
    props.openAuthModal(true)
  }

  const handleLogout = ()=>{
    Cookies.remove('accessToken')
    Cookies.remove('email')
    Cookies.remove('refreshToken')
    Router.push('/')
  }

  return (
    <List className={classes.list}>
      {/* <ListItem className={classes.listItem}>
        <Link href='/?nav=home'>
        <Button color="transparent" className={classes.navLink}>
          Home
        </Button>
        </Link>
      </ListItem> */}
      {/* <ListItem className={classes.listItem}>
        <Button color="transparent" className={classes.navLink} onClick={()=>{Router.push('/?nav=about', undefined, { shallow : true})}}>
          About Me
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button color="transparent" className={classes.navLink} onClick={()=>{Router.push('/?nav=experience', undefined, { shallow : true})}}>
          Experience
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button color="transparent" className={classes.navLink} onClick={()=>{Router.push('/?nav=portofolio', undefined, { shallow : true})}}>
          Portofolio
        </Button>
      </ListItem> */}
      <Hidden smDown>
        <ListItem className={classes.listItem}>
          <Link href='/checkout'>
            <a>
              <Button disableRipple color='transparent' className={classes.navLink} style={{background : 'transparent'}}>
                {props.View.cartItems.length !== 0 &&
                <div className={classes.badge}>
                  {props.View.cartItems.length}
                </div>}
                <ShoppingCartOutlinedIcon style={{color : '#3c4858'}}/>
              </Button>
            </a>
          </Link>
        </ListItem>
      </Hidden>
      {!Cookies.get('accessToken') ?
      <ListItem className={classes.listItem}>
        <Button onClick={handleOpen} style={{color : '#fff',borderRadius : 8, textTransform : 'capitalize', fontWeight : 'bold'}} className={classes.navLink} >
          Masuk
        </Button>
      </ListItem> : 
      <ListItem className={classes.listItem}>
      <Button onClick={handleLogout} style={{color : '#fff',borderRadius : 8, textTransform : 'capitalize', fontWeight : 'bold'}} className={classes.navLink} >
        Keluar
      </Button>
    </ListItem>}
    </List>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HeaderLinks))