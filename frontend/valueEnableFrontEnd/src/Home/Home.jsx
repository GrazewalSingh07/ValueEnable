import React, { useEffect, useState } from 'react'
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
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, MenuItem, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import moment from 'moment/moment';
const theme = createTheme();
export const Home = () => {
    const [open,setOpen]= useState(false)
    const [message,setMessage]= useState("")
    const [Data,setData]= useState({
        "age":"",
        "gender":"",
        "sumAssured":"",
        "PT":"",
        "PPT":"",
        ModelPremium:"",
        PremiumFrequency:"",
        premiumVal:""
    })
    const validateDate=(date)=>{
        let status= true
       let age =moment().diff(date, 'years');
       if(age<23||age>56){
         status= false
       }
       
       return {status,age}
    } 
    const CalculatePremium=(frequency,total, duration)=>{
        let premium
        if(frequency=="yearly"){
           premium=Math.floor(total/duration)

        }else if(frequency=="monthly"){
            premium=Math.floor(total/(duration*12))
        }
        else if(frequency=="half-yearly"){
            premium=Math.floor(total/(duration*2))
        }
        return premium
    }

    const validate=(data)=>{
        // console.log("data",data)
        let status=true
        if(!data.dob){
            status= false
            setMessage("Please enter date of birth")
            
        }
       if(data.dob){
            if(!validateDate(data.dob).status){
                status= false
                setMessage(`Your age is ${validateDate(data.dob).age}, you must not be younger than 23 or older than 56`)
            }
        }
        if(data.gender=="none"){
            status= false
            setMessage("Please choose gender")
        }
        if(!data.sumAssured){
            status=false
            setMessage("Please enter sum assured")
        }
        if(data.sumAssured && data.ModelPremium){
            console.log(data.sumAssured, data.ModelPremium)
            if(parseInt(data.sumAssured) < (10* parseInt(data.ModelPremium))){
                status= false
                setMessage("Sum Assured must be atleast 10 times of Modal Premium")
            }
        }
        if(!data.ModelPremium){
            status= false
            setMessage("Please enter Model premium")
        }
         if(!data.PremiumFrequency){
            status =false
            setMessage("Please choose premium frequency")
        }
         if(!data.PT){
            status= false
            setMessage("Please etet PT")
        }
         if(data.PT){
            if(parseInt(data.PT)<10||parseInt(data.PT)>20){
                status= false
                setMessage("Policy term can not be greater than 20 or less than 10")
           
            }
        }
         if(data.PPT){
            if(parseInt(data.PPT)<5||parseInt(data.PPT)>10){
                status= false
                setMessage("Premium Paying Term can not be greater than 10 or less than 5")
            }
        }
        if(!data.PPT){
            status= false
            setMessage("Please enter PPT ")
        }
         if(data.PT && data.PPT){
            if(parseInt(data.PT)<parseInt(data.PPT)){
                status= false
                setMessage("Premium Paying Term can not be greater than Policy term")
            }
        }
      return status
    }
   useEffect(()=>{
    console.log("changes",Data)
   },[Data])
    // const [data,setData]= useState({})
    const handleSubmit = (event) => {
        event.preventDefault();
        setData({
            "age":"",
            "gender":"",
            "sumAssured":"",
            "PT":"",
            "PPT":"",
            ModelPremium:"",
            PremiumFrequency:""
        })
        const data = new FormData(event.currentTarget);
        let x = {
          dob: data.get('dob'),
          gender: data.get('gender'),
          sumAssured:data.get('sumAssured'),
          ModelPremium:data.get('ModelPremium'),
          PremiumFrequency:data.get('PremiumFrequency'),
          PT:data.get('PT'),
          PPT:data.get('PPT')
        }

       

       if(!validate(x)){
         setOpen(true)
        return
       }
      let premiumval= CalculatePremium(x.PremiumFrequency,x.sumAssured,x.PT)
       setData({age:moment().diff(x.dob, 'years'),...x,premiumVal:premiumval})
       
     
    };

   
    function FormRow() {
        return (
          <React.Fragment>
            <Grid item xs={4}>
            <label>PPT <span style={{color:"red"}}>*</span></label>
                <TextField
                margin="normal"
                required
                fullWidth
                id="PPT"
                label="PPT"
                name="PPT"
                type="number"
                autoFocus
                />
            </Grid>
            <Grid item xs={4}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
             >
             Calculate Policy
            </Button>
            </Grid>
            
          </React.Fragment>
        );
      }
  return (
    
      <ThemeProvider style={{"display":'flex'}}  theme={theme}>
      <Container   component="main"  maxWidth="md">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
    <Box sx={{ flexGrow: 1 }}>
      <Grid  component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} container spacing={1}>
        <Grid container item spacing={3}>
        <React.Fragment>
            <Grid item xs={4}>
            <label>Date of Birth <span style={{color:"red"}}>*</span></label>
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
            <Grid item xs={4}>
            <label>Gender <span style={{color:"red"}}>*</span></label>
            <TextField
              margin="normal"
              required
              fullWidth
              select
              name="gender"
              label="gender"
              type="text"
              id="gender"
             defaultValue="male"
            > 
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          
          </TextField>
            </Grid>
            <Grid item xs={4}>
            <label>Sum Assured <span style={{color:"red"}}>*</span></label>
          <TextField

              margin="normal"
              required
              fullWidth
              id="sumAssured"
              label="Sum Assured"
              name="sumAssured"
              type="number"
              autoFocus
            />
            </Grid>
          </React.Fragment>
        </Grid>
        <Grid container item spacing={3}>
        <React.Fragment>
            <Grid item xs={4}>
            <label>Model Premium <span style={{color:"red"}}>*</span></label>
             <TextField
              margin="normal"
              required
              fullWidth
              id="ModelPremium"
              label="Model Premium"
              name="ModelPremium"
              type="number"
              autoFocus
            />
            </Grid>
            <Grid item xs={4}>
            <label>Premium Frequency <span style={{color:"red"}}>*</span></label>
             <TextField
              margin="normal"
              required
              fullWidth
              id="PremiumFrequency"
              label="Premium Frequency"
              name="PremiumFrequency"
              select
              autoFocus
              defaultValue="monthly"
            >
            <MenuItem value="yearly">Yearly</MenuItem>
            <MenuItem value="half-yearly">Half-yearly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            </TextField>
            </Grid>
            <Grid item xs={4}>
            <label>PT <span style={{color:"red"}}>*</span></label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="PT"
              label="PT"
              name="PT"
              type="number"
              autoFocus
            />
            </Grid>
          </React.Fragment>
        </Grid>
        <Grid container item spacing={3}>
        <React.Fragment>
            <Grid item xs={4}>
            <label>PPT <span style={{color:"red"}}>*</span></label>
                <TextField
                margin="normal"
                required
                fullWidth
                id="PPT"
                label="PPT"
                name="PPT"
                type="number"
                autoFocus
                />
            </Grid>
            <Grid  item xs={4}>
            <label>.</label>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
             Calculate Premium
            </Button>
            </Grid>
            
          </React.Fragment>
        </Grid>
      </Grid>
    </Box>

          {/* <Grid  columns={{ xs: 4, sm: 8, md: 12 }}   container spacing={2} component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid >
                <Grid xs={4} sm={4} md={4} item>
            <label>Date of Birth <span style={{color:"red"}}>*</span></label>
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
            <Grid xs={4} sm={4} md={4} item>
             <label>Gender <span style={{color:"red"}}>*</span></label>
            <TextField
              margin="normal"
              required
              fullWidth
              select
              name="gender"
              label="gender"
              type="text"
              id="gender"
             defaultValue="none"
            > 
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          
          </TextField>
          </Grid>
          <Grid xs={4} sm={4} md={4}  item>
          <label>Sum Assured <span style={{color:"red"}}>*</span></label>
          <TextField

              margin="normal"
              required
              fullWidth
              id="sumAssured"
              label="Sum Assured"
              name="sumAssured"
              type="number"
              autoFocus
            />
          </Grid>
          <Grid xs={4} sm={4} md={4}  item>
          <label>Model Premium <span style={{color:"red"}}>*</span></label>
             <TextField
              margin="normal"
              required
              fullWidth
              id="ModelPremium"
              label="Model Premium"
              name="ModelPremium"
              type="number"
              autoFocus
            />
          </Grid>
          <Grid xs={4} sm={4} md={4}  item>
             <label>Premium Frequency <span style={{color:"red"}}>*</span></label>
             <TextField
              margin="normal"
              required
              fullWidth
              id="PremiumFrequency"
              label="Premium Frequency"
              name="PremiumFrequency"
              select
              autoFocus
              defaultValue="none"
            >
            <MenuItem value="yearly">Yearly</MenuItem>
            <MenuItem value="half-yearly">Half-yearly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            </TextField>
            <label>PT <span style={{color:"red"}}>*</span></label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="PT"
              label="PT"
              name="PT"
              type="number"
              autoFocus
            />
            </Grid> 
            <Grid xs={4} sm={4} md={4}  item>
             <label>PPT <span style={{color:"red"}}>*</span></label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="PPT"
              label="PPT"
              name="PPT"
              type="number"
              autoFocus
            />
            </Grid>
             <Grid xs={4} sm={4} md={4}  item>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
             >
             Calculate Policy
            </Button>
            </Grid>
            </Grid>
           
            
          </Grid> */}
          <Container  maxWidth="md">
            <Paper style={{overflowY:"scroll"}} >
            <h4 style={{padding:"16px"}}>Policy Premium</h4>
                <Table>
                   
                    <TableHead>
                       <TableRow>
                            <TableCell>
                                Age
                            </TableCell>
                            <TableCell>
                               Gender
                            </TableCell>
                            <TableCell>
                                Assured sum
                            </TableCell>
                            <TableCell>
                               Modal Premium
                            </TableCell>
                            <TableCell>
                              Premium Frequency
                            </TableCell>
                            <TableCell>
                              Policy Term
                            </TableCell>
                            <TableCell>
                              Premium Paying Term
                            </TableCell>
                            <TableCell>
                                Premium val
                            </TableCell>

                       </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableCell>
                       {Data.age}
                    </TableCell>
                    <TableCell>
                       {Data.gender}
                    </TableCell>
                    <TableCell>
                        {Data.sumAssured}
                    </TableCell>
                    <TableCell>
                       {Data.ModelPremium}
                    </TableCell>
                    <TableCell>
                        {Data.PremiumFrequency}
                    </TableCell>
                    <TableCell>
                        {Data.PT}
                    </TableCell>
                    <TableCell>
                        {Data.PPT}
                    </TableCell>
                    <TableCell>
                        {Data.premiumVal}
                    </TableCell>
                    </TableBody>
                </Table>
            </Paper>
        </Container>
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
     
  )
}
