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

  //to store values of fields
  const [fname,setfname]=React.useState("");
  const [lname,setlname]=React.useState("");
  const [sdate,setsdate]=React.useState("");
  const [edate,setedate]=React.useState("");
  const [amt,setamt]=React.useState("");
  const [desc,setdesc]=React.useState("");

  //to create a request to db
 {/*Sending credentials for validating*/}
function handleApply(e){
  console.log(localStorage.getItem('uid'))
  e.preventDefault();
  axios.post("http://localhost:4000/request/apply",{
    wid:props.formDetails._id,
    uid:localStorage.getItem('uid'),
    fname:fname,
    lname:lname,
    sdate:sdate,
    edate:edate,
    amt:amt,
    desc:desc,
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => {
      const ans=response.data;
      setOpen(false);
    });
};

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {props.formDetails.title}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props.formDetails.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please fill the below details correctly to get the approval.
          </DialogContentText>
          {/*form inputs on the basis of workflow*/}

          {/*first name*/}
          {props.formDetails.firstname=="true"? <TextField id="standard-basic" label="First Name" variant="standard"onChange={e => setfname(e.target.value)} />:null}
          <br></br>
          {/*lastname*/}
          {props.formDetails.lastname=="true"? <TextField  sx={{marginTop:'2rem'}}id="standard-basic" label="Last Name" variant="standard" onChange={e=>setlname(e.target.value)} />:null}
          <br></br>
          {/*start date*/}
          
          {props.formDetails.startdate=="true"?<><Typography sx={{marginTop:'2rem'}}>Start Date</Typography><TextField type={"date"} id="standard-basic"  variant="standard" onChange={e=>setsdate(e.target.value)}/></> :null}
          <br></br>
          {/*end date*/}
          
          {props.formDetails.enddate=="true"?<><Typography sx={{marginTop:'2rem'}}>End Date</Typography><TextField type="date" defaultValue="" id="standard-basic" variant="standard" onChange={e=>setedate(e.target.value)}/></> :null}
            <br></br>
          {/*amount*/}
          {props.formDetails.amount=="true"? <TextField
          id="outlined-number" sx={{marginTop:'2rem'}}
          label="Amount"
          type="number"
          onChange={e=>setamt(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />:null}
          {/*approver*/}
          {props.formDetails.amitsharma=="true"&&props.formDetails.priyaverma=="true"?<><Typography sx={{fontWeight:'bold', marginTop:'1.2rem'}}>Approvers:</Typography><Typography>Amit Sharma Priya Verma</Typography></>:props.formDetails.amitsharma=="true"&&props.formDetails.priyaverma=="false"?<><Typography sx={{fontWeight:'bold', marginTop:'1.2rem'}}>Approvers:</Typography><Typography>Amit Sharma</Typography></>:props.formDetails.amitsharma=="false"&&props.formDetails.priyaverma=="true"?<><Typography sx={{fontWeight:'bold', marginTop:'1.2rem'}}>Approvers:</Typography><Typography>Priya Verma</Typography></>:props.formDetails.amitsharma=="false"&&props.formDetails.priyaverma=="false"?<><Typography sx={{fontWeight:'bold', marginTop:'1.2rem'}}>Approvers:</Typography><Typography>none</Typography></>:null}
          {/*description*/}
          {props.formDetails.desritpion=="true"?        <TextField
          id="outlined-multiline-flexible" sx={{marginTop:'2rem'}}
          label="Multiline"
          multiline
          maxRows={4}
          onChange={(e=>setdesc(e.target.value))}
        /> :null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApply}>Apply</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}