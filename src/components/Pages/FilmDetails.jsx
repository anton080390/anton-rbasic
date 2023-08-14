import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { NavLink } from "react-router-dom";
import "./Page.css";

function Header({ children }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "20px",
      }}
    >
      {children}
    </div>
  );
}

function CustomTabPanel({ value, index, children }) {
  return (
    <div
      style={{
        display: value === index ? "block" : "none",
        margin: "1rem",
      }}
    >
      {children}
    </div>
  );
}

function FilmDetails() {
  const { filmId } = useParams();
  const [filmData, setFilmData] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    async function fetchFilmData() {
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/shows/${filmId}`
        );
        setFilmData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchFilmData();
  }, [filmId]);

  if (!filmData) {
    return <div>Loading...</div>;
  }

  const { name, rating, genres, schedule, premiered, image, summary, status } =
    filmData;

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Header>
        <div style={{ marginLeft: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "left" }}>
            <h1>{name}</h1>
            <p
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {rating && rating.average !== null && (
                <>
                  <Rating
                    value={rating.average}
                    size="small"
                    style={{ color: "red", marginRight: "5px" }}
                  />
                  <span style={{ fontWeight: "bold", color: "#FFD700" }}>
                    {rating.average.toFixed(1)}
                  </span>
                </>
              )}
            </p>
          </div>
          <p
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: "1.7em",
            }}
          >
            {genres[0]}
          </p>
          <p>
            {schedule.time} on {schedule.days.join(", ")}
          </p>
          <p>Premiered: {premiered}</p>
        </div>
        <div>
          <img
            src={image.medium}
            alt={name}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </Header>
      <div
        style={{
          marginTop: "2rem",
          marginBottom: "1rem",
          marginLeft: "2rem",
          fontSize: "1.3em",
          color: "white",
          alignItems: "center",
        }}
      >
        <span
          style={{
            marginRight: "1rem",
            fontWeight: "bold",
            color: "red",
            fontSize: "1.5em",
          }}
        >
          TAGS:
        </span>
        {genres.join(", ")}
      </div>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          margin: "2rem auto",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleChangeTab}
          aria-label="film-details-tabs"
          indicatorColor="secondary"
        >
          <Tab label="Description" sx={{ color: "white" }} />
          <Tab label="Rate&Review" sx={{ color: "white" }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={activeTab} index={0}>
        <div style={{ color: "white", height: "1rem" }}>{summary}</div>
      </CustomTabPanel>
      <CustomTabPanel value={activeTab} index={1}>
        <div style={{ color: "white", height: "1rem" }}>{status}</div>
      </CustomTabPanel>

      <footer
        style={{
          backgroundColor: "#111",
          color: "white",
          padding: "2rem 0",
          marginTop: "5rem",
        }}
      >
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2rem",
          }}
        >
          <a className="footLink" href="#">
            Terms Of Use
          </a>
          <a className="footLink" href="#">
            Privacy-Policy
          </a>
          <a className="footLink" href="#">
            FAQ
          </a>
          <a className="footLink" href="#">
            Watch List
          </a>
        </div>
        <p
          style={{
            margin: "2rem",
            marginBottom: "1rem",
            color: "white",
            textAlign: "center",
          }}
        >
          2021 STREAMIT. All Rights Reserved. All videos and shows on this
          platform are trademarks of, and all related images and content are the
          property of, Streamit inc. Duplication and copy of this is strictly
          prohibited. All rights reserved.
        </p>

        <div style={{ margin: "1rem" }}>
          <p style={{ textAlign: "center", margin: "1rem 0 0" }}>Follou Us:</p>
          <br />
          <div style={{ textAlign: "center", margin: "0" }}>
            <NavLink className="whiteNavLink">
              <FacebookIcon
                style={{ width: "24px", height: "24px", marginRight: "1rem" }}
              />
            </NavLink>
            <NavLink className="whiteNavLink">
              <TwitterIcon
                style={{ width: "24px", height: "24px", marginRight: "1rem" }}
              />
            </NavLink>
            <NavLink className="whiteNavLink">
              <GoogleIcon
                style={{ width: "24px", height: "24px", marginRight: "1rem" }}
              />
            </NavLink>
            <NavLink className="whiteNavLink">
              <GitHubIcon
                style={{ width: "24px", height: "24px", marginRight: "1rem" }}
              />
            </NavLink>
          </div>
        </div>
      </footer>
    </>
  );
}

export default FilmDetails;
