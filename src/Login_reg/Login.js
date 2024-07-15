import React, { useState } from "react";
import "../App.css";
//import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
//import FilledInput from "@mui/material/FilledInput";
//import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
//import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { Checkbox } from "antd";

import { auth, firebase } from "./Fire";

//import {store} from '../App';
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  //  const [token,setToken] = useContext(store)
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [ischeked,setischeked]=useState(false);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    setischeked(e.target.checked)
  };
  const [alertm, setslertm] = useState("Something went wrong");
  const [showalert, setshowalert] = useState(false);
  const [showalertaa, setshowalertaa] = useState(false);
  const [username, setusernamename] = useState("");
  const [pass, setpass] = useState("");

  const onsub = (e) => {
    e.preventDefault();

    if (username.trim().length === 0) {
      setslertm("Invalid username");
      setshowalert(true);
    }

    if (pass.trim().length === 0) {
      setslertm("Invalid password");
      setshowalert(true);
    }

    if(username.trim().length !== 0 || pass.trim().length !== 0){
        axios.post('http://127.0.0.1:8000/api/login',{email:username,password:pass}).then(
            res => {
              //  dispathch(authaction.gettoken(res.data.token));
            // axios.post('http://127.0.0.1:8000/api/uid',{token:res.data.token}).then(
            //   re =>{
            //  console.log(re)
            // //  sessionStorage.setItem("token",re.data.gid);
            // //  setshowalertaa(true)
            //   }
            // )
            // sessionStorage.setItem("token",res.data.token);
            console.log(res.data.token)
          
           sessionStorage.setItem('token',res.data.token)
           setshowalertaa(true)
          }
       )
    }




  };
  if (showalertaa) {
    navigate("/Dashbord");
    //alert(localStorage.getItem('token'))
  }

  const signgoogle = async () => {
    try {
      await auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((user) => {
          auth.onAuthStateChanged((usera) => {

            axios.post('http://127.0.0.1:8000/api/gmaillogin', {
              gid: usera.uid,
            })
            .then((response) => {
              console.log('Data sent successfully and jwt token gid:', response.data.token);
              sessionStorage.setItem("token", response.data.token);
            })
            .catch((error) => {
              console.error('Error sending data:', error);
            });

            
           
            setshowalertaa(true);
            console.log("us", usera.displayName);
          });
          //  navigate('./Dashbord')
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reg">
      {showalert ? (
        <Alert key="warning" variant="warning">
          <h5 className="bodyhead" style={{ color: "black" }}>
            {alertm}
          </h5>
        </Alert>
      ) : (
        <h></h>
      )}

      <div class="container">
        <div class="row">
          <div class="col"></div>
          <div class="col-4"></div>
          <div class="col-7 float-end">
            <div class="container">
              <div class="col" style={{ marginTop: 90 }}>
                <div class="col-sm-20  bg-black" style={{ borderRadius: 10 }}>
                  <center>
                    <hr></hr>
                    <h2 className="bodyhead" style={{ color: "white" }}>
                      Sign in
                    </h2>
                    <hr></hr>
                  </center>
                </div>
                <div class="col-6">
                  <center>
                    <br></br> <br></br>
                    <TextField
                      required
                      color="secondary"
                      id="outlined-basic"
                      label="User id"
                      variant="outlined"
                      value={username}
                      onChange={(event) => {
                        setusernamename(event.target.value);
                      }}
                      style={{ marginLeft: 150, width: 350 }}
                    />
                    <br></br> <br></br>
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="standard"
                    >
                      <InputLabel
                        htmlFor="standard-adornment-password"
                        style={{ marginLeft: 80 }}
                        color="secondary"
                      >
                        Password
                      </InputLabel>
                      <Input
                        value={pass}
                        onChange={(event) => {
                          setpass(event.target.value);
                        }}
                        style={{ marginLeft: 80, width: 350 }}
                        color="secondary"
                        id="standard-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                   
                    <br></br>
                
                 
                    <br></br>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginLeft: 150, width: 350 }}
                      onClick={onsub}
                    >
                      {" "}
                      <h style={{ color: "white" }}>Login</h>{" "}
                    </Button>
                    <br></br> <br></br>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginLeft: 150, width: 350 }}
                      onClick={signgoogle}
                    >
                      {" "}
                      <h style={{ color: "white" }}>
                        <GoogleIcon />
                        Sign in with Google
                      </h>{" "}
                    </Button>
                    <br></br>
                    <br></br>
                    <Link style={{ marginLeft: 300 }} to="./Registation">
                      Sign_up
                    </Link>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
