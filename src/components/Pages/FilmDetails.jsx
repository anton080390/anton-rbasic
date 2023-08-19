import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../FilmComponents/Header";
import BodyDetails from "../FilmComponents/BodyDetails";
import Footer from "../FilmComponents/Footer";
import StarringItem from "../FilmComponents/StarringItem"; // Импортируйте новый компонент

function FilmDetails() {
  const { filmId } = useParams();
  const [filmData, setFilmData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

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

  const { name, rating, genres, schedule, premiered, image, summary, status } =
    filmData;

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Header
        name={name}
        rating={rating}
        genres={genres}
        schedule={schedule}
        premiered={premiered}
        image={image}
        activeTab={activeTab}
        handleChangeTab={handleChangeTab}
        summary={summary}
        status={status}
      />
      <BodyDetails
        activeTab={activeTab}
        handleChangeTab={handleChangeTab}
        summary={summary}
        status={status}
        genres={genres}
      />
      <div style={{ width: "100%" }}>
        <StarringItem showId={filmId} />
      </div>
      <Footer />
    </>
  );
}

export default FilmDetails;
