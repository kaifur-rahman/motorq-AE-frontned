import * as React from 'react';
//dependencies
import axios from 'axios';
//mui components
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


//mui form components
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';


export default function FormDialog() {
    {/*closing and opening of form*/}
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    
     //states for determining workflow fields
    const[workflowTitle,setWorkflowTitle]=React.useState("");

     const [state, setState] = React.useState({
        firstName: true,
        lastName: false,
        startDate: false,
        endDate: false,
        amount: false,
        AmitSharma:true,
        PriyaVerma:false,
        description:false,
      });
    
      const handleChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };

      const { firstName, lastName, startDate,endDate,amount,AmitSharma,PriyaVerma,description } = state;
      
      {/*to update the state when changes*/}
      React.useEffect(() => {
      }, [state])

      const[status,setStatus]=React.useState("");
    //sending data to backend
    const handleCreate = () => {
        var newWorkflow = { ...state, title: workflowTitle };
      
        const formData = new URLSearchParams();
        for (const key in newWorkflow) {
          formData.append(key, newWorkflow[key]);
        }
      
        axios
          .post("http://localhost:4000/workflow/create", formData, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
          .then((response) => {
            setStatus(response.data);
            console.log(status);
          })
          .catch((error) => {
            console.error("Error sending data to backend:", error);
          });
      
        setOpen(false);
      };
  return (

    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Workflow
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>MotorQ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new workflow by adding fields required to apply.
          </DialogContentText>
          {/*textfields*/}
          <TextField id="standard-basic" label="Workflow Title" variant="standard" sx={{marginTop:'1.5rem',marginBottom:'1rem'}} onChange={e => setWorkflowTitle(e.target.value)} />
          <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={firstName} onChange={handleChange} name="firstName" />
            }
            label="First Name"
          />
          <FormControlLabel
            control={
              <Checkbox checked={lastName} onChange={handleChange} name="lastName" />
            }
            label="Last Name"
          />  
         <FormControlLabel
            control={
              <Checkbox checked={startDate} onChange={handleChange} name="startDate" />
            }
            label="Start Date"
          />  
         <FormControlLabel
            control={
              <Checkbox checked={endDate} onChange={handleChange} name="endDate" />
            }
            label="End Date"
          /> 
          <FormControlLabel
            control={
              <Checkbox checked={amount} onChange={handleChange} name="amount" />
            }
            label="Amount"
          />               
           <FormControlLabel
            control={
              <Checkbox checked={description} onChange={handleChange} name="description" />
            }
            label="Description / Comment"
          />      
            <Typography sx={{fontWeight:'bold'}}>Approvers:</Typography>                                                 
           <FormControlLabel
            control={
              <Checkbox checked={AmitSharma} onChange={handleChange} name="AmitSharma" />
            }
            label="Amit Sharma"
          />   
          <FormControlLabel
            control={
              <Checkbox checked={PriyaVerma} onChange={handleChange} name="PriyaVerma" />
            }
            label="Priya Verma"
          />                   
        </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}