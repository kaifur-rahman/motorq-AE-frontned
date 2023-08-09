import React, { useEffect, useState } from "react";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import ApproveModal from "./approveFormModal";

function ApproverDashboard() {
  const [requests, setRequests] = useState([]);
  const uidd=localStorage.getItem('uid');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    axios.post("http://localhost:4000/request/all",{
      uid:uidd||localStorage.getItem('uid')
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        const ans=response.data;
        setRequests(ans);
        console.log(requests);
      });
  };
  return (
    <>
      <h1>Dashboard</h1>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        {requests.map((obj) => (
            <Box key={obj._id}> {/* to set a unique 'key' prop */}
            <ApproveModal data={obj}></ApproveModal>
            </Box>
  ))}
      </Stack>
    </>
  )
}
export default ApproverDashboard;