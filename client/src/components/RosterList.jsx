import React, { Component } from 'react'
import axios from 'axios'
import RosterListEntry from './RosterListEntry.jsx'

export default class RosterList extends Component {
  constructor() {
    super()
    this.state = {
      cohort: []
    }
  }

  componentWillMount() {
    axios.get('/cohort')
      .then( (response) => {
        console.log('response.data is ', response.data)
        this.setState({ cohort: response.data })
      })
      .catch( (error) => console.log(error) )
  }

  render() {
    return(
      <div>
        <div className="roster-grid">
          { this.state.cohort.map( (engineer, index) => (<RosterListEntry key={index} engineer={engineer} />)) }
        </div>
      </div>
    )
  }
}