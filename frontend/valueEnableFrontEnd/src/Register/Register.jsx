import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

 

const theme = createTheme();

export default function SignUp() {
    const navigate= useNavigate()
    const [open,setOpen]= React.useState(false)
    const [message,setMessage]= React.useState("")
    const valdateForm=(data)=>{
        let status=true
        if(!data.firstname){
            status= false
            setMessage("Please enter first name")
        }
        else if(!data.lastname){
            status= false
            setMessage("Please enter last name")
        }
        else if(!data.email){
            status= false
            setMessage("Please enter email")
        }else if(!data.password){
            status= false
            setMessage("Please enter password")
        }else if(!data.mobile){
            status= false
            setMessage("Please enter mobile")
        }else if(!data.dob){
            status= false
            setMessage("Please enter date of birth")
        }
        return status
    }
  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        firstname: data.get('firstName'),
        lastname: data.get('lastName'),
        email:data.get('email'),
        password:data.get('password'),
    });
    if(!valdateForm({
        firstname: data.get('firstName'),
        lastname: data.get('lastName'),
        email:data.get('email'),
        password:data.get('password'),
        dob:data.get('dob'),
        mobile:data.get('mobile')
    })){
        setOpen(true)
        return
    }
    axios.post("http://localhost:4000/Sign-Up",{
        firstname: data.get('firstName'),
        lastname: data.get('lastName'),
        email:data.get('email'),
        password:data.get('password'),
        dob:data.get('dob'),
        mobile:data.get('mobile')

      }).then((res)=>{
        console.log(res.data)
        setMessage("Registered Successfully, please login")
        setOpen(true)
        
    //   navigate("/signIn")
    }).catch((err)=>{
        console.log("error",err)
        setMessage(err.message)
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <label>First name<span style={{color:"red"}}>*</span></label>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <label>Last name<span style={{color:"red"}}>*</span></label>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
              <label>Date of birth<span style={{color:"red"}}>*</span></label>
              <TextField
              margin="normal"
              required
              fullWidth
              id="dob"
              name="dob"
              type="date"
              autoFocus
            />
              </Grid>
              <Grid item xs={12}>
              <label>Mobile<span style={{color:"red"}}>*</span></label>
              <TextField
              margin="normal"
              required
              fullWidth
              id="mobile"
              label="Mobile"
              name="mobile"
              type="number"
              autoFocus
            />
              </Grid>
              <Grid item xs={12}>
              <label>Email Address<span style={{color:"red"}}>*</span></label>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              
              <Grid item xs={12}>
              <label>Password<span style={{color:"red"}}>*</span></label>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
      <Dialog
        open={open}
        onClose={()=>{
            setMessage("")
            setOpen(false)
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={()=>{
            setMessage("")
            setOpen(false)
        }} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}