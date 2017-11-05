import React, { Component } from 'react'
import axios from 'axios'

export default class PairsList extends Component {
  constructor() {
    super()

    this.state = {
      pairs: []
    }
  }

  componentWillMount() {
    axios.get('/pairs').then( (response) => {
      console.log('response.data is ', response.data)
      this.setState({ pairs: response.data })
    })
  }

  render() {
    return(
      <div>
        <ul>
          { this.state.pairs.map( (pair, index) => (<li>Engineer 1: {pair.engineer1}   Engineer 2: {pair.engineer2}   Event: {pair.event}</li>)) }
        </ul>
      </div>
    )
  }
}