import React from "react";
import Rating from "@mui/material/Rating";
import "../Pages/Page.css";

function Header({ name, rating, genres, schedule, premiered, image }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "start",
        width: "100%",
        padding: "20px",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <div style={{ marginLeft: "0.2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "left",
            fontSize: "1em",
            flexWrap: "wrap",
          }}
        >
          <h1 style={{ color: "rgba(228, 228, 228)" }}>{name}</h1>
          {rating && rating.average !== null && (
            <p
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "1rem",
              }}
            >
              <Rating
                name="read-only"
                value={rating.average / 2}
                max={5}
                size="medium"
                style={{ color: "rgba(209, 46, 39)" }}
                readOnly
              />
              <span
                style={{
                  fontWeight: "bold",
                  color: "#FFD700",
                  fontSize: "2em",
                }}
              >
                {rating.average.toFixed(1)}
              </span>
            </p>
          )}
        </div>
        <p
          style={{
            color: "rgb(182, 42,36)",
            fontWeight: "bold",
            fontSize: "3em",
          }}
        >
          {genres[0]}
        </p>
        <p
          style={{
            color: "rgb(232, 232, 232)",
            fontSize: "1.2em",
          }}
        >
          {schedule.time} on {schedule.days.join(", ")}
        </p>
        <p
          style={{
            color: "rgb(232, 232, 232)",
            fontSize: "1.2em",
          }}
        >
          Premiered: {premiered}
        </p>
      </div>
      <div>
        <img
          src={image.medium}
          alt={name}
          style={{ width: "100%", height: "auto", marginTop: "1rem" }}
        />
      </div>
    </div>
  );
}

export default Header;
