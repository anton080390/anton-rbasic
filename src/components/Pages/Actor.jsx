import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Typography, IconButton, Link } from "@mui/material";
import SlideFilmCard from "../FilmCard/SlideFilmCard";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import AddLinkIcon from "@mui/icons-material/AddLink";

function Actor() {
  const { actorId } = useParams();
  const [actorInfo, setActorInfo] = useState(null);

  useEffect(() => {
    async function fetchActorData() {
      try {
        const response = await axios.get(
          `https://dolphin-app-pc6ii.ondigitalocean.app/article/actor/${actorId}`
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
  console.log(actorInfo);

  return (
    <Grid container spacing={5}>
      <Grid item>
        <img
          src={actorInfo.image?.original}
          alt={actorInfo.name}
          style={{ maxWidth: "300px" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton component={Link} href={`#`}>
            <FacebookIcon
              sx={{
                color: "white",
                fontSize: 40,
                "&:hover": { color: "red", fontSize: 42 },
              }}
            />
          </IconButton>
          <IconButton component={Link} href={`#`}>
            <TwitterIcon
              sx={{
                color: "white",
                fontSize: 40,
                "&:hover": { color: "red", fontSize: 42 },
              }}
            />
          </IconButton>
          <IconButton component={Link} href={`#`}>
            <AddLinkIcon
              sx={{
                color: "white",
                fontSize: 40,
                "&:hover": { color: "red", fontSize: 42 },
              }}
            />
          </IconButton>
        </div>
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
        <hr style={{ borderColor: "grey" }} />
        <Grid item xs={12} sm={12}>
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              margin: "0 2rem 2rem",
              fontSize: "32px",
              textAlign: "center",
            }}
          >
            Acting in:
          </Typography>

          {
            <div style={{ margin: " 0 2rem" }}>
              <Swiper
                spaceBetween={10}
                slidesPerView={4}
                navigation={true}
                modules={[Navigation]}
                className="NavSwiper"
              >
                {actorInfo.casts.map((cast, index) => (
                  <SwiperSlide key={index}>
                    <SlideFilmCard
                      id={cast.id}
                      title={cast.name}
                      image={cast.image?.medium}
                      premiered={cast.premiered}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          }
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Actor;
