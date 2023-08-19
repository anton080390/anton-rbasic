import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import "../Pages/Page.css";

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

function CustomTabPanel({ value, index, children }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`film-tabpanel-${index}`}
      aria-labelledby={`film-tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function BodyDetails({ activeTab, handleChangeTab, summary, status, genres }) {
  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* Добавили обертку в тему */}
      <>
        <div
          style={{
            marginTop: "2rem",
            marginBottom: "1rem",
            marginLeft: "2rem",
            fontSize: "1.3em",
            color: "rgb(232, 232, 232)",
            alignItems: "center",
          }}
        >
          <span
            style={{
              marginRight: "1rem",
              fontWeight: "bold",
              color: "red",
              fontSize: "1.5em",
            }}
          >
            TAGS:
          </span>
          {genres && genres.join(", ")}
        </div>

        <Box
          sx={{
            borderColor: "divider",
            margin: "2rem auto",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleChangeTab}
            aria-label="film-details-tabs"
            indicatorColor="secondary"
          >
            <Tab label="Description" sx={{ color: "white" }} />
            <Tab label="Rate&Review" sx={{ color: "white" }} />
          </Tabs>
        </Box>
        <div
          style={{
            width: "100%",
            marginBottom: "2rem",
          }}
        >
          <CustomTabPanel value={activeTab} index={0}>
            <div
              dangerouslySetInnerHTML={{ __html: summary }}
              style={{
                color: "white",
                height: "100px",
                overflow: "scroll",
              }}
            />
          </CustomTabPanel>
        </div>
        <div
          style={{
            borderBottom: "1px solid white",
            width: "100%",
            marginBottom: "2rem",
            overflow: "auto",
          }}
        >
          <CustomTabPanel value={activeTab} index={1}>
            <div
              style={{
                color: "white",
                height: "100px",
                overflow: "hidden",
              }}
            >
              {status}
            </div>
          </CustomTabPanel>
        </div>
      </>
    </ThemeProvider>
  );
}

export default BodyDetails;
