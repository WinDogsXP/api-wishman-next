"use client";
import { Brightness4 } from "@mui/icons-material";
import {
  AppBar,
  Box,
  CssBaseline,
  Theme,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useMemo } from "react";

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

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
