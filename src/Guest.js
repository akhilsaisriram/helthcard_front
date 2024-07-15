import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/joy/Box";
import { Button } from "@mui/material";
import All_feed from "./pages/All_feed";
const Guest = () => {
  const { name } = useParams();
  const [guestData, setGuestData] = useState(null);
  const [contact,setcon]=useState()
  const[sid,setsid]=useState();
 

const[med1,setmed1]=useState()
  useEffect(() => {
    const fetchData = () => {
      axios
        .post("http://127.0.0.1:8000/api/Guest_med_0", { sid: name })
        .then((response) => {
          console.log("Data received:", response.data);
          setGuestData(response.data);
          setcon(response.data.contact_mails);
          setsid(response.data.sid);
          if(response.data.conditions[0]==="med1"){
            setmed1(response.data)
            console.log(med1)
          }
          else{
            setmed1()
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    // Fetch data immediately on mount
    fetchData();

    // Set interval to fetch data every 1 second
    const intervalId = setInterval(fetchData, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [name]);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Function to fetch user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Function to send location data to backend
  const sendLocation = async () => {
    await getLocation();
    console.log(latitude,"+",longitude)
    try {
      if (latitude !== null && longitude !== null) {
        const response = await axios.post("http://localhost:8000/api/Send_notification_location", {
          latitude: latitude,
          longitude: longitude,
          contact:contact
        });
        console.log("Location data sent successfully:", response.data);
      } else {
        console.error("Location data not available.");
      }
    } catch (error) {
      console.error("Error sending location data:", error);
    }
  };

  const send_request = async () => {
   console.log(sid)
    try {
      if (sid) {
        const response = await axios.post("http://localhost:8000/api/Send_acess_req", {
          contact:contact,
          sid:sid
        });
        console.log("Location data sent successfully:", response.data);
      } else {
        console.error("Location data not available.");
      }
    } catch (error) {
      console.error("Error sending location data:", error);
    }
  };

  return (
    <div className="App">
      <div className="background"></div>
      <div className="overlay"></div>
      <br></br>

      <div className="container">
        <div className="box">
          <Box sx={{ width: "400px" }}> <h1 style={{ fontSize: "24px" }}>Details</h1>
            <hr></hr>
            {guestData && (
              <div>
                <p>Name: {guestData.name}</p>
                <p>Email: {guestData.email}</p>
                <p>Phone: {guestData.phone}</p>
                <p>Contact Emails: {guestData.contact_mails.join(", ")}</p>
              </div>
            )}</Box>
        </div>

        <div className="box">
          {" "}
          <Box sx={{ width: "500px" }}>
            <div>
            <div>
              <h1 style={{ fontSize: "24px" }}>Basic  medical details</h1>
              <hr></hr>
              {guestData &&
                guestData.medicine_0.map((medicine, index) => (
                  <div key={index}>
                    <p>Blood : {medicine.bloodType}</p>
                    <p>Allergies: {medicine.allergies}</p>
                
                    {/* Add more details as per your API response */}
                  </div>
                ))}
            </div>
            </div>
          </Box>
        </div>
        <div className="box">
        <Box sx={{ width: "300px" }}>
            <div>
              <h1 style={{ fontSize: "24px" }}>Contacts </h1>
              <hr></hr>
              <Button onClick={sendLocation}>Send Location to Backend</Button>
              <br></br>
              <Button onClick={send_request}>request the acess to past medical history </Button>
              
            </div>
          </Box>     
        </div>
      </div>
      <All_feed data={med1}></All_feed>
    </div>
  );
};

export default Guest;
