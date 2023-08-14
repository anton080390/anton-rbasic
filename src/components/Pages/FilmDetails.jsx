import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "@mui/material/Rating";
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

function FilmDetails() {
  const { filmId } = useParams();
  const [filmData, setFilmData] = useState(null);

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

  const { name, rating, genres, schedule, premiered, image } = filmData;

  return (
    <>
      <Header>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1>{name}</h1>
            <p
              style={{
                marginLeft: "10px",
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
              margin: "5px",
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
          marginBottom: "10rem",
          marginLeft: "2rem",
          fontSize: "1.7em",
          color: "red",

          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ marginRight: "1rem", fontWeight: "bold" }}>TAGS:</span>
        {genres.join(", ")}
      </div>
    </>
  );
}

export default FilmDetails;
