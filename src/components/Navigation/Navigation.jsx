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
import { NavLink } from "react-router-dom";
import { MENU } from "../constants/constantns";
import logoImage from "./logo.png";
import "./Navigation.css";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "../../components/hooks/useRequest";
import { setSearch } from "../store/SearchSlice";
import Drawer from "@mui/material/Drawer";

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
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false); // Добавляем состояние для фокуса на поле поиска

  const dispatch = useDispatch();
  const apiSearch = useSelector((state) => state.search.value);
  const [inputValue, setInputValue] = React.useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

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

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const apiData = useRequest(
    `https://api.tvmaze.com/search/shows?q=${apiSearch}`
  );

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <React.Fragment>
      <AppBar
        className={`navigation-container ${
          isSearchFocused ? "search-focused" : ""
        }`}
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

            <IconButton
              size="large"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              color="inherit"
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>

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
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                sx={{
                  width: isSearchFocused ? "23rem" : "20rem",
                  minWidth: "4rem",
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

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "rgba(20, 20, 20, 0.7)",
            color: "#fff",
          },
        }}
      >
        <Box
          sx={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            paddingTop: 2,
          }}
        >
          {pages.map((page, index) => (
            <NavLink
              key={index}
              to={MENU[index].link}
              className="drawerNavLink"
              style={{
                color: "red",
                fontWeight: "bold",
                margin: "10px",
              }}
            >
              {page}
            </NavLink>
          ))}
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
