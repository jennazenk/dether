import React, {Component} from 'react'
import request from 'superagent'
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
//import AbieFund from '../../build/contracts/AbieFund.json'

import '../www/styles/Dether.scss'
import Toggle from 'react-toggle'
import Start from './Start'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {browserhistory} from 'react-router'


class Home extends Start {

  constructor(props) {
    super(props)
  }

  state = {
    web3: false,
    account: null,
    balance: null,
    detherBalance: null,
    detherAddress: null,
    buy: true,
    sell: false,
    withdraw: true
  }

  componentWillMount() {
    if (!window.isseller)
      window.isseller = false;

    if (window.isseller == true){
      this.setState({sell: true});
    }

    if(window.detherB == undefined) {
      window.detherB = 0;
    }
  }

  componentDidMount() {
    setTimeout(() => {

      this.setState({account: window.web3.eth.accounts[0] })

      web3.eth.getBalance(window.web3.eth.accounts[0], (err, res) => {
        if (!err) {
          var walletbalance = web3.fromWei(res, "ether").toNumber() + " ETH"
          this.setState({balance: walletbalance})
        } else {
            console.log(err);
        }
      })

    }, 1000)
  }

  goTeller = () => {
    window.location.assign('/#/sellerconfig')
  }

  goBuy = () => {
    window.location.assign('/#/buy')
  }

  goSell = () => {
    window.location.assign('/#/sell')
  }

  goWithdraw = () => {
    window.location.assign('/#/withdraw')
  }

  render() {
    return (
      <div className="container">
        <img className="logo2" src="https://raw.githubusercontent.com/Fukunaga42/dether/master/src/www/public/logoapp.jpg"></img>

        <p id="userinfo">Your wallet address : </p>
        <p>{this.state.account}</p>
        <p id="userinfo">Your metamask wallet balance : </p>
        <p>{this.state.balance}</p>
        <p id="userinfo">Your dether deposit balance : </p>
        <p>{window.detherB}</p>
        <p>
          <button id="buy" onClick={this.goBuy}> Buy </button>
        </p>
        <br/><br/>
        <label>
          <Toggle
            defaultChecked={this.state.sell}
            onChange={this.goTeller} />
          <span>&nbsp;&nbsp;</span>
          <span><button disabled={!this.state.sell} onClick={this.goSell}> Sell </button></span>
        </label>
        <br/><br/>
        <br/><br/>
        <button onClick={this.goWithdraw}> Withdraw </button>
      </div>
    )
  }
}

export default Home
