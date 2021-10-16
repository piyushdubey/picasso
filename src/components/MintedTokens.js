import Web3 from 'web3'
import './App.css';
import Picasso from '../abis/Picasso.json';
import React,{Component} from 'react';


import {
  mergeStyles
} from "office-ui-fabric-react";

export const page = mergeStyles({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin:"0px",
  padding: "0px"
});

export const container = mergeStyles({
  height: "530px",
  width: "700px",
  borderRadius: "10px",
  backgroundColor: "grey",
  marginTop:"8%",
  padding: "0px"
});

export const heading = mergeStyles({
  textAlign: "center",
  fontWeight: "bold",
  marginTop: "3%",
  marginBottom:"3%",
  padding: "0px"
});

export const imgHolder = mergeStyles({
  width: "600px",
  height: "300px",
  border: "3px solid black",
  borderRadius: "5px",
  marginTop: "10%",
  margin: "auto",
});


export const img = mergeStyles({
  width: "600px",
  height:"300px",
  objectFit: "cover",
  marginTop: "10%",
  padding: "0px",
  margin: "auto"
});

export const inputimg = mergeStyles({
  display: "none"
});

export const label = mergeStyles({
  width : "100%",
  marginTop:"1 rem",
  display: "flex",
  justifyContent: "center",
  margin:"0px",
  padding: "0px"
});

export const imgUpload = mergeStyles({
  marginTop: "10%",
  width : "200px",
  height: "40px",
  backgroundColor: "black",
  color: "white",
  borderRadius: "10px",
  textAlign: "center",
  cursor: "pointer",
  padding: "0px"
});

export const generateNewArtStyle = mergeStyles({
  marginTop: "9.8%",
  width : "200px",
  height: "42px",
  backgroundColor: "black",
  color: "white",
  borderRadius: "10px",
  textAlign: "center",
  cursor: "pointer",
  padding: "10px"
});



class MintedTokens extends Component {

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

    const networkId = await web3.eth.net.getId()
    const networkData = Picasso.networks[networkId]
    console.log("networkData:", networkData)
    if(networkData) {
      const abi = Picasso.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      console.log("contract:", contract)
      console.log("this.state.account:", this.state.account)
      const totalMinted = await contract.methods.balanceOf(this.state.account).call()
      this.setState({ totalMinted })

      console.log("total minted:", totalMinted)

      // Load images
      for (var i = 0; i < totalMinted; i++) {
        const tokenId = await contract.methods.tokenOfOwnerByIndex(this.state.account, i).call()
        const tokenURI = await contract.methods.tokenURI(tokenId).call()
        console.log('tokenUri=')
        console.log(tokenURI)
        this.setState({
          tokenURIs: [...this.state.tokenURIs, tokenURI]
        })
      }

      console.log(this.state.tokenURIs)
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  mint = (account, tokenURI) => {
    console.log('account=')
    console.log(account)
    console.log('tokenUri=')
    console.log(tokenURI)
    this.state.contract.methods.mintNFT(account, tokenURI).send({ from: account })
    .once('receipt', (receipt) => {
      console.log(receipt)
      this.setState({
        tokenURIs: [...this.state.tokenURIs, tokenURI]
      })
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      contract: null,
      totalMinted: 0,
      tokenURIs: []
    };
  }
  
  render() {
    return (
      <div className="container">
        <img className="text-center" style={{ paddingTop: "0%", paddingLeft:"20%"}} src= "/images/logo.png" alt="logo"/>        
        <h3 className="text-center" style={{ paddingTop: "0%"}}>{"Welcome to Azure Picasso."}</h3>
        <h4 className="text-center">{" Your portal to create NFTs with art powered by Azure AI"}</h4>
        <br/>
        <h4 className="text-left headerStyle" style={{ paddingTop: "3%"}}>Your Minted Tokens</h4>
        
        <div className="row">
            { 
              this.state.tokenURIs.map((tokenURI, key) => {
                return(
                  <div key={key} className="col-md-3" style={{ padding: "2%"}}>
                     <div class="row">
                      
                      <img src={tokenURI} className="img-thumbnail"/>
                   
                      <div class="col text-start">
                        Minted Token #{Math.floor(Math.random() * 2000)}
                      </div>
                      <div class="col text-end">
                        Price: <i class='fab fa-ethereum'></i> {(Math.random() * 10).toFixed(2)}
                        
                      </div>
                    </div>
                  </div>
                )
              })
            }
        </div>
      </div>
    );
  }
}


export default MintedTokens;