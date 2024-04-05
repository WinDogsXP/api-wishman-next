"use client";
import { Brightness4 } from "@mui/icons-material";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkTheme, setDarkTheme] = useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#9c27b0",
      },
      secondary: {
        main: "#1976d2",
      },
      mode: darkTheme ? "dark" : "light",
    },
  });

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <html lang="en">
      <head>
        <title>API Wishman</title>
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                API Wishman
              </Typography>
              <IconButton
                size="large"
                color="inherit"
                aria-label="switch theme"
                onClick={toggleTheme}
              >
                <Brightness4 />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box sx={{ p: 2 }}>
            <Toolbar />
            <CssBaseline />
            {children}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
