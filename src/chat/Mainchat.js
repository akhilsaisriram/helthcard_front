import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import InputAdornment from "@mui/material/InputAdornment";
import PdfViewer from "./pdfviewr";
import { IconButton, TextField } from "@mui/material";
import BlurOnIcon from '@mui/icons-material/BlurOn';
import pako from "pako";
import { Image } from "antd";
import axios from "axios";

function Mainchat({ socket, username, room ,pid,pid_chage}) {
  ////////////////////////////////////

  ////////////////////////////////////////
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messageRef = useRef(null);

  const [selectedPDF, setSelectedPDF] = useState(null);

  const [persontyping, settyping] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      if (room.length !== 0) {
        try {
          const response = await axios.post('http://localhost:8000/chat/get_message', {
            token: sessionStorage.getItem("token"),
            room: room
          });
          console.log("messagesa from",response.data.message);
          if(response.data.message){
            setMessageList(response.data.message)
          }
        else{
          setMessageList([])
        }
          // Handle the response data as needed
        } catch (error) {
          console.log('Error fetching messages:', error);
          alert('An error occurred while fetching the messages.');
        }
      }
    };

    fetchMessages();
  }, [room]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [issend, setsend] = useState(true);


const [noonline,setnum]=useState();

//////////////////////////////////////////////////////////////////////////////////////////////////


  
  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'user_count') {
        setnum(data.count)
        console.log(`User count in room: ${data.count}`);

      } else if (data.type === "acknowledge") {
        console.log("ack", data);
        if (data.message === "Message received and acknowledged.") {
          setsend(true);
        }
      } else if (data.type === "typing") {
        console.log(data)
        if (data.message === 1 && data.username !== username) {
          settyping(data.username);
        }
        if (data.stat === 0) {
          settyping("");
        }
      } else if (data.type === "user_join") {
        setOnlineUsers(data.online_users);
      } else if (data.type === "user_leave") {
        setOnlineUsers(data.online_users);
      } 
      else if (data.type === 'notification') {

        pid_chage(data.notification)
        // alert(data.notification)
        console.log("noti",data.notification);
    }
      
      else {
        setMessageList((prevMessages) => [...prevMessages, data]);
      }
    };
  }, [socket]);

  useEffect(() => {
    try {
      if (socket) {
        const messageDataa = {
          type: "typing",
          username: username,
          message: 1,
        };

        socket.send(JSON.stringify(messageDataa));

        const interval = setInterval(() => {
          const messageDataa = {
            type: "typing",
            username: username,
            message: 0,
          };

          socket.send(JSON.stringify(messageDataa));
        }, 3000);

        return () => clearInterval(interval);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, [currentMessage]);


 useEffect(() => {
    try {
      if (socket) {
        const messageDataa = {
          type: "get_user_count",
        };

        socket.send(JSON.stringify(messageDataa));

      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, [currentMessage]);

  const sendNotification = () => {
    if(onlineUsers.length!==2){
      try{
        if (socket) {
          console.log("noti")
          socket.send(JSON.stringify({
              type: 'notify',
              notification: pid,
          }));
      }
      }catch(error){
        console.log(error)
      }
    }

   
};

  const uniqueItems = [...new Set(messageList.map((item) => item.time))].map(
    (time) => {
      return messageList.find((item) => item.time === time);
    }
  );
  const [base64Image, setBase64Image] = useState("");
  const fileInputRef = useRef(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    setSelectedPDF(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        // The result contains the base64 representation of the image
        // const base64String = reader.result.split(",")[1];
        const base64String = e.target.result;
        setBase64Image(base64String);
        console.log(base64String);
        setCurrentMessage(base64String);
        sendMessage();
      };

      // Read the image as a data URL
      reader.readAsDataURL(file);
    }
  };
  const handleButtonClick = () => {
    // Trigger the hidden file input when the button is clicked
    fileInputRef.current.click();
  };
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [socket, currentMessage, messageList]);

  const sendMessage = async () => {
    setsend(false);
    if (selectedPDF && selectedPDF.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const pdfData = event.target.result;
        const pdfDataArray = new Uint8Array(pdfData);
        const compressedData = pako.gzip(pdfDataArray);
        console.log(pdfDataArray);
        console.log("send");

        const dataArray = Array.from(compressedData);

        const uint8Array = Uint8Array.from(dataArray);
        console.log("data arr", pdfDataArray);
        console.log("uin", uint8Array);
          const messageData = {
            room: room,
            username: username,
            message: dataArray,
            time:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes() +
              ":" +
              new Date(Date.now()).getSeconds(),
          };

          socket.send(JSON.stringify(messageData));
          setMessageList((list) => [...list, messageData]);
          console.log(messageData);
          setSelectedPDF(null);
          setCurrentMessage("");

          try {
            const response =  axios.post('http://localhost:8000/chat/send_message', {
              token:sessionStorage.getItem("token"),
              room:room,
              username: username,
              message: dataArray,
              time:
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes() +
                ":" +
                new Date(Date.now()).getSeconds(),
            });
    
          console.log(response.data)
          sendNotification()
        //  alert(`Response: ${ response.data.error}`);
        } catch (error) {
         console.log('Error updating date:', error);
       
          alert('An error occurred while updating the date.');
        }

        // setCompressedPDF(compressedData);
      };
      reader.readAsArrayBuffer(selectedPDF);
    } else {
      if (currentMessage !== "") {

        const messageData = {
          room: room,
          username: username,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes() +
            ":" +
            new Date(Date.now()).getSeconds(),
        };

        socket.send(JSON.stringify(messageData));
        console.log(messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");

        try {
          const response =  axios.post('http://localhost:8000/chat/send_message', {
            token:sessionStorage.getItem("token"),
            room: room,
            username: username,
            message: currentMessage,
            time:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes() +
              ":" +
              new Date(Date.now()).getSeconds(),
          });
    
         console.log(response.data)
        //  alert(`Response: ${ response.data.error}`);
        sendNotification()
        } catch (error) {
         console.log('Error updating date:', error);
       
          alert('An error occurred while updating the date.');
        }
      }
    }
  };

  return (
    <div>
      <div class="container-fluid">
        <div class="row">
 
          <div class="col-sm-6">
            {" "}
            <div
              style={{
                scrollbehaviour: "smooth",
              }}
            >
                       {/* <button onClick={sendNotification}>Send </button>
                       <br></br>

            {onlineUsers.map((user, index) => (
              <div key={index}>{user}</div>
            ))} */}
            {onlineUsers.length}
              <Box>
                <div>
                  <center>
                    <Box
                      sx={{
                        width: 570,
                        height: 500,
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
                      <center>
                        {" "}
                        <span>
                          {" "}
                          <h className="bodyhead">Live Chat { onlineUsers.length ===0?<></>:<>{onlineUsers.length >=2 ?<><BlurOnIcon style={{color:"green"}}></BlurOnIcon></>:<><BlurOnIcon style={{color:"red"}}></BlurOnIcon></>}</>}</h>{" "}
                          <h>
                            {/* {persontyping.length ? (
                              <h style={{ text: "bold", color: "red" }}>
                                {persontyping} is typeing
                              </h>
                            ) : (

                              <h></h>
                            )}{" "} */}
                          </h>
                          <br></br>
                          {issend === true ? (
                            <h className="bodyhead" style={{ color: "green" }}>
                              Send
                            </h>
                          ) : (
                            <h className="bodyhead" style={{ color: "red" }}>
                              sending ....
                            </h>
                          )}
                        </span>{" "}
                      </center>
                      <div
                        // style={{
                        //   // Set the width of the div
                        //   height: "380px", // Set the height of the div
                        //   overflow: "auto", // Enable scrolling when the content exceeds the div size
                        //   // Add a border for visual clarity
                        //   // Add padding to the content to prevent it from touching the edges
                        //   borderRadius: 10,
                        // }}
                        ref={messageRef}
                        style={{
                          height: "390px",
                          overflowY: "scroll",
                          border: "1px solid #ccc",
                        }}
                      >
                        {uniqueItems.map((messageContent) => (
                          <div class="container-fluid">
                            <div class="row">
                              <div class="col-sm-6  ">
                                <div class="bgsmcontentl">
                                  {messageContent.username === username ? (
                                    <span>
                                      {" "}
                                      {/* <h>{messageContent.message}</h> */}
                                      <div>
                                        {messageContent.message.length >
                                        1000 ? (
                                          <div>
                                            {/* <img
                                              onClick={handleClickOpen}
                                              alt="imagedsend"
                                              src={`data:image/jpeg;base64,${messageContent.message}`}
                                              style={{
                                                width: 360,
                                                height: 280,
                                              }}
                                            /> */}
                                            {messageContent.message
                                              .slice(0, 50)
                                              .includes("image") ? (
                                              // <embed
                                              //   src={messageContent.message}
                                              //   type="application/pdf"
                                              //   width="100%"
                                              //   height="330px"
                                              // />
                                              <Image
                                                alt="imagedsend"
                                                src={`${messageContent.message}`}
                                                style={{
                                                  width: 260,
                                                  height: 280,
                                                }}
                                              />
                                            ) : (
                                              <PdfViewer
                                                base64Data={
                                                  messageContent.message
                                                }
                                              />
                                            )}
                                          </div>
                                        ) : (
                                          <h>{messageContent.message}</h>
                                        )}
                                      </div>
                                      {/* <Decript socket={messageContent.message} />  */}
                                      <sub>
                                        <sub1 style={{ color: "white" }}>
                                          {messageContent.username} at{" "}
                                          {messageContent.time}{" "}
                                        </sub1>
                                      </sub>
                                      <sub></sub>
                                    </span>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <br></br>
                              </div>
                              <div class="col-sm-6 ">
                                <div class="bgsmcontentl">
                                  {messageContent.username !== username ? (
                                    <span>
                                      {" "}
                                      <div>
                                        {messageContent.message.length >
                                        1000 ? (
                                          <div>
                                            {messageContent.message
                                              .slice(0, 50)
                                              .includes("image") ? (
                                              <Image
                                                alt="imagedsend"
                                                src={`${messageContent.message}`}
                                                style={{
                                                  width: 260,
                                                  height: 280,
                                                }}
                                              />
                                            ) : (
                                              <PdfViewer
                                                base64Data={
                                                  messageContent.message
                                                }
                                              />
                                            )}
                                          </div>
                                        ) : (
                                          <h>{messageContent.message}</h>
                                        )}
                                      </div>
                                      {/* <Decript socket={messageContent.message} />  */}
                                      {/* <Decript socket= /> */}
                                      <sub>
                                        <sub1 style={{ color: "white" }}>
                                          {messageContent.username} at{" "}
                                          {messageContent.time}{" "}
                                        </sub1>
                                      </sub>
                                      <sub></sub>
                                    </span>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <br></br>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <center>
                        <div className="chat-footer">
                          <input
                            type="file"
                            // accept=".pdf,image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            style={{ display: "none" }}
                          />
                          <TextField
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  <label
                                    htmlFor="file-input"
                                    className="file-label"
                                  >
                                    <AttachFileIcon
                                      onClick={handleButtonClick}
                                      className="upload-icon"
                                    />
                                  </label>
                                </InputAdornment>
                              ),
                            }}
                            style={{ width: 400 }}
                            id="outlined-basic"
                            label="Message"
                            variant="outlined"
                            type="text"
                            value={
                              currentMessage.length > 1000
                                ? "click send "
                                : currentMessage
                            }
                            placeholder="Hey..."
                            onChange={(event) => {
                              setCurrentMessage(event.target.value);
                            }}
                            onKeyPress={(event) => {
                              event.key === "Enter" && sendMessage();
                            }}
                            //
                          ></TextField>

                          {/* <FileBase64 type="file" multiple={false} onDone={handlePdfUpload} /> */}
                          <Button
                            variant="outlined"
                            style={{ height: 55 }}
                            onClick={sendMessage}
                          >
                            &#9658;
                          </Button>
                          <br></br>
                        </div>
                      </center>
                    </Box>
                  </center>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainchat;
