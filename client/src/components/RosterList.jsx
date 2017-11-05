import React, { Component } from 'react'
import axios from 'axios'
import RosterListEntry from './RosterListEntry.jsx'

export default class RosterList extends Component {
  constructor() {
    super()
  }

  render() {
    return(
      <div>
        <div className="roster-grid">
          { this.props.cohort.map( (engineer, index) => (<RosterListEntry key={index} engineer={engineer} />)) }
        </div>
      </div>
    )
  }
}