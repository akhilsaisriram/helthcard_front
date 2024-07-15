import React,{useState,useEffect} from "react";
import "./Dash.css";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Input } from "antd";
import Add_feed from "./pages/Add_feed";
import Add_med_his from "./pages/Add_med_his";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { QRCode } from 'antd';

const { TextArea } = Input;
const downloadQRCode = () => {
  const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.download = 'QRCode.png';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
const Dashboard = () => {
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
const [sid,setsid]=useState("")
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .post("http://127.0.0.1:8000/api/user", { token: token })
      .then((response) => {
        console.log("Data recieved:", response.data);
        setsid(response.data.sid)
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        navigate("/login");
      });
  }, []);
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");

  const handleSubmit = async (event) => {

    event.preventDefault();
    if (bloodType.trim().length===0) {
      console.error("Error: Text is empty");

      return;
    }
    const dateTime = new Date();
    const formattedDateTime = dateTime.toLocaleString();
    const packet= {
      bloodType:bloodType,
      // date_added:"2022-01-01T00:00:00Z",
      allergies:allergies,
    
      dateadded:formattedDateTime,
      
    }
    // Prevents the default form submission behavior
    try {
      const response = await axios.post(
        "http://localhost:8000/api/Add_bucket", // Your Django endpoint
        {
      
          token:sessionStorage.getItem("token"),
          data:packet,
          condition:0
        }
      );
      console.log("Response:", response.data);
    setBloodType("");
      setAllergies("");
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed
    }
  };

  return (
    <div className="App">
      <div className="background"></div>
      <div className="overlay"></div>
      <br></br>
     <center>
     <div>
    <QRCode
       value={`http://localhost:8000/api/gest/${sid}`}
      bgColor="#fff"
      style={{
        marginBottom: 16,
      }}
    />
    <Button type="primary" onClick={downloadQRCode}>
      Download
    </Button>
  </div>
     </center>
      <div className="container">
 
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            try {
              const response =  axios.post(
                "http://localhost:8000/api/send-email", // Your Django endpoint
                {
              
                  token:sessionStorage.getItem("token"),
                 email:email
                }
              );
              console.log("Response:", response.data);
        
              // Handle the response as needed
            } catch (error) {
              console.error("Error:", error);
              // Handle the error as needed
            }
            handleClose();
          },
        }}
      >
        <DialogTitle>Add contact Mail id</DialogTitle>
        <DialogContent>
          <DialogContentText>
             Please enter  email address here. We
            will send Varification to the provides mail to varify  
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
        <div className="box">
        <Box sx={{ width: "400px" }}>
            <div>
              <h1 style={{ fontSize: "24px" }}>
                The basic info in case of medical emergency
              </h1>
              <hr />
              <TextField
                required
                id="outlined-required"
                label="Blood type"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
              />
              <br />
              <br />
              <TextArea
                placeholder="Medical or other allergies"
                rows={4}
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                style={{ width: 300 }}
              />
              <Box
                sx={{
                  display: "flex",
                  gap: "var(--Textarea-paddingBlock)",
                  pt: "var(--Textarea-paddingBlock)",
                  borderTop: "1px solid",
                  borderColor: "divider",
                  flex: "auto",
                }}
              >
                <Button sx={{ ml: "auto" }} onClick={handleSubmit}>
                  Send
                </Button>
              </Box>
            </div>
            <br></br>
         
            <Button variant="outlined" onClick={handleClickOpen}>
        Add contacts

      </Button>
      <br></br>
      <hr></hr>
          </Box>
        </div>
        
        <div className="box">
          {" "}
        
          <Box sx={{ width: "500px" }}>
            <div>
              <h1 style={{ fontSize: "24px" }}>Daily medication </h1>
              <hr></hr>
             
              <Add_feed></Add_feed>{" "}
            </div>
          </Box>
        </div>
        <div className="box">
          {" "}
          <Box sx={{ width: "500px" }}>
            <div>
              <h1 style={{ fontSize: "24px" }}>Medical history / Sergeries / Operations</h1>
              <hr></hr>
          <Add_med_his></Add_med_his>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
