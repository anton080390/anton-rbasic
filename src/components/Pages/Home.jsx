import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import FilmCard from "../FilmCard/FilmCard";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../store/SearchSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import useRequest from "../../components/hooks/useRequest";
import "swiper/css";
import { Typography, Link, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Pagination } from "swiper/modules";
import TopFilmsCard from "../FilmCard/TopFilmsCard";
import SlideFilmCard from "../FilmCard/SlideFilmCard";
import { Navigation } from "swiper/modules";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Page.css";
import useMediaQuery from "@mui/material/useMediaQuery";

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: red[500],
    },
  },
});

function Home() {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const apiSearch = useSelector((state) => state.search.value);
  const apiData = useRequest(
    `https://api.tvmaze.com/search/shows?q=${apiSearch}`
  );

  const searchRef = useRef();
  const dispatch = useDispatch();
  const actionFilms = useRequest(
    "https://dolphin-app-pc6ii.ondigitalocean.app/article/byGenre/Action"
  );
  const comedyFilms = useRequest(
    "https://dolphin-app-pc6ii.ondigitalocean.app/article/byGenre/Comedy"
  );
  const popularFilms = useRequest(
    "http://dolphin-app-pc6ii.ondigitalocean.app/article"
  );

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleCardClick = (id) => {
    setSelectedFilm(id);
  };

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const navigate = useNavigate();

  return (
    <>
      <Grid
        item
        container
        pb={7}
        pt={1}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {popularFilms?.map((show) => (
            <SwiperSlide key={show.id}>
              <TopFilmsCard
                id={show.id}
                title={show.name}
                premiered={show.premiered}
                image={show.image ? show.image.original : ""}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
      <h2>{selectedFilm}</h2>
      <Grid container spacing={2} sx={{ padding: "15px" }}>
        {apiData.map(({ show }) => (
          <Grid item xs={6} sm={6} md={4} key={show.id}>
            <FilmCard
              id={show.id}
              title={show.name}
              description={show.premiered}
              premiered={show.premiered}
              image={show.image ? show.image.medium : ""}
              makeClick={handleCardClick}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              style={{ color: "#fff", marginLeft: "1.25rem" }}
              variant="h3"
            >
              Action show
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              style={{
                textDecoration: "none",
                color: "#fff",
                marginLeft: "1rem",
                border: "none",
              }}
              onClick={() => navigate("/shows/Action")}
            >
              View All Action Shows
            </Button>
          </div>
          <ThemeProvider theme={theme}>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="NavSwiper"
              spaceBetween={30}
              slidesPerView={isMobile ? 2 : 4}
              theme={theme}
              style={{
                margin: "40px 1rem",
                backgroundColor: "black",
                color: theme.palette.primary.main,
              }}
            >
              {actionFilms?.map((show) => (
                <SwiperSlide key={show.id} sx={{ margin: "0" }}>
                  <SlideFilmCard
                    id={show.id}
                    title={show.name}
                    premiered={show.premiered}
                    image={show.image ? show.image.medium : ""}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </ThemeProvider>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              style={{ color: "#fff", marginLeft: "1.25rem" }}
              variant="h3"
            >
              Comedy show
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              style={{
                textDecoration: "none",
                color: "#fff",
                marginLeft: "1rem",
                border: "none",
              }}
              onClick={() => navigate("/shows/Comedy")}
            >
              View All Comedy Shows
            </Button>
          </div>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="NavSwiper"
            spaceBetween={30}
            slidesPerView={isMobile ? 2 : 4}
            style={{ margin: "40px 1rem", backgroundColor: "black" }}
          >
            {comedyFilms?.map((show) => (
              <SwiperSlide key={show.id}>
                <SlideFilmCard
                  id={show.id}
                  title={show.name}
                  premiered={show.premiered}
                  image={show.image ? show.image.medium : ""}
                  sx={{ height: "200px" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
