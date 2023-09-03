import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Typography } from "@mui/material";

function Actor() {
  const { actorId } = useParams();
  const [actorInfo, setActorInfo] = useState(null);

  useEffect(() => {
    async function fetchActorData() {
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/people/${actorId}`
        );
        setActorInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchActorData();
  }, [actorId]);

  if (!actorInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
      <Grid item>
        <img
          src={actorInfo.image?.original}
          alt={actorInfo.name}
          style={{ maxWidth: "300px" }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h3" sx={{ color: "#fff", marginBottom: "2rem" }}>
          {actorInfo.name}
        </Typography>
        <Typography variant="h5" sx={{ color: "#fff" }}>
          Birthdate: {actorInfo.birthday}
        </Typography>
        <Typography variant="h5" sx={{ color: "#fff" }}>
          Country: {actorInfo.country?.name}
        </Typography>
        <Typography variant="h5" sx={{ color: "#fff" }}>
          Gender: {actorInfo.gender}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Actor;
