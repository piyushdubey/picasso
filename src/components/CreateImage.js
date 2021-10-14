import React from "react";
import { Stack, DefaultButton } from '@fluentui/react';
import { ReactComponent as CreateImagePic } from "./CreateImage.svg";
import { useHistory } from "react-router-dom";

import {
  mergeStyles,
  IStackItemStyles
} from "office-ui-fabric-react";

export const labelStyles = mergeStyles({
  fontFamily: "Aharoni",
  fontSize: "50px",
  paddingLeft : "40%",
  paddingBottom: "2.5%"
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
      <h1 className={labelStyles}>Azure Picasso</h1>
      <h6 className={subLabel1Styles}>
        {
"Welcome to Azure Picasso."
        }</h6>
        <h6 className={subLabel2Styles}>
      {" Your portal to amplify your digital art  through Azure AI (GAN)."}</h6>
      <div className = {buttonDivStyles}>
    <button className={buttonStyles} onClick={()=> {history.push("mint")}}> Go Create </button>
    </div>
    <div className={createImageStyles}>
    <CreateImagePic/>
  </div>
  </Stack>
);
}

export default CreateImage;