import React, { Component } from 'react'
import axios from 'axios'

export default class NewPairsForm extends Component {
  constructor() {
    super()
    this.state = {
      engineer1: '',
      engineer2: '',
      event: '',
      misc: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const field = event.target.name
    console.log('event is ', event)
    console.log('field is ', field)
    this.setState({ [field]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault() // disables default form behavior to reload page after submission
    console.log('event is ', event)

    const newPair = { 
      engineer1: this.state.engineer1,
      engineer2: this.state.engineer2,
      event: this.state.event,
      misc: this.state.misc
    }

    console.log('newPair is ', newPair )
    axios.post('/newPair', newPair)
      .then(function (response) { console.log('POST /newPair SUCCESSFUL ', response) })
      .catch(function (error) { console.log('POST /newPair ERROR ', error) })

    this.setState({ engineer1: '', engineer2: '', event: '', misc: '' })
  }

  render() {
    return(
      <div className="pairs-form">
        <form onSubmit={this.handleSubmit}>
            <div className="pairs-form-first-row">
              <div className="text-field">Engineer 1 <input type="text" value={this.state.engineer1} name="engineer1" onChange={this.handleChange} /></div>
              <div className="text-field">Engineer 2 <input type="text" value={this.state.engineer2} name="engineer2" onChange={this.handleChange} /></div>
              <div className="text-field">Event <input type="text" value={this.state.event} name="event" onChange={this.handleChange} /></div>
            </div>
            Misc<div className="textarea-field"><textarea value={this.state.misc} name="misc" onChange={this.handleChange} /></div>
            <div className="submit-button"><input type="submit" /></div>
        </form>
      </div>
    )
  }
}