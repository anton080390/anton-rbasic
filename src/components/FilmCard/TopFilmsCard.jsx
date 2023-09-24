import React from "react";
import { Card, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

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
};

const TopFilmsCard = ({ id, title, premiered, image }) => {
  return (
    <Card style={{ position: "relative", height: "700px" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          alt={title}
          image={image}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
        <div
          className="overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom right, rgba(0, 0, 0, 0.9) 40%, transparent 100%)", // Градиент для затемнения по диагонали
          }}
        ></div>
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "flex-start",
          bottom: 0,
          padding: "10px",
          width: "100%",
          marginBottom: "15rem",
          marginLeft: "2rem",
        }}
      >
        <Typography
          variant="h1"
          style={{
            color: "#fff",
            margin: 0,
            fontSize: "2rem",
            fontWeight: "bold",
            marginRight: "16px",
            marginBottom: "1rem",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h1"
          style={{
            color: "#fff",
            margin: 0,
            fontSize: "2rem",
            fontWeight: "bold",
            marginRight: "16px",
            marginBottom: "3rem",
          }}
        >
          {premiered}
        </Typography>
        <Link to={`/films/${id}`} style={linkStyles}>
          Show more
        </Link>
      </div>
    </Card>
  );
};

export default TopFilmsCard;
