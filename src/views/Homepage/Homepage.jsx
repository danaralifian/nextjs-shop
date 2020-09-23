import React, { Component } from 'react'
import background from '../../assets/static/assets/images/background.svg'
import Content from './sections/Content'

class Homepage extends Component {
    render() {
        return (
            <div>
                <img src={background} style={{width : '100%', height : 400, objectFit : 'cover'}}/>
                <Content/>
            </div>
        )
    }
}
export default Homepage