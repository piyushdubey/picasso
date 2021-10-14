
import axios from 'axios'; 
import React,{Component} from 'react';
import { Link, useHistory } from "react-router-dom";
import {BlobServiceClient, ContainerClient} from '@azure/storage-blob'

 
class UploadImage extends Component {
  
    state = {
 
      // Initially, no file is selected
      selectedFile: null,
      data: { image_urls: [["https://mlopsvarmaamlsa.blob.core.windows.net/styleai/Vangough.png"]] }
    };
    
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

      const blobClient= containerClient.getBlockBlobClient(this.state.selectedFile.name);
      const options = {blobHTTPHeaders: {blobContentType: this.state.selectedFile.type}};

      // upload file to blob 
      await blobClient.uploadBrowserData(this.state.selectedFile, options); 

      let fileUrl = `https://mlopsvarmaamlsa.blob.core.windows.net/styleai/${this.state.selectedFile.name}}`
      console.log(fileUrl);

      console.log("hello2");  
      const article = { title: 'Axios POST Request Example' };
      const response = await axios.post('https://reqres.in/api/articles', article);
      console.log(response);
    
    var context = this;
    context.setState({data: { image_urls: [["https://mlopsvarmaamlsa.blob.core.windows.net/original-styled-images/Vangough_styled_1.png"],["https://mlopsvarmaamlsa.blob.core.windows.net/original-styled-images/Vangough_styled_2.png"],["https://mlopsvarmaamlsa.blob.core.windows.net/original-styled-images/Vangough_styled_3.png"],["https://mlopsvarmaamlsa.blob.core.windows.net/original-styled-images/Vangough_styled_4.png"],["https://mlopsvarmaamlsa.blob.core.windows.net/original-styled-images/Vangough_styled_5.png"],["https://mlopsvarmaamlsa.blob.core.windows.net/original-styled-images/Vangough_styled_6.png"]] }});
   // this.setState({data: response});    
    console.log(response.data.id);


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
    
    render() {
    
      return (
        <div>                       
            <h3>
              Upload Your Creation!
            </h3>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload.bind(this)}>
                  Generate new art!
                </button>
            </div>    
            <br/>      
          <div className="Container">
              {
                this.state.data.image_urls.map(image => (
                    <div className= "image-card" key={image}>
                        <label>
                        <input type="radio" name="test" onChange={(e) => this.handleOnChange(e)} value={image}/>
                        <img id="" className="image" src={image}  />
                        </label>
                    </div> 
              ))}   
              </div> 
              <Link to="/mint" onClick={(e) => this.handleClick()} className="btn btn-primary">Mint NFT</Link>
              {/*<button onClick={(e) => this.history.push("/mint")}>Mint NFT</button>*/}
        </div>
      );
    }
  }
 
  export default UploadImage;