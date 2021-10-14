import React from "react";
import { Stack, DefaultButton } from '@fluentui/react';
// import { DefaultButton } from '@fluentui/react/lib/Button';
import { ReactComponent as CreateImagePic } from "./CreateImage.svg";
import { useHistory } from "react-router-dom";

const CreateImage = () => {
    let history = useHistory();
return (
    <Stack>
                       <h1>Azure Picasso</h1>
    <DefaultButton text="Go Create" onClick={()=> {history.push("mint")}}/>
    <Stack>
    <CreateImagePic/>
  </Stack>
  </Stack>
);
}

export default CreateImage;