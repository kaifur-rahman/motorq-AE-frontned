import * as React from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ApplyForm(props) {
  const [open, setOpen] = React.useState(false);
  const [formsub,setformsub]=React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
//to approve, reject or justify request
function handleApprove(){
    //hit api endpoint to update request status
    axios.post("http://localhost:4000/request/approve",{
      reqid:props.data._id
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        //console.log(response.data);
        setOpen(false);
      });
}
function handleReject(){
    axios.post("http://localhost:4000/request/reject",{
        reqid:props.data._id
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(response => {
          //console.log(response.data);
          setOpen(false);
        });
}

function handleJustify(){

}
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {props.data.firstname}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Request ID: #{props.data._id}</DialogTitle>
        
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please read the below details correctly and approve/reject the request.
            <br></br>
            <Typography sx={{fontWeight:"bold"}}>Status:{props.data.status}</Typography>
          </DialogContentText>
          {/*form inputs on the basis of workflow*/}
        {/*first name*/}
          {props.data.firstname!=""? <TextField           InputProps={{
            readOnly: true,
          }} id="standard-basic"value={props.data.firstname} variant="standard" />:<TextField id="standard-basic" InputProps={{
            readOnly: true, 
          }} value={"NULL"} sx={{marginTop:"1rem"}}  label="First Name" variant="standard"/>}
          <br></br>
          {/*lastname*/}
          {props.data.lastname!=""?<TextField       sx={{marginTop:"1rem"}}     InputProps={{
            readOnly: true,
          }}id="standard-basic"value={props.data.lastname} variant="standard" />:<TextField id="standard-basic"   InputProps={{
            readOnly: true,
          }} value={"NULL"} sx={{marginTop:"1rem"}}  label="Last Name" variant="standard"/>}
        <br></br>
        {/*startdate*/}
        {props.data.startdate!=""?  <TextField           InputProps={{
            readOnly: true,
          }} id="standard-basic"value={props.data.startdate} variant="standard" />:<TextField sx={{marginTop:"1rem"}}  id="standard-basic"  InputProps={{
            readOnly: true,
          }} value={"NULL"}   label="Start Date" variant="standard"/>}
        <br></br>
       {/*enddate*/}
       {props.data.enddate!=""?  <TextField   sx={{marginTop:"1rem"}}         InputProps={{
            readOnly: true,
          }} id="standard-basic"value={props.data.enddate} variant="standard" />:<TextField id="standard-basic"  InputProps={{
            readOnly: true,
          }} value={"NULL"} sx={{marginTop:"1rem"}}  label="End Date" variant="standard"/>}
        <br></br>       
       {/*amount*/}
       {props.data.amount!=""?  <TextField  sx={{marginTop:"1rem"}}          InputProps={{
            readOnly: true,
          }} id="standard-basic"value={props.data.amount} variant="standard" />:<TextField id="standard-basic" InputProps={{
            readOnly: true,
          }} value={"NULL"} sx={{marginTop:"1rem"}}  label="Amount" variant="standard"/>}
        <br></br>
       {/*description*/}
       {props.data.description!=""?  <TextField   sx={{marginTop:"1rem"}}         InputProps={{
            readOnly: true,
          }} id="standard-basic"value={props.data.description} variant="standard" />:<TextField id="standard-basic" InputProps={{
            readOnly: true,
          }} value={"NULL"} sx={{marginTop:"1rem"}}  label="Description" variant="standard"/>}
        <br></br>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleJustify}>Justify</Button>
          <Button  onClick={handleApprove}>Approve</Button>
          <Button  onClick={handleReject}>Reject</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}