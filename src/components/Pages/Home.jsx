import { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import useRequest from "../../components/hooks/useRequest";
import SingleCard from "../FilmCard/FilmCard";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../store/SearchSlice";

function Home() {
  const [selectedFilm, setSelectedFilm] = useState(null);
  // const [search, setSearch] = useState("");
  const apiSearch = useSelector((state) => state.search.value);
  const apiData = useRequest(apiSearch);
  const searchRef = useRef("");
  const dispatch = useDispatch();

  useEffect(() => {
    searchRef.current.focus();
  });

  const handleCardClick = (id) => {
    setSelectedFilm(id);
  };

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };
  return (
    <>
      <Grid
        item
        container
        pb={7}
        pt={7}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <input
          type="text"
          value={apiSearch}
          onChange={handleSearch}
          ref={searchRef}
          style={{
            color: "#fff",
            backgroundColor: " rgba(200, 200, 200, .6",
            height: "30px",
            border: "none",
          }}
        />
      </Grid>

      <h2>{selectedFilm}</h2>
      <Grid container spacing={2} sx={{ padding: "15px" }}>
        {apiData.map(({ show }, index) => (
          <Grid item xs={4} key={index}>
            <SingleCard
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
    </>
  );
}
export default Home;
