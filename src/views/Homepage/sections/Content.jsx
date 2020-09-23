import React, { Component } from 'react'
import { Select } from 'antd'
import "antd/dist/antd.css";


const { Option } = Select

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records : [],
            selected : []
        }
    }
    

    componentDidMount() {
        let records = []
        for (let i = 0; i < 10; i++) {
            records.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
        }
        this.setState({records})
    }

    handleChange=(value)=>{
        let selected = this.state.selected
        selected.push(value)
        this.setState(value)
    }
    
    render() {
        return (
            <div>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={['a10', 'c12']}
                    onChange={this.handleChange}
                >
                    {this.state.records}
                </Select>
            </div>
        )
    }
}
