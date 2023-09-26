import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import Rating from "@mui/material/Rating";

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
      {value === index && (
        <Box p={3} style={{ maxHeight: "200px", overflowY: "auto" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function BodyDetails({ activeTab, handleChangeTab, summary, series, genres }) {
  return (
    <ThemeProvider theme={theme}>
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
            margin: "1rem auto",
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
            <Tab label="Episodes" sx={{ color: "white" }} />
          </Tabs>
        </Box>
        <div
          style={{
            width: "100%",
          }}
        >
          <CustomTabPanel value={activeTab} index={0}>
            <div
              dangerouslySetInnerHTML={{ __html: summary }}
              style={{
                color: "white",
                height: "200px",
                overflow: "auto",
              }}
            />
          </CustomTabPanel>
        </div>
        <div
          style={{
            borderBottom: "1px solid white",
            width: "100%",
            marginBottom: "2rem",
          }}
        >
          <CustomTabPanel value={activeTab} index={1}>
            <table
              style={{
                color: "white",
                width: "100%",
                height: "200px",
                overflow: "auto",
              }}
            >
              <thead>
                <tr
                  style={{
                    textAlign: "left",
                    color: "red",
                    fontSize: "25px",
                    backgroundColor: "rgb(40, 43,47)",
                    height: "2rem",
                  }}
                >
                  <th style={{ textAlign: "left", height: "3rem" }}>Episode</th>
                  <th style={{ textAlign: "center" }}>Airdate</th>
                  <th style={{ textAlign: "center" }}>Rating</th>
                </tr>
              </thead>
              <tbody>
                {series.map((series) => (
                  <tr
                    key={series.id}
                    style={{
                      margin: "1rem",
                      borderBottom: "1px solid white",
                    }}
                  >
                    <td
                      style={{
                        margin: "1rem",
                        backgroundColor: "rgb(25, 25, 25)",
                        height: "2rem",
                      }}
                    >
                      {series.name} (Season {series.season}, Episode
                      {series.number})
                    </td>
                    <td
                      style={{
                        margin: "1rem",
                        backgroundColor: "rgb(25, 25, 25)",
                        textAlign: "center",
                      }}
                    >
                      {series.airdate}
                    </td>
                    <td
                      style={{
                        margin: "1rem",
                        backgroundColor: "rgb(25, 25, 25)",
                        textAlign: "center",
                      }}
                    >
                      <Rating
                        name={`rating-${series.id}`}
                        value={series.rating.average}
                        max={10}
                        size="small"
                        readOnly
                        style={{ color: "red" }}
                      />
                      {series.rating.average}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CustomTabPanel>
        </div>
      </>
    </ThemeProvider>
  );
}

export default BodyDetails;
