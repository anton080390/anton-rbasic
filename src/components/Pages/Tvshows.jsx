import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import FilmCard from "../FilmCard/FilmCard";
import useRequest from "../../components/hooks/useRequest";

function Tvshows() {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const actionFilms = useRequest(
    "https://dolphin-app-pc6ii.ondigitalocean.app/article"
  );
  console.log(actionFilms);
  if (actionFilms.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2}>
      {actionFilms?.map((film) => (
        <Grid item key={film.id} xs={12} sm={6} md={4} lg={3}>
          <FilmCard
            id={film.id}
            title={film.name}
            image={film.image?.medium}
            summary={film.summary}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Tvshows;
