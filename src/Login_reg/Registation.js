
import React, { useState } from "react";
import "../App.css";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { auth, firebase } from "./Fire";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [alertMessage, setAlertMessage] = useState("Something went wrong");
  const [showAlert, setShowAlert] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [oneTimeLogin, setOneTimeLogin] = useState("");
  const [uid, setUid] = useState("");

  const sendDataToDjango = async (userId) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name: name,
        email: username,
        phone: phone,
        gid: userId,
        password: pass,
      });
      console.log('Data sent successfully:', response.data);
      // Handle any further logic or state updates here
    } catch (error) {
      console.error('Error sending data:', error);
      if (error.response && error.response.status === 400) {
        setAlertMessage('Invalid input. Please check your details.');
      } else {
        setAlertMessage('An unexpected error occurred. Please try again later.');
      }
      setShowAlert(true);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("h", name);
    let valid = true;

    if (name.trim().length === 0 || username.trim().length === 0 || pass.trim().length === 0  || phone.trim().length !== 10) {
      setAlertMessage("Invalid input. Please check your details.");
      setShowAlert(true);
      valid = false;
    }

    if (valid) {
      auth
        .createUserWithEmailAndPassword(username, pass)
        .then((user) => {
          console.log("kk", user.user.uid);
          setUid(user.user.uid);
          sendDataToDjango(user.user.uid);
          navigate("/Login");
        })
        .catch((err) => {
          console.log(err);
          setAlertMessage("ID already used");
          setShowAlert(true);
        });
    }
  };

  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user) => {
        console.log("kk", user);

        try {
          const response = axios.post('http://127.0.0.1:8000/api/register', {
            name: user.user.displayName,
            email: user.user.email,
            gid: user.user.uid,
          });
          console.log('Data sent successfully:', response.data);
        } catch (error) {
          console.error('Error sending data:', error);
          if (error.response && error.response.status === 400) {
            setAlertMessage('Invalid input. Please check your details.');
          } else {
            setAlertMessage('An unexpected error occurred. Please try again later.');
          }
          setShowAlert(true);
        }

        setUid(user.user.uid);
        sendDataToDjango(user.user.uid);
        navigate("/Login");
      }).catch((err) => {
        console.log(err);
        setAlertMessage("ID already used");
        setShowAlert(true);
      });
    } catch (err) {
      console.log(err);
      setAlertMessage('An unexpected error occurred. Please try again later.');
      setShowAlert(true);
    }
  };
  return (
    <div className="reg">
      {showAlert && (
        <Alert key="warning" variant="warning">
          <h5 className="bodyhead" style={{ color: "black" }}>
            {alertMessage}
          </h5>
        </Alert>
      )}

      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col-4"></div>
          <div className="col-7 float-end">
            <div className="container">
              <div className="col" style={{ marginTop: 90 }}>
                <div className="col-sm-20  bg-black" style={{ borderRadius: 10 }}>
                  <center>
                    <h2 className="bodyhead" style={{ color: "white" }}>
                      Sign up
                    </h2>
                  </center>
                  <hr></hr>
                </div>
                <div className="col-6">
                  <center>
                    <TextField
                      required
                      color="secondary"
                      id="outlined-basic"
                      label="Full name"
                      variant="outlined"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                      style={{ marginLeft: 150, width: 350 }}
                    />
                    <br></br> <br></br>
                    <TextField
                      required
                      color="secondary"
                      id="outlined-basic"
                      label="User id"
                      variant="outlined"
                      value={username}
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                      style={{ marginLeft: 150, width: 350 }}
                    />
                    <br></br> <br></br>
                    <TextField
                      required
                      color="secondary"
                      id="outlined-basic"
                      label="Phone number"
                      variant="outlined"
                      value={phone}
                      onChange={(event) => {
                        setPhone(event.target.value);
                      }}
                      style={{ marginLeft: 150, width: 350 }}
                    />
                    <br></br>
      
                    <br></br> 
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      style={{ marginLeft: 150, width: 350 }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        value={pass}
                        onChange={(event) => {
                          setPass(event.target.value);
                        }}
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                    <br></br>
                    <br></br>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginLeft: 150, width: 350 }}
                      onClick={onSubmit}
                    >
                      <span style={{ color: "white" }}>Create</span>
                    </Button>
                    <br></br> <br></br>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginLeft: 150, width: 350 }}
                      onClick={signInWithGoogle}
                    >
                      <span style={{ color: "white" }}>
                        <GoogleIcon />
                        Sign in with Google
                      </span>
                    </Button>
                    <br></br> <br></br>
                    <Link style={{ marginLeft: 300 }} to="/Login">
                      Login
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

export default Registration;
