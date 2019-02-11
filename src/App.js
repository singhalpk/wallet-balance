import React, { Component } from 'react';
import logo from './image.png';
import rupee from './rupee.png';
import './App.css';

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
            userId: '',
            walletBalance: '',
            noWallet: '',
          }; 

  }


  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e)=>{
    e.preventDefault();
    this.setState({noWallet: ""});
    this.setState({walletBalance: ""});
    let url = 'http://localhost:8080/api/v1/wallet?id='+this.state.userId ;
    return fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'hii',
        }
      }).then(resp => resp.json()).then((resp) => { 
            if(resp.success ==="true" ){
              return this.setState({
                walletBalance: resp.wallet.balance,
              })
            } 
            else{
              return this.setState({
                noWallet: "Sorry! We don't have any wallet linked with this user id.",
              })
            }               
        }).catch(function(err){
          return err;
        })
  }

  render() {
    const { userId, noWallet, walletBalance,} = this.state;
    return (
      <div className="App">
        <img src={logo} alt=""/>
        <form onSubmit={this.handleSubmit}>
            <input className="input1" type="text" value={userId} name="userId" onChange={this.handleChange} placeholder="Please type your user id ..."/>
          <button className="input2" type="submit">Get Balance</button>
        </form>
        {(walletBalance !== '' )?(  <div className="showBalance">
          <div className="showBalance-div">
            <h2 className="walletbalance" style={{justifyContent:"center"}}>Your wallet balance is:</h2>
            <div className="walletbalance">
              <img className="rupeeImg" src={rupee} alt=""/>
              <div className="walletbalance-balance">{walletBalance}</div>
            </div>
          </div>
        </div>):(null)}
        {(noWallet !== '' )?(  <div className="showBalance">
          <div className="showBalance-div">
            <h2 className="walletbalance" style={{justifyContent:"center"}}>{noWallet}</h2>
          </div>
        </div>):(null)}
      </div>
    );
  }
}

export default App;
