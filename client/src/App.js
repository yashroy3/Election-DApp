import React, { Component } from "react";
import Election from "./contracts/Election.json";
import Web3 from 'web3';
import Home from "./Home";
import Voters from "./Voters";
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from "./Admin.js";
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
      web3: null,
      loading:true,
      admin:false,
      voterId:0,
      account: null, 
      contract: null,
      voteProcess : false,
      candidatesCount:0,
      candidates:[],
      voters:[],
      votersCount:0,
      actvote:0,
      resultpage:false,
      voted:true,
      aadharid:0,
      password:null,
      name:null,
      age:0,
      addVoterPage: false,
      login:false
    };

    this.startvoting=this.startvoting.bind(this);
    this.stopvoting=this.stopvoting.bind(this);
    this.vote=this.vote.bind(this);
    this.viewResult=this.viewResult.bind(this);
    this.addVoter=this.addVoter.bind(this);
    this.add=this.add.bind(this);
    this.login=this.login.bind(this);
}

async componentWillMount() {
  await this.loadWeb3()
  await this.loadBlockchainData()
}

async loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
}

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const adminid="0xAb5228c0c9411fD957c516B61036986CbBE75d4B"
    if(this.state.account==adminid){
      this.setState({admin:true})
    }

    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Election.networks[networkId]
    if(networkData) {
      const instance = new web3.eth.Contract(Election.abi, networkData.address)
      this.setState({ instance })

      // Loading Candidates
      const candidatesCount = await instance.methods.candidatesCount().call()
      this.setState({ candidatesCount })
      for (var i = 1; i <= candidatesCount; i++) { 
        const candidate = await instance.methods.candidates(i).call()
        this.setState({
          candidates: [...this.state.candidates, candidate]
        })  
      }

      // Loading Voters
      let votersCount = await instance.methods.votersCount().call()
      votersCount++;
      this.setState({ votersCount })
      for (var i = 1; i < votersCount; i++) { 
        const voter = await instance.methods.voters(i).call()
        if (voter.password==accounts[0]){
          this.setState({voterId:i,aadharid: voter.aadharid,name:voter.name,age:voter.age,valid: true,password :voter.password,voted: voter.voted})
          console.log("voter present!",this.state)
        }
        this.setState({
          voters: [...this.state.voters, voter]
        })  
      }

      // Loading Vote status
      const voteProcess = await instance.methods.voteProcess().call()
      this.setState({voteProcess});

      const voted =await instance.methods.voter(accounts[0]).call()
      this.setState({voted});

      const actvote = await instance.methods.actvote().call()
      this.setState({actvote});

      this.setState({ web3, accounts, contract: instance });
      this.setState({ loading: false})
    } else {
      window.alert('Election Contract not deployed to detected network.')
    }
  }

  startvoting(){
    this.setState({ loading: true })
    this.state.instance.methods.startvoting().send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
    console.log("Voting Started !!")
  }

  stopvoting(){
    this.setState({ loading: true })
    this.state.instance.methods.stopvoting().send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
    console.log("Voting Stopped !!")
  }

  vote(id){
    this.setState({ loading: true })
    console.log(this.state.candidatesCount,id)
    this.state.instance.methods.vote(id,this.state.voterId).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
    console.log("Voted!",id)
  }

  addVoter(aadharid,name,age,password){
    this.setState({ loading: true })
    this.state.instance.methods.addVoter(aadharid,name,age,password).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
    console.log("Voter Added!")
  }

  login(aadharid,password){
    if((aadharid==this.state.aadharid) && (password==this.state.account)){
      this.setState({login:true})
    }
    else{
      window.location.reload();
      alert("Invalid Credential")
    }
    console.log(this.state.login)
  }
  
  viewResult(){
    this.setState({ loading: true })
    this.setState({viewresult:true})
    console.log("View Result Page")
    this.setState({ loading: false })
  }

  add(){
    this.setState({ loading: true })
    this.setState({addVoterPage:true})
    console.log("View Add Voter Page")
    this.setState({ loading: false })
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    else if(this.state.admin){
      return <Admin
      startvoting={this.startvoting}
      stopvoting={this.stopvoting}
      vote={this.vote}
      voted={this.state.voted}
      voteProcess={this.state.voteProcess}
      viewResult={this.viewResult}
      viewresult={this.state.viewresult}
      votersCount={this.state.votersCount}
      actvote={this.state.actvote}
      candidates={this.state.candidates}
      addVoter={this.addVoter}
      addVoterPage={this.state.addVoterPage}
      add={this.add}
    ></Admin>;
    }
    else if(this.state.login){
      return <Voters
        vote={this.vote}
        name={this.state.name}
        age={this.state.age}
        voted={this.state.voted}
        candidates={this.state.candidates}
        voteProcess={this.state.voteProcess}
      />
    }
    return (
      <div >
        {this.state.loading ? <div>Loading...</div>:
        <Home
            login={this.login}
          />
        }
      </div>
    );
  }
}

export default App;