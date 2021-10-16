import React from "react";
import { Stack, DefaultButton } from '@fluentui/react';
import { ReactComponent as CreateImagePic } from "./CreateImage.svg";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import {
  mergeStyles,
  IStackItemStyles
} from "office-ui-fabric-react";

export const labelStyles = mergeStyles({
  // fontFamily: "Aharoni",
  // fontSize: "50px",
  paddingTop : "5%",
});

export const createImageStyles = mergeStyles({
  paddingTop: "3%",
  paddingLeft: "32%"
});


export const subLabel1Styles = mergeStyles({
 paddingLeft : "43%",
});

export const subLabel2Styles = mergeStyles({
  paddingLeft : "38%",
  paddingBottom: "3%"
 });

export const buttonStyles = mergeStyles({
  width:"150px",
});

export const buttonDivStyles = mergeStyles({
  paddingLeft: "43%",
});



const CreateImage = () => {
    let history = useHistory();
return (
    <Stack>
      <div className="container">
        <img className="text-center" style={{ paddingTop: "0%", paddingLeft:"20%", paddingBottom:"2%"}} src= "/images/logo.png" alt="logo"/>        
        <h4 className="text-center">{" Your portal to create NFTs with art powered by Azure AI"}</h4>
        
        <div className = "row" style={{ paddingTop: "3%"}}>
          <div className = "col text-center">
            <button className="btn btn-primary btn-lg" onClick={()=> {history.push("mint")}}> Start </button> &nbsp;
            <button className="btn btn-primary btn-lg" onClick={()=> {history.push("minted-tokens")}}> Show Minted Tokens </button>
          </div>
        </div>
        <div className="row" style={{ paddingTop: "4%"}}>
          <div className="col text-center">
          <img className="text-center" style={{ height: "350px", width:"500px"}} src= "/images/monalisa.jpg" alt="logo"/>                  
          </div>
        </div>
    </div>
  </Stack>
);
}

export default CreateImage;