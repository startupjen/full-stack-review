import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import PairsList from './PairsList.jsx'
import RosterList from './RosterList.jsx'
import NewPairsForm from './NewPairsForm.jsx'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      rosterOrPairs: true,
      cohort: []
    }
    this.title = 'HRLA18 Pairings'
    this.onClickRoster = this.onClickRoster.bind(this)
    this.onClickPairs = this.onClickPairs.bind(this)
  }

  componentWillMount() {
    axios.get('/cohort')
      .then( (response) => {
        console.log('response.data is ', response.data)
        this.setState({ cohort: response.data })
      })
      .catch( (error) => console.log(error) )
  }

  onClickRoster() {
    this.setState({ rosterOrPairs: true })
  }

  onClickPairs() {
    this.setState({ rosterOrPairs: false })
  }

  render() {
    return(
      <div>
        <div className="title">{this.title}</div>
        <NewPairsForm cohort={this.state.cohort} />
        <div className="buttons-section">
          <button onClick={this.onClickRoster}>Roster</button>
          <button onClick={this.onClickPairs}>Pairs</button>
        </div>
        { this.state.rosterOrPairs ? <RosterList cohort={this.state.cohort} /> : <PairsList /> }
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))