import React, { Component } from 'react'

export default class RosterListEntry extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return(
      <div className="roster-list-entry">
        <div><img src={this.props.engineer.image} /></div>
        <div className="engineer-name">{this.props.engineer.name}</div>
        <div className="engineer-email">{this.props.engineer.email}</div>
      </div>
    )
  }
}