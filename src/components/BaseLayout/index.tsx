"use client";
import {
  Box,
  CssBaseline,
  Theme,
  ThemeProvider,
  Toolbar,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useMemo } from "react";
import GlobalNavBar from "../GlobalNavBar";

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
      <GlobalNavBar maxPageWidth={maxPageWidth} />
      <Box sx={{ p: 2, margin: "0 auto", maxWidth: maxPageWidth }}>
        <Toolbar />
        <SnackbarProvider maxSnack={2} preventDuplicate />
        <CssBaseline />
        {children}
      </Box>
    </ThemeProvider>
  );
}
