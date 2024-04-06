"use client";
import AppListItem from "@/components/AppListItem";
import { AppInfo } from "@/types";
import { Refresh, Visibility } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  LinearProgress,
  List,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function ApplicationsPage() {
  const [loading, setLoading] = useState(true);
  const [appList, setAppList] = useState<Array<AppInfo>>([]);

  const loadApps = () => {
    setLoading(true);
    fetch("/api/apps/get")
      .then((res) => res.json())
      .then((res) => {
        if (res.apps.length == 0) {
          console.log("No apps!");
        }
        setAppList(res.apps);
        setLoading(false);
      })
      .catch((reason) => {
        console.log(reason);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (loading) loadApps();
  }, [loading]);

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1.2, mb: 1.2 }}>
        <Typography variant="h5" sx={{ flexGrow: 1, pl: 1, py: 0.5 }}>
          Applications
        </Typography>
        <IconButton
          disabled={loading}
          onClick={() => {
            loadApps();
          }}
        >
          <Refresh />
        </IconButton>
      </Box>
      <LinearProgress style={{ visibility: loading ? "visible" : "hidden" }} />
      <Paper>
        {appList.length > 0 ? (
          <List sx={{ p: 0 }}>
            {appList.map((appInfo, index) => (
              <>
                <AppListItem key={index} appInfo={appInfo} />
                {index < appList.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </>
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
