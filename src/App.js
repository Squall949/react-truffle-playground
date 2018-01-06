import React, { Component } from 'react'
import LiveStreamContract from '../build/contracts/LiveStream.json'
import getWeb3 from './utils/getWeb3'
import Stream from './Stream'
import { Card } from 'semantic-ui-react'

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
      liveStream: null,
      streams: [],
      usersNames: new Map(),    //user_id / display_name
      userIndex: new Map(),     //user_id / index
      isSubscribed: new Map()   //user_id / address
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
    const contract = require('truffle-contract');
    const liveStream = contract(LiveStreamContract);
    liveStream.setProvider(this.state.web3.currentProvider);
    this.setState({ liveStream });

    this.state.web3.eth.getAccounts((error, accounts) => {
      if (error) {
        console.log(error);
      }
      
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
        this.state.isSubscribed.set(user.user_id, false);
      });
    }
    
    this.setState({ usersNames: this.state.usersNames });
    this.setState({ isSubscribed: this.state.isSubscribed });
  }

  subscribe = (userId, value, index) => {
    const account = this.state.accounts[0];

    this.state.liveStream.deployed().then((instance) => {
      // Since the owner is Account 1 (at array 0), the rest accounts starting from array 1, so the index of each stream should add 1
      this.state.web3.eth.sendTransaction({from: account, to: this.state.accounts[index+1], value: this.state.web3.toWei(value, "ether")}, (error, result) => {
        return instance.subscribe(userId, {from: account});
      })
    }).then((result) => {
      this.state.isSubscribed.set(userId, true);
      this.setState({ isSubscribed: this.state.isSubscribed });
    });
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">LiveStream Blockchain</a>
        </nav>
        <main className="ui cards fluid container main-container">
            <Card.Group itemsPerRow="2">
                {this.state.streams.map((stream, index) => (
                  <Stream key={stream.id} 
                  usersName={this.state.usersNames.get(stream.user_id)} 
                  imgSrc={stream.thumbnail_url.replace('{width}x{height}', '640x480')}
                  index={index} 
                  title={stream.title}
                  started_at={stream.started_at}
                  viewer_count={stream.viewer_count}
                  user_id={stream.user_id}
                  subscribe={this.subscribe} 
                  isSubscribed={this.state.isSubscribed} />
                ))}
            </Card.Group>
        </main>
      </div>
    );
  }
}

export default App
