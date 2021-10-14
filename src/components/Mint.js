import logo from '../logo.svg';
import Web3 from 'web3'
import './App.css';
import Picasso from '../abis/Picasso.json';
import axios from 'axios'; 
import React,{Component} from 'react';
import { Link } from "react-router-dom";
import {BlobServiceClient} from '@azure/storage-blob'


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



class Mint extends Component {

  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if(reader.readyState === 2) {
        this.setState({profileImg: reader.result})
        this.setState({ selectedFile: e.target.files[0] });
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }
    
  // On file select (from the pop up)
  onFileChange = event => {
  
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  
  };
  
  // handleClick
  handleClick = event => {
    // history.push("/mint")
  };

  // handle on change
  handleOnChange = event => {
    console.log("Selected value " + event.target.value);
    this.setState({ selectedOption: event.target.value });
  };

  // On file upload (click the upload button)
   onFileUpload = async () => {  

  
    const blobservice= new BlobServiceClient('https://mlopsvarmaamlsa.blob.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=co&sp=rwdlacuptfx&se=2021-10-30T07:13:29Z&st=2021-10-12T23:13:29Z&spr=https&sig=k%2FD4XLyZ7%2FHZJc%2B0idbr2WL0e9IEHmW%2FJEjDbWPK9HU%3D');
    const containerClient = blobservice.getContainerClient('styleai');
    console.log("selectedfile",this.state.selectedFile);
    console.log("selectedfileName",this.state.selectedFile.name);
   // console.log("filename",this.state.selectedFile.name);

    const blobClient= containerClient.getBlockBlobClient(this.state.selectedFile.name);
    const options = {blobHTTPHeaders: {blobContentType: this.state.selectedFile.type}};

    // upload file to blob 
    await blobClient.uploadBrowserData(this.state.selectedFile, options); 

    let fileUrl = `https://mlopsvarmaamlsa.blob.core.windows.net/styleai/${this.state.selectedFile.name}}`
    console.log(fileUrl);

    console.log("hello2");  
    const article = { title: 'Axios POST Request Example' };
    //const response = await axios.post('https://reqres.in/api/articles', article);
    const response = await axios.get(`https://hackpicasaapi.azurewebsites.net/arts/${this.state.selectedFile.name}`, article);
    console.log(response);
  
  var context = this;
  //context.setState({imageData: { image_urls: [["https://mlopsvarmaamlsa.blob.core.windows.net/original-styled-images/homescreen_styled_1.png"],["https://mlopsvarmaamlsa.blob.core.windows.net/original-styled-images/homescreen_styled_2.png"],["https://mlopsvarmaamlsa.blob.core.windows.net/original-styled-images/homescreen_styled_3.png"],["https://mlopsvarmaamlsa.blob.core.windows.net/original-styled-images/homescreen_styled_4.png"],["https://mlopsvarmaamlsa.blob.core.windows.net/original-styled-images/homescreen_styled_5.png"],["https://mlopsvarmaamlsa.blob.core.windows.net/original-styled-images/homescreen_styled_6.png"]] }});
  context.setState({imageData:response.data});
  console.log(response.data);


  };
  
  // File content to be displayed after
  // file upload is complete
  fileData = () => {
  
    if (this.state.selectedFile) {
       
      return (
        <div>
          <h2>File Details:</h2>
           
<p>File Name: {this.state.selectedFile.name}</p>

           
<p>File Type: {this.state.selectedFile.type}</p>

           
<p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>

        </div>
      );
    } else {
      return (
        <div>

        </div>
      );
    }
  };
  
  
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
    if(networkData) {
      const abi = Picasso.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const totalMinted = await contract.methods.totalMinted().call()
      this.setState({ totalMinted })

      console.log(totalMinted)

      // Load images
      for (var i = 1; i <= totalMinted; i++) {
        const tokenURI = await contract.methods.tokenURI(i).call()
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
      tokenURIs: [],
      selectedFile: null,
      selectedOption: null,
      imageData: [],
      profileImg : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }
  onChangeValue(event) {
    console.log(event.target.value);
    }

  render() {
    return (
      <div>
        <div>
            <div className={page}>                       
               <div className={container}>
                 <h3 className={heading}>Upload Your Creation!</h3>
                  <div className={imgHolder}>
                    <img src={this.state.profileImg} alt="" id="img" className={img}/>
                  </div>
                  <input type="file" name="img-upload" className={inputimg} id="input" accept="image/*" onChange={this.imageHandler} />
                      <div className={label}>
                        <label htmlFor="input" className={imgUpload}>
                          <i className="material-icons">add_photo_alternate</i>
                          Click here to upload
                        </label>
                      <button className={generateNewArtStyle} onClick={this.onFileUpload.bind(this)}>
                    Generate new art!
                   </button>
                      </div>
                </div>    
              </div>
              <div>
              </div>  
      <br/>      
      <div className="Container">
          {
            this.state.imageData.map(image => (
                <div className= "image-card" key={image}>
                    <label>
                    <input type="radio" name="test" onChange={(e) => this.handleOnChange(e)} value={image}/>
                    <img id="" className="image" src={image}  alt="art images"/>
                    </label>
                </div> 
          ))}   
          </div>                             
    </div> 
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const tokenURI = this.state.selectedOption
                  this.mint(this.state.account, tokenURI)
                }}>
                  {this.state.imageData.length>0 && (
                  <input
                    type='submit'
                    className={generateNewArtStyle}
                    value='MINT'
                  />)}
                </form>
              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center">
            { this.state.tokenURIs.map((tokenURI, key) => {
              return(
                <div key={key} className="col-md-3 mb-3">
                  <img src={tokenURI} className="token" style={{ backgroundColor: 'yellow' }} />
                  <div>{key}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      );
  }


}


export default Mint;
