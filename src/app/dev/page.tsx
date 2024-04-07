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
import { BugInfo } from "@/types";
import BugListItem from "@/components/BugListItem";

export default function DashboardPage() {
  const [user, loadingAuth] = useAuthState(auth);
  const [signOut, loadingSO, errorSO] = useSignOut(auth);
  const router = useRouter();

  const linkList = [
    {
      name: "My Applications",
      icon: <Apps />,
      href: "/dev/apps",
    },
  ];

  const [statsLoading, setStatsLoading] = useState(true);
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
        setStatsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setStatsLoading(false);
      });
  };

  const [bugsLoading, setBugsLoading] = useState(true);
  const [bugReports, setBugReports] = useState<BugInfo[]>([]);
  const getBugReports = () => {
    fetch("/api/bugs/get/dev", {
      method: "POST",
      headers: {
        "Content-Type": "text/json",
      },
      body: JSON.stringify({ userId: user?.uid }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setBugReports(res);
        setBugsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setBugsLoading(false);
      });
  };

  useEffect(() => {
    if (!loadingAuth) {
      getStats();
      getBugReports();
    }
  }, [loadingAuth]);

  return (
    <>
      <PageHeader title="Developer Dashboard" />
      {loadingAuth ? (
        <LinearProgress />
      ) : user ? (
        <>
          <LinearProgress
            sx={{
              visibility: statsLoading || bugsLoading ? "visible" : "hidden",
            }}
          />
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
              <Typography variant="h5" sx={{ px: 2, py: 1 }}>
                Latest reports
              </Typography>
              <Divider />
              <List sx={{ p: "0 !important" }}>
                {bugReports.map((value, index) => (
                  <BugListItem bugInfo={value} key={index} />
                ))}
              </List>
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
        </>
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
