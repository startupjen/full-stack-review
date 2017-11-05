angular.module('myApp', [])
  .component('main', {
    controller: function($http) {
      this.cohort = []
      this.events = ['Pair Program', 
        'Whiteboard',
        'Junior Senior',
        'Other',
        'Activity #1',
        'Activity #2',
        'Activity #3'] // hard coded for client
      this.pairs = []
      this.view = 'roster'
      this.pair1 = ''
      this.pair2 = ''
      this.event = ''
      this.misc = ''
      
      this.getRequest = () => {
        console.log('sending GET for /cohort and /pair')

        $http({
          method: 'GET',
          url: 'http://localhost:3000/cohort',
        }).then((response) => {
            console.log('GET /cohort success response', response)
            this.cohort = response.data
          }, (response) => {
            console.log('GET /cohort error response', response)
          })

        $http({
          method: 'GET',
          url: 'http://localhost:3000/pair',
        }).then((response) => {
            console.log('GET /pair success response', response)
            this.pairs = response.data
          }, (response) => {
            console.log('GET /pair error response', response)
          })

      }

      this.submitPairs = () => {
        console.log('submitting pair')
        $http({
          method: 'POST',
          url: 'http://localhost:3000/pair',
          data: {
            engineer1: this.pair1,
            engineer2: this.pair2,
            event: this.event,
            misc: this.misc
          }
        }).then((response) => {
            console.log('POST /pair success response', response)

            this.pair1 = ''
            this.pair2 = ''
            this.event = ''
            this.misc = ''

            this.pairs.push(response.data);
          }, (response) => {
            console.log('POST /pair error response', response)
          })
      }

      this.seeRoster = () => {
        this.view = 'roster'
      }

      this.seePairs = () => {
        this.view = 'pairs'
      }

      this.$onInit = () => {
        this.getRequest()
      }

      // convenience function for checking current info in controller
      this.checkStuff = () => {
        console.log(this)
      }

    },
    template: 
    `<div>
      <button ng-click="$ctrl.checkStuff()">Check ctrl</button>
      <br><br>

      Engineer 1:
      <select ng-model="$ctrl.pair1">
        <option ng-repeat="student in $ctrl.cohort">{{student.name}}</option>
      </select>

      Engineer 2:
      <select ng-model="$ctrl.pair2">
        <option ng-repeat="student in $ctrl.cohort">{{student.name}}</option>
      </select>

      Event:
      <select ng-model="$ctrl.event">
        <option ng-repeat="item in $ctrl.events">{{item}}</option>
      </select>

      Misc:
      <textarea ng-model="$ctrl.misc"></textarea>
      <br><br>

      <button ng-click="$ctrl.submitPairs()">Submit New Pairs</button>
      <br><br>

      <button ng-click="$ctrl.seeRoster()">Roster</button>
      <button ng-click="$ctrl.seePairs()">Pairs</button>
      <br><br>

      <div ng-if="$ctrl.view === 'roster'" ng-repeat="student in $ctrl.cohort">{{student.name}} : {{student.email}}</div>
      
      <div ng-if="$ctrl.view === 'pairs'" ng-repeat="pairData in $ctrl.pairs track by $index" key="$index">#1: {{pairData.engineer1}}, #2: {{pairData.engineer2}}, For: {{pairData.event}}, Misc: {{pairData.misc}}</div>
    </div>`
  })

  // <input ng-model="$ctrl.pair1"></input>
  // <input ng-model="$ctrl.pair2"></input>
  // <input ng-model="$ctrl.event"></input>
