import * as React from "react";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink } from "react-router-dom";
import { MENU } from "../constants/constantns";
import logoImage from "./logo.png";
import "./Navigation.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "../../components/hooks/useRequest";
import { setSearch } from "../store/SearchSlice";

const pages = ["Home", "Films", "TV Show"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
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

export default function Navigation() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const dispatch = useDispatch();
  const apiSearch = useSelector((state) => state.search.value);
  const [inputValue, setInputValue] = React.useState("");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearch = (e) => {
    setInputValue(e.target.value);
    dispatch(setSearch(e.target.value));
  };

  const apiData = useRequest(
    `https://api.tvmaze.com/search/shows?q=${apiSearch}`
  );

  return (
    <AppBar
      className="navigation-container"
      sx={{
        backgroundColor: "rgba(20, 20, 20, 0.7)",
        position: "fixed",
        zIndex: 100,
        top: 0,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            alt="Logo"
            src={logoImage}
            sx={{
              width: "250px",
              height: "50px",
            }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Box
              className="navLinkContainer"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {MENU.map(({ name, link }, index) => (
                <NavLink
                  key={index}
                  className={({ isActive }) =>
                    `navLink ${isActive ? "isActive" : ""}`
                  }
                  to={link}
                >
                  {name}
                </NavLink>
              ))}
            </Box>
          </Box>

          <ThemeProvider theme={theme}>
            <TextField
              label="Поиск..."
              value={inputValue}
              onChange={handleSearch}
              sx={{
                width: "20rem",
                marginRight: "5rem",
                "& input": {
                  width: "100%",
                  borderColor: theme.palette.primary.main,
                  color: "#fff",
                },
                "& label": {
                  color: "#fff",
                },
              }}
            />
          </ThemeProvider>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
