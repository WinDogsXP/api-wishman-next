"use client";
import { FormEvent } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { CheckCircle, Error } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  const theme = useTheme();

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    await createUserWithEmailAndPassword(
      formData.get("email") as string,
      formData.get("password") as string
    );
    console.log(user);
    return false;
  };

  return (
    <Paper
      sx={{
        p: 1.5,
        maxWidth: "400px",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        userSelect: "none",
      }}
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
            <Button
              component="a"
              href="/dev"
              variant="contained"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                router.push("/dev");
              }}
            >
              Go to Dashboard
            </Button>
          </Box>
        </>
      ) : (
        <Box
          component="form"
          onSubmit={handleSignUp}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.6,
          }}
        >
          <Typography>Create a new account</Typography>
          {error && (
            <Paper
              sx={{
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
                p: 1,
                display: "flex",
                gap: 1,
              }}
            >
              <Error />
              <Typography>{error?.message}</Typography>
            </Paper>
          )}
          <TextField
            variant="outlined"
            name="email"
            type="email"
            label="Email Address"
            disabled={loading}
            sx={{ mt: 1 }}
            required
          />
          <TextField
            variant="outlined"
            name="password"
            type="password"
            label="Password"
            disabled={loading}
            required
          />
          <Box sx={{ display: "flex", gap: 1.5, mx: "auto" }}>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={loading}
            >
              Sign Up
            </Button>
            <Button variant="outlined" type="reset" disabled={loading}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default SignUp;
