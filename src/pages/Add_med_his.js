import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import IconButton from "@mui/joy/IconButton";
import { useDropzone } from "react-dropzone";
import FormatBold from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { AppBar, Autocomplete, Toolbar, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import indianCities from '../andhra_pradesh_locations.json';

import axios from "axios";
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const Add_med_his = () => {
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState("normal");

  const [img, setimg] = useState();

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const base64String = event.target.result; // Get the base64 string from the FileReader

      try {

        setimg(base64String);
      } catch (error) {
        console.log(error);
      }
    };

    reader.readAsDataURL(file); // Read the file as a data URL
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const [content,setcon]=useState('');

  const [dates,setdates]=useState();
  const handleSubmit = async (event) => {

    event.preventDefault();
    if (dates===null  && img) {
      console.error("Error: Text is empty");

      return;
    }
    const dateTime = new Date();
    const formattedDateTime = dateTime.toLocaleString();
    const packet= {
      content:content,
      // date_added:"2022-01-01T00:00:00Z",
      image:img,
      date:dates,
      dateadded:formattedDateTime,
     
    }
    // Prevents the default form submission behavior
    try {
      const response = await axios.post(
        "http://localhost:8000/api/Add_bucket", // Your Django endpoint
        {
      
          token:sessionStorage.getItem("token"),
          data:packet,
          condition:2
        }
      );
      console.log("Response:", response.data);
      setdates("");
      setcon("");
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed
    }
  };
  return (
    <div>
      <br></br>
      <FormLabel>     Medical reports </FormLabel>

      <Box
        sx={{
          height: 65,
          //  margin: 4.5,
          //  marginLeft: 2,
          borderRadius: 5,
          border: "red",
          backgroundColor: "white",
          opacity: 0.55,
          "&:hover": {
            backgroundColor: "white",
            opacity: 0.89,
          },
        }}
      >
        
        <div {...getRootProps()} style={{ outline: "none" }}>
          <input {...getInputProps()} />
          <div
            style={{
              border: "2px dashed #cccccc",
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <Typography>Drag & Drop or Click to Upload</Typography>
          </div>
        </div>
      </Box>
      <br></br>
      <h></h>
      <FormLabel>On what dates Operation / Sergery / Treatment took </FormLabel>
      <RangePicker    onChange={(date, dateString) =>    setdates( dateString)}/>
<br></br><br></br>
      <FormControl>
        <FormLabel>About  Operation / Sergery / Treatment  </FormLabel>
        <Textarea
        value={content}
          onChange={(event) => {
            setcon(event.target.value);
          }}
          placeholder="Detailed discription"
          minRows={3}
          endDecorator={
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
              <IconButton
                variant="plain"
                color="neutral"
                onClick={(event) => {
                  fontWeight === "bold"
                    ? setFontWeight("noraml")
                    : setFontWeight("bold");
                }}
              >
                <FormatBold />
                <KeyboardArrowDown fontSize="md" />
              </IconButton>

              <IconButton
                variant={italic ? "soft" : "plain"}
                color={italic ? "primary" : "neutral"}
                aria-pressed={italic}
                onClick={() => setItalic((bool) => !bool)}
              >
                <FormatItalic />
              </IconButton>
              <Button sx={{ ml: "auto" }} onClick={handleSubmit}>Send</Button>
            </Box>
          }
          sx={{
            minWidth: 300,
            fontWeight,
            fontStyle: italic ? "italic" : "initial",
          }}
        />
      </FormControl>
    </div>
  );
};

export default Add_med_his;
