"use client";
import { FormEvent, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const SignUp = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    console.log(formData);
    const res = await createUserWithEmailAndPassword(
      formData.get("email") as string,
      formData.get("password") as string
    );
    console.log(res);
    sessionStorage.setItem("user", "true");
    return false;
  };

  return (
    <Paper
      component="form"
      sx={{
        p: 1.5,
        maxWidth: "400px",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        userSelect: "none",
      }}
      onSubmit={handleSignUp}
    >
      <Box>
        <Typography variant="h5">Sign Up</Typography>
        <Divider />
      </Box>
      {user ? (
        <>
          <Box
            sx={{
              py: 4.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.2,
            }}
          >
            <CheckCircle sx={{ fontSize: "48px" }} />
            <Typography>Account created successfully!</Typography>
            <Button variant="contained" type="submit">
              Go to My Account
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography>Create a new account</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              variant="outlined"
              name="email"
              type="email"
              label="Email Address"
              required
            />
            <TextField
              variant="outlined"
              name="password"
              type="password"
              label="Password"
              required
            />
          </Box>
          <Box sx={{ display: "flex", gap: 1.5, mx: "auto" }}>
            <Button variant="contained" color="success" type="submit">
              Sign Up
            </Button>
            <Button variant="outlined" type="reset">
              Cancel
            </Button>
          </Box>
        </>
      )}
    </Paper>
    // <div>
    //   <div>
    //     <h1>Sign Up</h1>
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       className=""
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button onClick={handleSignUp}>Sign Up</button>
    //   </div>
    //   <p>{errorState}</p>
    //   <p>{error?.message}</p>
    // </div>
  );
};

export default SignUp;
