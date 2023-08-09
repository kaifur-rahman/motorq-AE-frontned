import React from "react";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Button, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

//custom components
import ApplyForm from "./ApplyFormModal";

function ApplyRequest() {
    const [showForm,setShowForm]=React.useState(false);
    const[formSelected,setFormSelected]=React.useState('');
    const [workflows, setWorkflows] = React.useState([]);

  React.useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      const response = await axios.get("http://localhost:4000/workflow/all");
      setWorkflows(response.data);
    } catch (error) {
      console.error("Error fetching workflows:", error);
    }
  };

  const handleButtonClick = (workflowId) => {
    //setting id of form clicked
    setFormSelected(workflowId);
    setShowForm(true);
  };

  return (
    <>
      <h1>Apply Request</h1>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        {workflows.map(workflow => (
          <Box key={workflow._id}>
            <Button onClick={() => handleButtonClick(workflow._id)}>
              <ApplyForm formDetails={workflow}></ApplyForm>
            </Button>
          </Box>
        ))}
      </Stack>
    </>
  );
}

export default ApplyRequest;
