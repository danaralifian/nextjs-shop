import React, { Component } from 'react'
import { Grid, withStyles } from '@material-ui/core'
import axios from 'axios'
import { BsFunnel } from "react-icons/bs"
import SortOutlinedIcon from '@material-ui/icons/SortOutlined'

import Button from "~/src/components/CustomButtons/Button.js";
import styles from './styles'
import Config from '~/utils/Config'

import CardProduct from '~/src/components/CardProduct'

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '~/utils/Redux'

class SectionProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetched : true,
      products : []
    }
  }
  
  componentDidMount() {
    this.getProducts()
  }
  
  getProducts=()=>{
    this.setState({isFetched : false})
    axios({
      url : Config.BASE_URL + '/shop/products',
      method : 'GET'
    })
    .then(res=>{
      this.setState({
        products : res.data.data
      })
    })
    .catch(err=>{

    })
    .finally(()=>{
      this.setState({isFetched : true})
    })
  }

  render() {
    const { classes } = this.props
    const { products } = this.state
    return (
      <div>
        <div style={{display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
        <h2 className={classes.sectionTitle}>Best Deals</h2>
        <div style={{display : 'flex'}}>
          <Button color='transparent' style={{textTransform : 'capitalize', padding : 12}}>
            <SortOutlinedIcon/>
            Sort by
          </Button>
          <Button color='transparent' style={{textTransform : 'capitalize', padding : 12}}>
            <BsFunnel/>
            Filter
          </Button>
        </div>
        </div>
        <Grid container spacing={2}>
          {this.state.isFetched && products.map((obj,key)=>
            <Grid key={key} item xs={6} sm={4} md={3}>
              <CardProduct
                data={obj}
              />
            </Grid>
          )}
          {!this.state.isFetched && [...Array(8)].map((obj,key)=>
          <Grid key={key} item xs={6} sm={4} md={3}>
            <CardProduct
              data={{}}
              skeleton
            />
          </Grid>
          )}
        </Grid>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SectionProduct))