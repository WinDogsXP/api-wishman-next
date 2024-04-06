"use client";
import {
  Button,
  Divider,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { auth } from "../firebase/config";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/navigation";
import handleRouterPush from "@/util/handleRouterPush";
import { Apps, Logout } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, loadingAuth] = useAuthState(auth);
  const [signOut, loadingSO, errorSO] = useSignOut(auth);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    {
      name: "Total apps",
      value: "-",
    },
    {
      name: "Apps with issues",
      value: "-",
    },
    {
      name: "Active reports",
      value: "-",
    },
  ]);

  const linkList = [
    {
      name: "My Applications",
      icon: <Apps />,
      href: "/dev/apps",
    },
  ];

  const getStats = () => {
    fetch("/api/report/count", {
      method: "POST",
      headers: {
        "Content-Type": "text/json",
      },
      body: JSON.stringify({ userId: user?.uid }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setStats(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!loadingAuth) getStats();
  }, [loadingAuth]);

  return (
    <>
      <PageHeader title="Developer Dashboard" />
      {loading ? (
        <LinearProgress />
      ) : user ? (
        <Stack spacing={2}>
          <Paper sx={{ p: 1.2 }}>
            <Stack
              sx={{
                gap: 1.5,
                flexDirection: { xs: "column", sm: "row" },
                flexWrap: "wrap",
              }}
            >
              {stats.map((stat, index) => (
                <Paper
                  key={index}
                  variant="outlined"
                  sx={{
                    p: 0.6,
                    background: "transparent",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Stack>
                    <Typography variant="h3">{stat.value}</Typography>
                    <Typography>{stat.name}</Typography>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Paper>

          <Paper>
            <Typography variant="h5">Latest reports</Typography>
          </Paper>

          <Paper>
            <List>
              {linkList.map((link, index) => (
                <ListItemButton
                  key={index}
                  component="a"
                  href={link.href}
                  onClick={handleRouterPush(router)}
                >
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText>{link.name}</ListItemText>
                </ListItemButton>
              ))}
              <Divider />
              <ListItemButton
                onClick={async () => {
                  const success = await signOut();
                  router.replace("/dev/login");
                }}
              >
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText>Log out</ListItemText>
              </ListItemButton>
            </List>
          </Paper>
        </Stack>
      ) : (
        <Paper sx={{ p: 1 }}>
          <Paper
            variant="outlined"
            sx={{
              py: 1.7,
              background: "transparent",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.2,
            }}
          >
            <Typography>You are not logged in.</Typography>
            <Button
              component="a"
              href="/dev/login"
              variant="outlined"
              onClick={handleRouterPush(router)}
            >
              Login
            </Button>
          </Paper>
        </Paper>
      )}
    </>
  );
}
