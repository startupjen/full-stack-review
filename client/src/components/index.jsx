import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import PairsList from './PairsList.jsx'
import RosterList from './RosterList.jsx'
import NewPairsForm from './NewPairsForm.jsx'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      rosterOrPairs: true
    }
    this.title = 'HRLA18 Pairings'
    this.onClickRoster = this.onClickRoster.bind(this)
    this.onClickPairs = this.onClickPairs.bind(this)
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
        <NewPairsForm />
        <div className="buttons-section">
          <button onClick={this.onClickRoster}>Roster</button>
          <button onClick={this.onClickPairs}>Pairs</button>
        </div>
        { this.state.rosterOrPairs ? <RosterList /> : <PairsList /> }
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))