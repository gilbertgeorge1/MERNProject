import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createHashHistory } from "history";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Main from './Main';

import "../App.css";

export default function Login() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(true);
  const history = createHashHistory();
  Axios.defaults.withCredentials = true;



  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
        setLoggedIn(false);
      } else {
        setLoginStatus(response.data[0].username);
        setLoggedIn(true);
        history.go("/");

      }
      console.log(username,password);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username);
        setLoggedIn(true);

      }
      else{
        setLoggedIn(false);
      }
    });
  }, []);

  //  const handleChange = (event) => {
  //   setValue(event.target.value);
  // };
   const paperStyle={padding :20,height:'70vh',width:380, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
  return (
    <div className="App">

       { loggedIn ===false && (<Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username'  value={username}
                    onChange={(e)=>setUsername(e.target.value)} fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password' value={password}
                    onChange={(e)=>setPassword(e.target.value)} fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' color='primary' variant="contained" onClick={login} style={btnstyle} fullWidth>Sign in</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Don't have an account? 
                     <Link href="./registration" > Sign Up</Link>
                </Typography>
            </Paper>

           
        </Grid>
)}
{
  loggedIn === true && (<Redirect to="/dashboard" />)
}
 

      {/* <h1>{loginStatus}</h1> */}
    </div>
  );
}