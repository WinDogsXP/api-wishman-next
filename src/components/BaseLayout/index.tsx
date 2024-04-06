"use client";
import { auth } from "@/app/firebase/config";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Theme,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [user] = useAuthState(auth);
  const router = useRouter();

  const theme = useMemo<Theme>(() => {
    return createTheme({
      palette: {
        primary: {
          main: "#9c27b0",
        },
        secondary: {
          main: "#1976d2",
        },
        mode: prefersDarkMode ? "dark" : "light",
      },
    });
  }, [prefersDarkMode]);

  const maxPageWidth = "800px";

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            margin: "0 auto",
            flexGrow: 1,
            width: "100%",
            maxWidth: maxPageWidth,
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            API Wishman
          </Typography>
          <Button
            component="a"
            href="/apps"
            color="inherit"
            onClick={(e) => {
              e.preventDefault();
              router.push("/apps");
            }}
          >
            Applications
          </Button>
          {user ? (
            <Button
              component="a"
              href="/dev"
              color="inherit"
              onClick={(e) => {
                e.preventDefault();
                router.push("/dev");
              }}
            >
              Dashboard
            </Button>
          ) : (
            <Button
              component="a"
              href="/dev/login"
              color="inherit"
              onClick={(e) => {
                e.preventDefault();
                router.push("/dev/login");
              }}
            >
              Dev Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2, margin: "0 auto", maxWidth: maxPageWidth }}>
        <Toolbar />
        <CssBaseline />
        {children}
      </Box>
    </ThemeProvider>
  );
}
