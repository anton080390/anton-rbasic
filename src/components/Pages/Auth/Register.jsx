import React, { useEffect, useState } from "react";
import { Paper, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleRegistration } from "../../store/AuthSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFullNameFocused, setIsFullNameFocused] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      fullName,
      email,
      password,
    };
    dispatch(handleRegistration(data));
    console.log(data);
  };

  return (
    <Paper
      sx={{
        padding: "50px",
        margin: "13rem auto",
        width: "300px",
        textAlign: "center",
      }}
      onSubmit={handleFormSubmit}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
        }}
      >
        <h1 style={{ color: "black", textAlign: "center" }}>Registration</h1>
        <TextField
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          onFocus={() => setIsFullNameFocused(true)}
          onBlur={() => setIsFullNameFocused(false)}
          type="text"
          label="Full Name"
          error={isFullNameFocused && fullName.length < 3}
          helperText={
            isFullNameFocused && fullName.length < 3 ? "too short" : ""
          }
        />
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label="Email"
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          label="Password"
        />
        <Button type="submit" disabled={loading}>
          Register
        </Button>
      </form>
    </Paper>
  );
};

export default Register;
