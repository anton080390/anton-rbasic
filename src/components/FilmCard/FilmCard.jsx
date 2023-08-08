import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";

const cardMediaStyles = {
  maxWidth: 395,
  height: 222,
  position: "relative",
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
};

export default function FilmCard({ id, name, time, image, handleFilmClick }) {
  const handleButtonClick = () => {
    handleFilmClick(id);
  };

  return (
    <Card style={cardMediaStyles}>
      <CardMedia
        component="img"
        style={cardMediaStyles}
        image={image}
        alt={name}
      />
      <Box sx={overlayStyles}>
        <Box sx={filmStyles}>
          <Typography
            style={{
              margin: "4px 0 4px",
              textAlign: "left",
            }}
          >
            {name}
          </Typography>
          <Typography
            style={{
              margin: "4px 0 15px",
              textAlign: "left",
            }}
          >
            {time}
          </Typography>
          <Button
            variant="contained"
            style={{
              border: "1px solid #E50914",
              background: "#E50914",
              width: "100px",
              height: "30px",
              color: "#fff",
              margin: "4px 0 20px",
            }}
            onClick={handleButtonClick}
          >
            Show ID
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
