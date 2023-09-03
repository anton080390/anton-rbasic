import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

function StarringItem({ showId }) {
  const [allActors, setAllActors] = useState([]);
  const [visibleActors, setVisibleActors] = useState([]);
  const [showAllActors, setShowAllActors] = useState(false);

  useEffect(() => {
    async function fetchActors() {
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/shows/${showId}/cast`
        );
        const cast = response.data;
        setAllActors(cast);
        setVisibleActors(cast.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    }
    fetchActors();
  }, [showId]);

  const toggleShowAllActors = () => {
    setShowAllActors(!showAllActors);
    if (!showAllActors) {
      setVisibleActors(allActors);
    } else {
      setVisibleActors(allActors.slice(0, 4));
    }
  };

  let showAllButton = null;
  if (allActors.length > 4) {
    showAllButton = (
      <button
        style={{
          marginLeft: "3rem",
          border: "none",
          color: "rgb(235, 84, 68)",
          background: "transparent",
          cursor: "pointer",
        }}
        onClick={toggleShowAllActors}
      >
        {showAllActors ? "Show Less" : "Show All"}
      </button>
    );
  }

  return (
    <div
      style={{
        marginBottom: "2rem",
        width: "100%",
        overflowX: "auto",
        textAlign: "center",
      }}
    >
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 0,
          margin: "auto",
        }}
      >
        <Grid container spacing={2}>
          {visibleActors.map((actor) => (
            <Grid item xs={6} sm={3} key={actor.person.id}>
              <Card
                component={Link}
                to={`/actor/${actor.person.id}`}
                sx={{
                  borderRadius: "5%",
                  backgroundColor: "rgba(20, 20, 20)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minHeight: "300px",
                  border: "none",
                  boxShadow: "none",
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardContent
                  style={{
                    background: "rgba(20, 20, 20)",
                    padding: "0.1rem",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    border: "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "none",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={actor.person.image.original}
                      alt={actor.person.name}
                      style={{
                        borderRadius: "20%",
                        width: "80%",
                        border: "none",
                      }}
                    />
                    <div
                      style={{
                        marginLeft: "1rem",
                        textAlign: "left",
                        border: "none",
                      }}
                    >
                      <Typography
                        variant="h6"
                        style={{ color: "rgb(251, 251, 251)", border: "none" }}
                      >
                        {actor.person.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{ color: "rgb(249, 249, 249)", border: "none" }}
                      >
                        As {actor.character.name}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {showAllButton}
    </div>
  );
}

export default StarringItem;