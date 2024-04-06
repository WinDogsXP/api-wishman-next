"use client";
import AppListItem from "@/components/AppListItem";
import PageHeader from "@/components/PageHeader";
import { AppInfo } from "@/types";
import handleRouterPush from "@/util/handleRouterPush";
import { Add, Refresh } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  LinearProgress,
  List,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AppList({
  onlyUser,
  showNewButton,
}: {
  onlyUser?: boolean;
  showNewButton?: boolean;
}) {
  const [loading, setLoading] = useState(true);
  const [appList, setAppList] = useState<Array<AppInfo>>([]);
  const [user] = useAuthState(auth);
  const router = useRouter();

  const apiUrl = "/api/apps/getAll";
  const userFetchParams = {
    method: "POST",
    headers: {
      "Content-Type": "text/json",
    },
    body: JSON.stringify({ userId: user?.uid }),
  };

  const loadApps = () => {
    fetch(apiUrl, onlyUser ? userFetchParams : undefined)
      .then((res) => res.json())
      .then((res) => {
        setAppList(res.apps);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setAppList([]);
        enqueueSnackbar<"error">("Error loading application list!");
      });
  };

  useEffect(() => {
    if (onlyUser && (user == null || user == undefined)) {
      return;
    } else if (loading) loadApps();
  }, [loading, onlyUser, user]);

  return (
    <Box>
      <PageHeader
        title={(onlyUser ? "My " : "") + "Applications"}
        backButton={true}
      >
        {showNewButton && (
          <Tooltip title="Create new app">
            <IconButton
              component="a"
              href="/apps/new"
              onClick={handleRouterPush(router)}
            >
              <Add />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Refresh">
          <span>
            <IconButton
              disabled={loading}
              onClick={() => {
                loadApps();
              }}
            >
              <Refresh />
            </IconButton>
          </span>
        </Tooltip>
      </PageHeader>
      <LinearProgress style={{ visibility: loading ? "visible" : "hidden" }} />
      <Paper>
        {!loading && onlyUser && !user ? (
          <Box>
            <Box sx={{ p: 7, textAlign: "center" }}>
              <Typography variant="h5">
                You must be logged in to view this.
              </Typography>
            </Box>
          </Box>
        ) : appList && appList.length > 0 ? (
          <List sx={{ p: 0 }}>
            {appList.map((appInfo, index) => (
              <div key={index}>
                <AppListItem appInfo={appInfo} />
                {index < appList.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </div>
            ))}
          </List>
        ) : (
          !loading && (
            <Box sx={{ p: 7, textAlign: "center" }}>
              <Typography variant="h5">No applications!</Typography>
            </Box>
          )
        )}
      </Paper>
    </Box>
  );
}
