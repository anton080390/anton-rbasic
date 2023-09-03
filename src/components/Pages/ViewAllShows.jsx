import React from "react";
import { useParams } from "react-router-dom";
import FilmCard from "../FilmCard/FilmCard";
import useRequest from "../hooks/useRequest";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function ViewAllShows() {
  const { showType } = useParams();
  console.log(showType);
  const apiData = useRequest(
    `https://dolphin-app-pc6ii.ondigitalocean.app/article/byGenre/${showType}`
  );
  //   console.log(apiData);

  return (
    <div>
      <Typography variant="h3" style={{ color: "#fff" }}>
        View All Shows
      </Typography>
      <Grid container spacing={2} sx={{ padding: "15px" }}>
        {apiData.map((show) => (
          <Grid item xs={4} key={show.id}>
            <FilmCard
              name={show.name}
              premiered={show.premiered}
              image={show.image ? show.image.medium : ""}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ViewAllShows;
