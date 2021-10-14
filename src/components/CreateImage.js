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
        <h1 className="text-center" style={{ paddingTop: "10%"}}>Azure Picasso</h1>
        <h3 className="text-center" style={{ paddingTop: "2%"}}>{"Welcome to Azure Picasso."}</h3>
        <h4 className="text-center">{" Your portal to create NFTs with art powered by Azure AI"}</h4>
        
        <div className = "row" style={{ paddingTop: "3%"}}>
          <div className = "col text-center">
            <button className="btn btn-primary btn-lg" onClick={()=> {history.push("mint")}}> Start </button>
          </div>
        </div>
        <div className="row" style={{ paddingTop: "4%"}}>
          <div className="col text-center">
          <CreateImagePic/>
          </div>
        </div>
    </div>
  </Stack>
);
}

export default CreateImage;