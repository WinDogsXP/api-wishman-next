"use client";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { CheckCircle, Error } from "@mui/icons-material";
import { FormEvent, useEffect } from "react";

const SignIn = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [userState] = useAuthState(auth);
  const router = useRouter();
  const theme = useTheme();

  const handleLogIn = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const res = await signInWithEmailAndPassword(
      formData.get("email") as string,
      formData.get("password") as string
    );
    console.log(user);
    sessionStorage.setItem("user", JSON.stringify(user));
    return false;
  };

  useEffect(() => {
    if (userState) router.replace("/dev");
  }, [router, userState]);

  return userState ? (
    <Box sx={{ display: "flex", alignItems: "center", pt: 8 }}>
      <CircularProgress size="large" />
    </Box>
  ) : (
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
        <Typography variant="h5">Log In</Typography>
        <Divider />
      </Box>
      <Box
        component="form"
        onSubmit={handleLogIn}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.6,
        }}
      >
        <Typography>Log in to an existing account</Typography>
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
            Log In
          </Button>
          <Button variant="outlined" type="reset" disabled={loading}>
            Cancel
          </Button>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography sx={{ p: 0.6 }}>Don&apos;t have an account?</Typography>
        <Button
          component="a"
          href="/dev/signup"
          variant="outlined"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            router.push("/dev/signup");
          }}
        >
          Create account
        </Button>
      </Box>
    </Paper>
  );
};

export default SignIn;
