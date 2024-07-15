import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import logo from "./assets/gaia-high-resolution-logo-transparent.png";
import "./App.css";
import videoBg from "./assets/lines_-_5224 (Original).mp4";
import videoBgm from "./assets/vecteezy_plexus-artificial-intelligence-background_12658023.mp4";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import homebg from "./assets/plant_home.mp4";
import Grid from "@mui/material/Grid";
import { Carousel } from "antd";
import { useParallax } from "react-scroll-parallax";

import "./Fotter.css";
import {
  GithubOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";
import { Space } from "antd";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});
const contentStyle = {
  height: "300px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Home = () => {
  const navigate = useNavigate();
  const cat = useParallax({
    scaleX: [0.7, 1, 2, "easeInQuad"],

    scaleY: [1, 1, 2, "easeInQuad"],
  });

  const dog = useParallax({
    scaleX: [0.7, 1, 2, "easeInQuad"],

    scaleY: [1, 1, 2, "easeInQuad"],
  });
  const gradientBackground = {
    // background: "linear-gradient(to right, #ff8a00, #e52e71)",
    // background: "linear-gradient(to right, #bfe9ff, #bfe9ff )",
    background: "linear-gradient(to right, #ff6f72, #f14dfd )",
    WebkitBackgroundClip: "text",
    color: "transparent",
    display: "inline-block",
    height: 100,
  };
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const [fontSize, setFontSize] = useState(32);
  const [isScrolled, setIsScrolled] = useState(false);
  const [itemFontSize, setItemFontSize] = useState(16);
  const [gridItemWidth, setGridItemWidth] = useState(4);
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const currentPosition = window.scrollY;
    setScrollPosition(currentPosition);
    const scrollPosition = window.scrollY;
    const scrollRange = 190; // Smaller values make the scrolling more sensitive

    setIsScrolled(scrollPosition > scrollRange);
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Adjust the values based on your design
      const maxFontSize = 50;
      const minFontSize = 32;
      const scrollRange = 200;

      // Calculate the new font size based on the scroll position
      const newFontSize = Math.max(
        minFontSize,
        maxFontSize -
          (scrollPosition / scrollRange) * (maxFontSize - minFontSize)
      );

      setFontSize(newFontSize);

      // Increase the font size of the Item component as you scroll down
      const maxItemFontSize = 18; // Adjust this value based on your design
      const minItemFontSize = 16; // Adjust this value based on your design
      const itemScrollFontSizeRange = 100;

      const newItemFontSize = Math.min(
        maxItemFontSize,
        minItemFontSize +
          (scrollPosition / itemScrollFontSizeRange) *
            (maxItemFontSize - minItemFontSize)
      );

      setItemFontSize(newItemFontSize);

      const maxGridItemWidth = 6; // Adjust this value based on your design
      const minGridItemWidth = 4; // Adjust this value based on your design
      const gridItemScrollWidthRange = 200;

      const newGridItemWidth = Math.min(
        maxGridItemWidth,
        minGridItemWidth +
          (scrollPosition / gridItemScrollWidthRange) *
            (maxGridItemWidth - minGridItemWidth)
      );

      setGridItemWidth(newGridItemWidth);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    navigate("/Registation"); // Navigate to '/otherpage'
  };
  const handleClickl = () => {
    navigate("/Login"); // Navigate to '/otherpage'
  };
  const logoStyle = {
    backgroundImage: `url(${logo})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "80px", // Set your desired width
    height: "80px", // Set your desired height
  };
  return (
    <div className="main">
      <video src={homebg} autoPlay loop muted className="background-video" />
      <div className="main">
        <div className="overlay"></div>
        <video src={videoBgm} autoPlay loop muted style={{ height: 700 }} />

        <div className="content" style={{ fontSize: `${fontSize}px` }}>
          <hr></hr>
          <br></br>
          <br></br>
          <Box sx={{ flexGrow: 1, width: 900, marginLeft: 5 }}>
            <AppBar
              style={{
                borderRadius: "20px 20px 20px 20px",
                backgroundColor: "white",
                boxShadow: isHover ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none",
                opacity: isHover ? 1 : 0.75,
                transition: "box-shadow 0.3s, opacity 0.3s",
                position: "static",
              }}
              // position="fixed"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2, ...logoStyle }}
                ></IconButton>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, color: "black" }}
                ></Typography>
                <Button
                  color="inherit"
                  variant="text"
                  sx={{ color: "black" }}
                  onClick={handleClickl}
                >
                  <h className="bodyhead">Login</h>
                </Button>
                <div style={{ marginLeft: 10 }}></div>
                <div className="vl"></div>
                <div style={{ marginLeft: 10 }}></div>
                <Button
                  color="inherit"
                  variant="text"
                  sx={{ color: "black" }}
                  onClick={handleClick}
                >
                  <h className="bodyhead">Register</h>
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
          <br></br>
          <br></br>
          <p>
            Welcome To <h style={gradientBackground}>G.A.I.A</h>{" "}
          </p>
          <h style={{ fontSize: fontSize - 10 }}>
            A Gesture AI Assistant and Analyzer
          </h>
        </div>
      </div>

      <div className="main">
        <div className="ove"></div>
        <div className="contentdiv">
          <br></br>
          <br></br>
          <br></br>
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-11" style={{ marginLeft: 40 }}>
                <div className="cat">
                  <Box
                    sx={{
                      height: 380,

                      //  margin: 4.5,
                      //  marginLeft: 2,

                      borderRadius: 5,
                      border: "red",
                      // backgroundColor: "white",

                      "&:hover": {
                        // backgroundColor: "white",

                        boxShadow: "2px 3px 10px #F4AAB9",
                      },
                    }}
                  >
                    <br></br>
                    <br></br>
                    <br></br>
                    <Box sx={{ flexGrow: 1, marginLeft: 10 }} ref={cat.ref}>
                      <Grid container spacing={2}>
                        <div class="col-sm-6">
                          {" "}
                          <div
                            style={{
                              borderRadius: 10,
                              fontSize: `${16}px`,
                            }}
                          >
                            <center>
                              <h1
                                className="bodyhead"
                                style={gradientBackground}
                              >
                                Controll your devises at your finger tips
                              </h1>
                              <br></br>
                              <h className="bodyhead">
                                Welcome to our platform dedicated to hand
                                gesture recognition powered by Machine Learning
                                (ML) models utilizing Surface Electromyography
                                (SEMG) signals.
                              </h>
                              <br></br>

                              <br></br>

                              <div className="cat">
                                <img ref={cat.ref} src="" />
                              </div>
                            </center>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          {" "}
                          <Carousel
                            effect="fade"
                            autoplay
                            autoplaySpeed={2000}
                            prevArrow={<div>Previous</div>}
                            nextArrow={<div>Next</div>}
                          >
                            <div>
                              <img
                                src="https://opengovasia.com/wp-content/uploads/2021/12/algorithm_1270x710.jpg"
                                alt="Image 1"
                                style={{
                                  ...contentStyle,
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            <div>
                              <img
                                src="https://www.zdnet.com/a/img/resize/e36091cbdd487218cc77f81371993be46792603b/2022/02/25/e8848401-e6c3-4edd-87db-1aca635c1f18/gettyimages-1256306440businessman-pointing-at-hologram-with-icon-on-virtual-screen.jpg?auto=webp&fit=crop&height=675&width=1200"
                                alt="Image 2"
                                style={{
                                  ...contentStyle,
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            <div>
                              <img
                                src="https://static.c.realme.com/IN/thread/1085800080419586048.jpg"
                                alt="Image 3"
                                style={{
                                  ...contentStyle,
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            <div>
                              <img
                                src="https://i0.wp.com/scifi.radio/wp-content/uploads/2021/09/hologram-touch_resize_md.jpg?fit=744%2C419&ssl=1"
                                alt="Image 4"
                                style={{
                                  ...contentStyle,
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          </Carousel>{" "}
                        </div>
                      </Grid>
                    </Box>
                  </Box>


                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br> <br></br>
   <br></br>
      <div className="main">
        <div className="ove"></div>
        <div className="contentdiv">
          <h1 className="bodyhead" ref={dog.ref} style={gradientBackground}>
            Our customization services
          </h1>
          <div className="dog">
            <Box>
              <div class="container-fluid">
                <div class="row">
                  <div class="col-sm-4">
                    <Box
                      sx={{
                        height: 180,
                        width: 390,

                        borderRadius: 5,
                        border: "red",
                        // backgroundColor: "white",

                        "&:hover": {
                          // backgroundColor: "white",

                          boxShadow: "2px 3px 10px #F4AAB9",
                        },
                      }}
                    >
                      <div style={{ marginLeft: "2rem", paddingTop: "1rem" }}>
                        {" "}
                        <h1
                          className="bodyhead"
                          style={{
                            ...gradientBackground,
                            fontSize: 25,
                            height: 50,
                          }}
                        >
                          Personalized Solutions
                        </h1>
                        <br></br>
                        <h>
                          We offer tailored SEMG-based recognition systems to
                          meet specific user needs, ensuring optimal performance
                          and user experience.
                        </h>
                      </div>
                    </Box>
                  </div>
                  <div class="col-sm-4">
                    {" "}
                    <Box
                      sx={{
                        height: 180,
                        width: 390,

                        borderRadius: 5,
                        border: "red",
                        // backgroundColor: "white",

                        "&:hover": {
                          // backgroundColor: "white",

                          boxShadow: "2px 3px 10px #F4AAB9",
                        },
                      }}
                    >
                      <div style={{ marginLeft: "2rem", paddingTop: "1rem" }}>
                        {" "}
                        <h1
                          className="bodyhead"
                          style={{
                            ...gradientBackground,
                            fontSize: 25,
                            height: 50,
                          }}
                        >
                          Advanced Customization
                        </h1>
                        <br></br>
                        <h className="bodyhead">
                          Our team of experts provides advanced customization
                          options, allowing for unique and innovative
                          applications of hand gesture recognition technology.
                        </h>
                      </div>
                    </Box>
                  </div>
                  <div class="col-sm-4">
                    {" "}
                    <Box
                      sx={{
                        height: 180,
                        width: 390,

                        borderRadius: 5,
                        border: "red",
                        // backgroundColor: "white",

                        "&:hover": {
                          // backgroundColor: "white",

                          boxShadow: " 1px 1px 6px 1px #F4AAB9",
                        },
                      }}
                    >
                      <div style={{ marginLeft: "2rem", paddingTop: "1rem" }}>
                        {" "}
                        <h1
                          className="bodyhead"
                          style={{
                            ...gradientBackground,
                            fontSize: 25,
                            height: 50,
                          }}
                        >
                          Integration Assistance
                        </h1>
                        <br></br>
                        <h className="bodyhead">
                          Receive comprehensive support for integrating
                          customized recognition systems into various devices
                          and platfor
                        </h>
                      </div>
                    </Box>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      height: 140,
                      width: 950,

                      borderRadius: 5,
                      border: "red",
                      // backgroundColor: "white",

                      "&:hover": {
                        // backgroundColor: "white",

                        boxShadow: "2px 3px 10px #F4AAB9",
                      },
                    }}
                  >
                    <div style={{ marginLeft: "2rem", padding: "0.8rem" }}>
                      {" "}
                      <h1
                        className="bodyhead"
                        style={{
                          ...gradientBackground,
                          fontSize: 25,
                          height: 50,
                        }}
                      >
                        Our calibration services
                      </h1>
                      <br></br>
                      <h className="bodyhead">
                        Our calibration services ensure the accurate and precise
                        functioning of SEMG-based hand gesture recognition
                        systems, optimizing their performance and reliability.
                        We offer calibration solutions for different
                        environments and user requirements.
                      </h>
                    </div>
                  </Box>
                  <Box
                    sx={{
                      borderRadius: 5,

                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {" "}
                    <button className="buttona" onClick={handleClickl}>
                      Calibrate
                    </button>
                  </Box>
                </div>
              </div>
            </Box>
            {/* <div id="chart" style={{ color: "red", width: 1000 }}>
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              height={350}
              width={1000}
            />
          </div> */}
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div className="main">
        <div className="ove"></div>
        <div className="contentdiv">
          <div className="dog"></div>
          <h1 ref={dog.ref} className="bodyhead" style={gradientBackground}>
            Contact us
          </h1>
          <Box
            sx={{
              height: 70,
              width: 315,
              marginTop: -5,
              //  margin: 4.5,
              // marginLeft: 2,
              padding: "1rem",
              borderRadius: 5,
              border: "red",
              // backgroundColor: "white",

              "&:hover": {
                // backgroundColor: "white",

                boxShadow: "2px 3px 10px #F4AAB9",
              },
            }}
          >
            <Space style={{ marginLeft: 0 }}>
              <GoogleOutlined style={{ fontSize: 40 }} />
              <InstagramOutlined style={{ fontSize: 40 }} />
              <LinkedinOutlined style={{ fontSize: 40 }} />
              <GithubOutlined style={{ fontSize: 40 }} />
              <IconFont type="icon-facebook" style={{ fontSize: 40 }} />

              <TwitterOutlined style={{ fontSize: 40 }} />
            </Space>
          </Box>
          <footer class="footer">
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-4">
                  <Box
                    sx={{
                      height: 180,
                      width: 390,

                      borderRadius: 5,
                      border: "red",
                      // backgroundColor: "white",

                      "&:hover": {
                        // backgroundColor: "white",

                        boxShadow: "2px 3px 10px #F4AAB9",
                      },
                    }}
                  >
                    <div style={{ marginLeft: "2rem", paddingTop: "1rem" }}>
                      {" "}
                      <h1
                        className="bodyhead"
                        style={{
                          ...gradientBackground,
                          fontSize: 25,
                          height: 50,
                          background:
                            "linear-gradient(to right, #bfe9ff, #bfe9ff )",
                        }}
                      >
                        Contact Information
                      </h1>
                      <br></br>
                      <h>Office Address: 123 Street, City, Country</h>
                      <br></br>
                      <h>Email: info@companyname.com</h>
                      <br></br>
                      <h>Phone: +1 (123) 456-7890</h>
                    </div>
                  </Box>
                </div>
                <div class="col-sm-4">
                  {" "}
                  <Box
                    sx={{
                      height: 180,
                      width: 390,

                      borderRadius: 5,
                      border: "red",
                      // backgroundColor: "white",

                      "&:hover": {
                        // backgroundColor: "white",

                        boxShadow: "2px 3px 10px #F4AAB9",
                      },
                    }}
                  >
                    <div style={{ marginLeft: "2rem", paddingTop: "1rem" }}>
                      {" "}
                      <h1
                        className="bodyhead"
                        style={{
                          ...gradientBackground,
                          fontSize: 25,
                          height: 50,
                          background:
                            "linear-gradient(to right, #bfe9ff, #bfe9ff )",
                        }}
                      >
                        Privacy Policy
                      </h1>
                      <br></br>
                      <h className="bodyhead">
                        Data Security: We prioritize the security of your
                        personal information and protect it.
                      </h>
                      <br></br>
                      <h>
                        Cookies Usage: We use cookies to improve user experience
                        and track visits to our site.
                      </h>
                    </div>
                  </Box>
                </div>
                <div class="col-sm-4">
                  {" "}
                  <Box
                    sx={{
                      height: 180,
                      width: 390,

                      borderRadius: 5,
                      border: "red",
                      // backgroundColor: "white",

                      "&:hover": {
                        // backgroundColor: "white",

                        boxShadow: " 1px 1px 6px 1px #F4AAB9",
                      },
                    }}
                  >
                    <div style={{ marginLeft: "2rem", paddingTop: "1rem" }}>
                      {" "}
                      <h1
                        className="bodyhead"
                        style={{
                          ...gradientBackground,
                          fontSize: 25,
                          height: 50,
                          background:
                            "linear-gradient(to right, #bfe9ff, #bfe9ff )",
                        }}
                      >
                        Copyright Information
                      </h1>
                      <br></br>
                      <h className="bodyhead">
                        Ownership: All content, trademarks, and intellectual
                        property displayed on our site are owned by us or used
                        with permission.
                      </h>
                    </div>
                  </Box>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                }}
              ></div>
            </div>
            <br></br>
            <center>
              {" "}
              <p>&copy;G.A.I.A | All Rights Reserved</p>
            </center>
          </footer
          >
        </div>
      </div>
    </div>
  );
};

export default Home;
