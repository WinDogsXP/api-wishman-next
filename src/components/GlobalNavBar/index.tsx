"use client";

import { auth } from "@/app/firebase/config";
import handleRouterPush from "@/util/handleRouterPush";
import { Apps, Login } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Link,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

export default function GlobalNavBar({
  maxPageWidth,
}: {
  maxPageWidth: string;
}) {
  const [user, loading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    const success = await signOut();
    if (!success) {
      enqueueSnackbar<"error">("Failed to sign you out!");
    }
    router.push("/dev/login");
  };

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          margin: "0 auto",
          flexGrow: 1,
          gap: 1,
          width: "100%",
          maxWidth: maxPageWidth,
          userSelect: "none",
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link
            href="/"
            style={{ color: "inherit", textDecoration: "inherit" }}
            onClick={handleRouterPush(router)}
          >
            API Wishman
          </Link>
        </Typography>

        <Button
          component="a"
          href="/apps"
          color="inherit"
          sx={{ display: { xs: "none", sm: "flex" } }}
          onClick={handleRouterPush(router)}
        >
          Applications
        </Button>
        <Tooltip title="Applications">
          <IconButton
            component="a"
            href="/apps"
            sx={{ display: { xs: "flex", sm: "none" } }}
            onClick={handleRouterPush(router)}
          >
            <Apps />
          </IconButton>
        </Tooltip>

        {!loading &&
          (user ? (
            <>
              <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                <Button
                  component="a"
                  href="/dev"
                  color="inherit"
                  onClick={handleRouterPush(router)}
                >
                  Dashboard
                </Button>
              </Box>
              <Box>
                <Tooltip title="Your account">
                  <IconButton sx={{ p: 0 }} onClick={handleMenu}>
                    <Avatar />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    component="a"
                    href="/dev"
                    onClick={handleRouterPush(router)}
                  >
                    <Typography>Dashboard</Typography>
                  </MenuItem>
                  <MenuItem
                    component="a"
                    href="/dev/apps"
                    onClick={handleRouterPush(router)}
                  >
                    <Typography>My Applications</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleSignOut}>
                    <Typography>Log Out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <Button
                component="a"
                href="/dev/login"
                color="inherit"
                sx={{ display: { xs: "none", sm: "flex" } }}
                onClick={handleRouterPush(router)}
              >
                Dev Login
              </Button>
              <Tooltip title="Dev Login">
                <IconButton
                  component="a"
                  href="/dev/login"
                  sx={{ display: { xs: "flex", sm: "none" } }}
                  onClick={handleRouterPush(router)}
                >
                  <Login />
                </IconButton>
              </Tooltip>
            </>
          ))}
      </Toolbar>
    </AppBar>
  );
}
