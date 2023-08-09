import React, { useState } from "react";
//dependencies 
import axios from "axios";
//mui components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
function Login(){
    
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    //for managing protected routes
    const [authenticated,setAuthenticated]=useState(false);
    const [userType,setUserType]=useState("");
    const [comment,setComment]=useState("");

    //sign in validation from backend
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:4000/users/login",{
          username:username,
          password:password,
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(response => {
            const ans=response.data;
            console.log(ans);
            //correct credentials
            if(ans.status==="Login success"){
                setAuthenticated(true);
                setUserType(ans[1])
                localStorage.setItem("isAuth","true")
                localStorage.setItem("uid",ans.userId)
                localStorage.setItem( "utype",ans.userType)
                
                if(ans.userType=="Admin"){
                    window.location.href="/auth/admin"
                }else if(ans.userType=="Requester"){
                    window.location.href="/auth/requester"
                }else if(ans.userType=="Approver"){
                    window.location.href="/auth/approver"
                }
            }
            //invalid password
            else if(ans.status==="Invalid Password"){
                setAuthenticated(false);
                setComment("Invalid Password");
            }else if(ans.status=="No user exist with given username"){
                setAuthenticated(false);
                setComment("No Such User Exist ");
                
            }
            console.log(comment);
          });
      };
    return (
        <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
            <Box>
                {/*page title*/}
            <Typography variant="h6" gutterBottom sx={{textAlign:'center',fontWeight:'bold',marginTop:'',position:'relative',top:'4rem'}}>
                    Sign In To Your Account
             </Typography>
             </Box>
             {/*inputs*/}   
            <Grid container direction="column" justifyContent="center" alignItems="center" sx={{marginTop:'3rem'}}>
            <Grid item sx={{marginTop:'3rem'}}>
                <TextField id="username" label="Username" variant="outlined" onChange={e=>(setUsername(e.target.value))} />
            </Grid>
            <Grid item sx={{marginTop:'1.5rem'}}>
                <TextField id="password" label="Password" type="password" autoComplete="current-password"  onChange={e=>(setPassword(e.target.value))}/>
            </Grid>
            <Typography variant="caption"sx={{color:'red',marginTop:'2.5rem',position:'relative',top:'0.5rem'}}>{comment}</Typography>
            <Grid item sx={{marginTop:'1.5rem'}}>
                <Button variant="contained" onClick={handleSubmit}>Sign In</Button>
            </Grid>
            </Grid>

        </Box>
      </Container>
    )
}
export default Login;