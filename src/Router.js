import Main from "./components/layout/Main";
import { createBrowserRouter } from "react-router-dom";
import Films from "./components/Pages/Films";
import Home from "./components/Pages/Home";
import NotFound from "./components/Pages/NotFound";
import FilmDetails from "./components/Pages/FilmDetails";
import Register from "./components/Pages/Auth/Register";
import Auth from "./components/Pages/Auth/Register";
import Tvshows from "./components/Pages/Tvshows";
import PrivateRoute from "./components/PriveteRoute/PrivetRoute";
import Actor from "./components/Pages/Actor";
import ViewAllShows from "./components/Pages/ViewAllShows";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/tvshows",
        element: <Tvshows />,
      },
      {
        path: "/films/:filmId",
        element: <FilmDetails />,
      },
      {
        path: "/actor/:actorId",
        element: <Actor />,
      },
      {
        path: "/shows/:showType",
        element: <ViewAllShows />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <NotFound />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
