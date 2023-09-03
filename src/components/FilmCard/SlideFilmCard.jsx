import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { DEFAULT_IMAGE } from "../constants/constantns";
import "../Pages/Page.css";

const slideCardMediaStyles = {
  maxWidth: 470,
  height: 220,
  position: "relative",
  objectPosition: "top",
  backgroundColor: "black",
};

const overlayStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage:
    "linear-gradient(90deg, rgba(0, 0, 0, 0.80) 0%, rgba(20, 20, 20, 0.40) 50%, rgba(83, 100, 141, 0.00) 100%)",
};

const filmStyles = {
  position: "absolute",
  bottom: "10px",
  left: "10px",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  bottom: "2.5rem",
};

const linkStyles = {
  border: "1px solid #E50914",
  background: "#E50914",
  width: "100px",
  height: "30px",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  marginTop: "1rem",
};

export default function SlideFilmCard({
  id,
  title,
  description,
  image,
  premiered,
}) {
  return (
    <Card style={slideCardMediaStyles} className="slideFilmCard">
      <CardMedia
        component="img"
        style={slideCardMediaStyles}
        image={image || DEFAULT_IMAGE}
        alt={title}
      />
      <Box sx={overlayStyles}>
        <Box sx={filmStyles}>
          <Typography
            style={{
              margin: "4px 0 4px",
              textAlign: "left",
            }}
          >
            {title}
          </Typography>
          <Typography
            style={{
              margin: "4px 0 15px",
              textAlign: "left",
            }}
          >
            {premiered}
          </Typography>
          <Link to={`/films/${id}`} style={linkStyles}>
            Show more
          </Link>
        </Box>
      </Box>
    </Card>
  );
}
