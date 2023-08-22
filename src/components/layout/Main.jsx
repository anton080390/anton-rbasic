import Navigation from "../Navigation/Navigation";
import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import Footer from "../FilmComponents/Footer";

function Main() {
  return (
    <div className="App">
      <Navigation />
      <Grid container>
        <Outlet />
      </Grid>
      <Footer />
    </div>
  );
}

export default Main;
