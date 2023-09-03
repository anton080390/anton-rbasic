import React from "react";
import { NavLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../Pages/Page.css";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "rgb(20, 20, 20)",
        color: "white",
        padding: "2rem 0",
        marginTop: "5rem",
      }}
    >
      <hr />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
        }}
      >
        <a className="footLink" href="#">
          Terms Of Use
        </a>
        <a className="footLink" href="#">
          Privacy-Policy
        </a>
        <a className="footLink" href="#">
          FAQ
        </a>
        <a className="footLink" href="#">
          Watch List
        </a>
      </div>
      <p
        style={{
          margin: "2rem",
          marginBottom: "1rem",
          color: "white",
          textAlign: "center",
        }}
      >
        2021 STREAMIT. All Rights Reserved. All videos and shows on this
        platform are trademarks of, and all related images and content are the
        property of, Streamit inc. Duplication and copy of this is strictly
        prohibited. All rights reserved.
      </p>

      <div style={{ margin: "1rem" }}>
        <p style={{ textAlign: "center", margin: "1rem 0 0" }}>Follow Us:</p>
        <br />
        <div style={{ textAlign: "center", margin: "0" }}>
          <NavLink className="whiteNavLink">
            <FacebookIcon
              style={{ width: "24px", height: "24px", marginRight: "1rem" }}
            />
          </NavLink>
          <NavLink className="whiteNavLink">
            <TwitterIcon
              style={{ width: "24px", height: "24px", marginRight: "1rem" }}
            />
          </NavLink>
          <NavLink className="whiteNavLink">
            <GoogleIcon
              style={{ width: "24px", height: "24px", marginRight: "1rem" }}
            />
          </NavLink>
          <NavLink className="whiteNavLink">
            <GitHubIcon
              style={{ width: "24px", height: "24px", marginRight: "1rem" }}
            />
          </NavLink>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
