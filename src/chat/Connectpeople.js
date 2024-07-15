import React, { useState, useEffect } from "react";
import axios from "axios";
//import CryptoJS from "crypto-js";
import "../App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

import Mainchat from "./Mainchat";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FiberSmartRecordIcon from '@mui/icons-material/FiberSmartRecord';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Tooltip from "@mui/material/Tooltip";


import "../Fotter.css";


//const socket = io.connect("http://localhost:5000");

//import ButtonGroup from "@mui/material/ButtonGroup";

import Bucketlist_add_del from "../pages/Bucketlist_add_del";

const Connectpeople = () => {
  /////////////////////////////////////////////
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setCurrentItem(item);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentItem(null);
  };
  ////////////////////////////////////////
  const navigate = useNavigate();
  const [room_name, setroom] = useState("");
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleClickl = () => {
    navigate("/Dashbord"); // Navigate to '/otherpage'
  };
  const [bucketChange, setBucketChange] = useState(false);

  const handleBucketChange = () => {
    setBucketChange((prev) => !prev);
  };
  const handleBucketChange_name = (ll) => {
    setUsername(ll);
  };



  const [matchpeople, setmatch] = useState();
  const[uid,setuid]=useState();
  useEffect(() => {
    console.log("hi react");
    axios
      .post("http://127.0.0.1:8000/chat/peoples_on_samedate", {
        token: sessionStorage.getItem("token"),
      })
      .then((res) => {
        setmatch(res.data.matching_users);
        setuid(res.data.uid);
        if (
          res.data === "User not found" ||
          res.data === "Invalid credentials"
        ) {
        }
      });
  }, [bucketChange]);

  console.log("mat",matchpeople);
  /////////////////////////////////////////////////////////////////////////////////////////////

  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  const [key, setKey] = useState(false);
  const [kk, setKeyk] = useState(false);
  const [socket, setso] = useState({});
const[currentroom,setcurroom]=useState();
const[pid,setpid]=useState();
  ///////////////////////////////////////bucket delete
  const joinRoom = async (pid,usernamea) => {
    
    if (matchpeople) {
      const updatedMatchpeople = matchpeople.map((person) =>
        person.id === pid && person.notif !== undefined
          ? { ...person, notif: false }
          : person
      );
  
      setmatch(updatedMatchpeople);
    }

 
    
    console.log("Joining room with", uid, pid);
    if (currentroom) {
      console.log("Disconnecting from current room:", currentroom);

      if (socket) {
          socket.close();
          console.log("WebSocket connection closed:", currentroom);
      }

    
  }
    // Sort alphabetically
    const sortedStrings = [uid, pid].sort();
  
    // Concatenate sorted strings
    const concatenatedString = sortedStrings.join('');
   
    console.log("Concatenated string:", concatenatedString);
    setpid(uid)
    setroom(concatenatedString);
    setcurroom(concatenatedString);
    if (1) {
      console.log("Attempting to establish WebSocket connection...");
  
      try {
        // Create WebSocket connection asynchronously
        const socketa = await new Promise((resolve, reject) => {
          const sock = new WebSocket(
            `ws://localhost:8000/ws/${concatenatedString}/${usernamea}/`
          );
          sock.onopen = () => resolve(sock);
          sock.onerror = (error) => reject(error);
        });
  
        // WebSocket connection established
        console.log("WebSocket connection established:", socketa);
        setKey(socketa.readyState === WebSocket.OPEN);
        setso(socketa);
        setShowChat(true);
      } catch (error) {
        console.error("Error establishing WebSocket connection:", error);
        // Handle error if WebSocket connection fails
      }
    } else {
      console.log("Username or room name is empty:", username, room_name);
    }
  };
  useEffect(() => {
    joinRoom(123,"@")
  }, []);
 
  
  const pid_chage = (ll) => {
    const updatedMatchPeoplea = matchpeople.map(person => ({
      ...person,
      notif: false  // Set notif to false initially, adjust as needed
  }));
  const updatedMatchPeople = updatedMatchPeoplea.map(person => {
    if (person.id === ll) {
        return {
            ...person,
            notif: true
        };
    }
    return person;
});
setmatch(updatedMatchPeople)
console.log("notification up",updatedMatchPeople)
    
  };
  //////////////
  return (
    <div class="mainchatbg">
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <div>
            <AppBar
              position="static"
              style={{
                backgroundColor: isHover
                  ? "rgba(159, 90, 253, 0.25)"
                  : "rgba(159, 90, 253, 0)",
              }}
              sx={{
                position: "absolute",
                zindex: 1,
                borderRadius: 5,

                top: 0,
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>{" "}
                <h className="bodyhead">Hi {username} </h>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <center>
                    <h className="bodyhead">The Chat Window </h>
                    {key === true ? (
                      <div>
                        <h style={{ color: "green" }}>
                          Connected
                          <CheckCircleIcon />{" "}
                        </h>
                        <h>id :{room_name}</h>
                      </div>
                    ) : (
                      <h style={{ color: "red" }}></h>
                    )}
                  </center>
                </Typography>
                <Button color="inherit" variant="outlined">
                  <h className="bodyhead" onClick={handleClickl}>
                    Back
                  </h>
                </Button>
              </Toolbar>
            </AppBar>
          </div>
        </Box>
      </div>
      <br></br> <br></br>
      <hr></hr>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-3">
            <Bucketlist_add_del
              onBucketChange={handleBucketChange}
              sname={handleBucketChange_name}
            />
          </div>

          <div class="col-sm-3">
            <div
              style={{
                scrollbehaviour: "smooth",
              }}
            >
              <Box
                sx={{
                  height: 370,
                  //  margin: 4.5,
                  //  marginLeft: 2,
                  borderRadius: 5,
                  border: "red",
                  backgroundColor: "white",
                  opacity: 0.9,
                  "&:hover": {
                    backgroundColor: "white",
                    opacity: 0.9,
                  },
                }}
              >
                <div
                  style={{
                    // Set the width of the div
                    height: "420px", // Set the height of the div
                    overflow: "auto", // Enable scrolling when the content exceeds the div size
                    // Add a border for visual clarity
                    // Add padding to the content to prevent it from touching the edges
                    borderRadius: 10,
                  }}
                >
                  <center>
                    <h1 className="bodyhead">People</h1>

                    {matchpeople && matchpeople.length > 0 ? (
                      matchpeople.map((item, index) => (
                        <div key={index}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: 1,
                              padding: 1,
                              backgroundColor: "white",
                              borderRadius: 4,
                              position: "relative",
                            }}
                          >
                            <Button onClick={()=>joinRoom(item.id,username)}>{item.name}<sub>{item.notif?<><FiberSmartRecordIcon style={{color:"red",fontSize:"15"}}></FiberSmartRecordIcon></>:<></>}</sub> </Button>
                            <div>
                              
                              <Tooltip title="Location">
                                <IconButton
                                  onClick={(event) => handleClick(event, item)}
                                  size="small"
                                  sx={{ ml: 2 }}
                                  aria-controls={
                                    open ? "account-menu" : undefined
                                  }
                                  aria-haspopup="true"
                                  aria-expanded={open ? "true" : undefined}
                                >
                                  <LocationOnIcon />
                                </IconButton>
                              </Tooltip>
                              <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                  elevation: 0,
                                  sx: {
                                    overflow: "visible",
                                    filter:
                                      "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
                                    "& .MuiAvatar-root": {
                                      width: 32,
                                      height: 32,
                                      ml: -0.5,
                                      mr: 1,
                                    },
                                    "&::before": {
                                      content: '""',
                                      display: "block",
                                      position: "absolute",
                                      top: 0,
                                      right: 14,
                                      width: 10,
                                      height: 10,
                                      bgcolor: "background.paper",
                                      transform:
                                        "translateY(-50%) rotate(45deg)",
                                      zIndex: 0,
                                    },
                                  },
                                }}
                                transformOrigin={{
                                  horizontal: "right",
                                  vertical: "top",
                                }}
                                anchorOrigin={{
                                  horizontal: "right",
                                  vertical: "bottom",
                                }}
                              >
                                {/* {matchpeople && matchpeople.length > 0 ? (
                      matchpeople.map((item, index) => (
                        <div key={index}>

                        </div> */}
                                {currentItem && (
                                  <div>
                                    {currentItem.city &&
                                      currentItem.city.length > 0 &&
                                      currentItem.city.map((city, index) => (
                                        <div key={index}>
                                          <MenuItem>{city} {" "} date: {currentItem.date[index]}</MenuItem>
                                        </div>
                                      ))}
                                   
                                  </div>
                                )}
                              </Menu>
                            </div>
                          </Box>
                        </div>
                      ))
                    ) : (
                      <p>Add your bucket list location</p>
                    )}
                  </center>
                </div>
              </Box>
            </div>
          </div>

          <div class="col-sm-4">
            {" "}
            <div
              style={{
                scrollbehaviour: "smooth",
              }}
            >
              <Box>
                <div>
                  <center></center>
                  <Mainchat
                    socket={socket}
                    username={username}
                    room={room_name}
                    pid={pid}
                    pid_chage={pid_chage}
                  />
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connectpeople;
