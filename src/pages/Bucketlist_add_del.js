import React, { useState, useEffect, useCallback, useRef } from "react";
import "../App.css";

import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import indianCities from "../andhra_pradesh_locations.json";
import { Fade } from "@mui/material";

import Divider from "@mui/material/Divider";
import dayjs from "dayjs";
import "../Fotter.css";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { DatePicker } from "antd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const Bucketlist_add_del = ({ onBucketChange,sname }) => {
  const [showInput, setShowInput] = useState(false);

  const handleIconClick = () => {
    setShowInput(!showInput);
  };

  const [bucketList, setBucketList] = useState([]);
  const [curloc, setcurloc] = useState(null);

  const onChange_date = async (item, dateString,index) => {
    // Validate item and dateString
    if (!item || Object.keys(item).length === 0 || !dateString || dateString.length === 0) {
      console.log('Invalid item or date.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/update_list', {
        token:sessionStorage.getItem("token"),
        bucket: item,
        date: dateString
      });

      const updatedBucketList = [...bucketList];
      updatedBucketList[index].Date = dateString;
      setBucketList(updatedBucketList);
      onBucketChange()
    //  alert(`Response: ${ response.data.error}`);
    } catch (error) {
     console.log('Error updating date:', error);
   
      alert('An error occurred while updating the date.');
    }
  };

  ////token auth//////////////////
  const [name,setname]=useState("")
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .post("http://127.0.0.1:8000/api/user", { token: token })
      .then((response) => {
        console.log("Data recieved:", response.data);
        setBucketList(response.data.bucket);
        setcurloc(response.data.curlocation);
        setname(response.data.name);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  }, []);

  const [value, setValue] = React.useState(null);
  const [text, setText] = useState("");
  const [inputValue, setInputValue] = useState("");

  console.log(value, inputValue);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("te", text);
    if (text === null && text.City.trim() === 0) {
      console.error("Error: Text is empty");

      return;
    }
    // Prevents the default form submission behavior
    try {
      const response = await axios.post(
        "http://localhost:8000/api/Add_bucket", // Your Django endpoint
        {
          token: sessionStorage.getItem("token"),
          bucket: text,
        }
      );
      console.log("Response:", response.data);
      setBucketList((prevList) => [...prevList, text]);
      setText("");
      onBucketChange()
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed
    }
  };

  const handleSubmitlocation = async (event) => {
    event.preventDefault();
    console.log("te", text);
    if (text === null) {
      console.error("Error: Text is empty");

      return;
    }
    // Prevents the default form submission behavior
    try {
      const response = await axios.post(
        "http://localhost:8000/api/Add_curlocation", // Your Django endpoint
        {
          token: sessionStorage.getItem("token"),
          bucket: curloc,
        }
      );
      console.log("Response:", response.data);
      onBucketChange()
      alert("location updated");
      
      //    setShowInput(false)
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed
    }
  };

  const handleDelete = async (kk) => {
    console.log(kk);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/DeleteBucketElement",
        { token: sessionStorage.getItem("token"), bucket: kk }
      );
      setBucketList((prevList) => prevList.filter((item) => item !== kk));
      console.log("Element deleted:", response.data);
      // Handle success
      onBucketChange()
    } catch (error) {
      console.error("Error delete:", error);
      // Handle error
    }
  };
  const [activeDatePickerIndex, setActiveDatePickerIndex] = useState(null);

  const toggleDatePicker = (index) => {
    setActiveDatePickerIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };
  return (
    <div>
      <div
        style={{
          scrollbehaviour: "smooth",
        }}
      >
        <Box
          sx={{
            height: 550,
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
            <h1 className="bodyhead">Bucket list </h1>
          </center>

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
              {/* <h1 className="bodyhead">Bucket list </h1> */}
              <div>
                <br></br>
                <div>{sname(name)}
                  {bucketList && bucketList.length > 0 ? (
                    <div>
                      {bucketList.map((item, index) => (
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
                            key={index}
                          >
                            <p>{item.City}</p>{" "}
                            <div >
                            {item.Date && <p>Date: {item.Date}</p>}
                       
                              <div
                                className={`datepicker-container ${
                                  activeDatePickerIndex === index ? "show" : ""
                                }`}
                              >
                                <DatePicker
                                    onChange={(date, dateString) =>    onChange_date(item, dateString, index)}
                                  
                           
                                />
                              </div>
                      
                            </div>
                            <div>         <IconButton
                                onClick={() => toggleDatePicker(index)}
                                style={{ cursor: "pointer" }}
                              >
                                <CalendarMonthIcon />
                              </IconButton>
                            <IconButton onClick={() => handleDelete(item)}>
                              <CloseIcon />
                            </IconButton></div>
                   
                          </Box>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>Add your bucket list location</p>
                  )}
                </div>
                <br></br>
              </div>
            </center>
          </div>
          <Box
            sx={{
              marginLeft: 2,
              width: 330,
              maxWidth: "100%",
              display: "flex",
            }}
          >
            <Autocomplete
              sx={{ ml: 1, flex: 1 }}
              value={text}
              onChange={(event, newValue) => {
                setText(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={indianCities}
              getOptionLabel={(option) => (option ? option.City : "")} // Use the city name as option label
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Bucket list"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit(e);
                    }
                  }}
                />
              )}
            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
              onClick={handleSubmit}
            >
              <SendIcon />
            </IconButton>
          </Box>
          <br></br>

          <Box
            sx={{
              height: 70,
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
            <div style={{ display: "flex" }}>
              <IconButton style={{ marginTop: 12 }} onClick={handleIconClick}>
                <LocationOnIcon />
              </IconButton>
              {curloc ? (
                <div style={{ marginTop: 20 }}>{curloc.City}</div>
              ) : (
                <></>
              )}
              <Fade in={showInput}>
                <Autocomplete
                  style={{ maxHeight: 20, marginTop: 8, width: 200 }}
                  value={curloc}
                  onChange={(event, newValue) => {
                    setcurloc(newValue);
                  }}
                  id="controllable-states-demo"
                  options={indianCities}
                  getOptionLabel={(option) => (option ? option.City : "")} // Use the city name as option label
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Location"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSubmitlocation(e);
                        }
                      }}
                    />
                  )}
                />
              </Fade>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Bucketlist_add_del;
