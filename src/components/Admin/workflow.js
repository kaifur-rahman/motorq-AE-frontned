import React from "react";
//mui components
import IconButton from '@mui/material/IconButton';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Box from '@mui/material/Box';
//custom components
import NewForm from "./workFlowForm";
import { Typography } from "@mui/material";
function Workflow(){
    return(
        <>
        <Box sx={{position:'relative',top:'5rem',color:'#2196f3'}}>
        <AddTaskIcon sx={{fontSize:'8rem'}} />
        <NewForm></NewForm>
      </Box>
        </>
    )
}
export default Workflow;
