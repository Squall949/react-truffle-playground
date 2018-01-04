import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import LiveStreamContract from '../build/contracts/LiveStream.json'
import getWeb3 from './utils/getWeb3'
import Streams from './Streams'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accounts: null,
      web3: null,
      liveStreamInstance: null,
      streams: [],
      usersNames: new Map()
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    /*const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    });*/

    /* 
    * Main: Live Stream
    */

    const contract = require('truffle-contract');
    const liveStream = contract(LiveStreamContract);
    liveStream.setProvider(this.state.web3.currentProvider);

    liveStream.deployed().then((instance) => {
      this.setState({ liveStreamInstance: instance });
    });

    this.state.web3.eth.getAccounts((error, accounts) => {
      if (error) {
        console.log(error);
      }
      console.log(accounts);
      this.setState({accounts});
    });
  }

  componentDidMount() {
    if (this.state.streams.length === 0) {
      fetch('https://api.twitch.tv/helix/streams?first=8', {
        headers: new Headers({
          'Client-ID': '79j0omsqmakc5rday2fwbdy7iltkig'
        })
      })
      .then((resp) => resp.json()) // Transform the data into json
      .then((result) => {
        this.getUserNames(result.data);
        this.setState({ streams: result.data });
      });
    }
  }

  getUserNames(data) {
    if (!data) return;
    for (const user of data) {
      fetch(`https://api.twitch.tv/helix/users?id=${user.user_id}`, {
        headers: new Headers({
          'Client-ID': '79j0omsqmakc5rday2fwbdy7iltkig'
        })
      })
      .then((resp) => resp.json())
      .then((result) => {
        this.state.usersNames.set(user.user_id, result.data[0].display_name);
        this.setState({ usersNames: this.state.usersNames });
      });
    } 
  }

  subscribe = (userId) => {
    const account = this.state.accounts[0];

    this.state.liveStreamInstance.subscribe(userId, {from: account})
      .then(function(result) {
        console.log(result);
      }).catch(function(err) {
        console.log(err.message);
      });
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">LiveStream Blockchain</a>
        </nav>
        <Streams streams={this.state.streams} usersNames={this.state.usersNames} subscribe={this.subscribe} />
      </div>
    );
  }
}

export default App
