"use client";
import AppListItem from "@/components/AppListItem";
import PageNavBar from "@/components/PageNavBar";
import { AppInfo } from "@/types";
import { Refresh } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  LinearProgress,
  List,
  Paper,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function ApplicationsPage() {
  const [loading, setLoading] = useState(true);
  const [appList, setAppList] = useState<Array<AppInfo>>([]);

  const loadApps = () => {
    setLoading(true);
    fetch("/api/apps/getAll")
      .then((res) => res.json())
      .then((res) => {
        setAppList(res.apps);
        setLoading(false);
      })
      .catch((reason) => {
        setLoading(false);
        enqueueSnackbar<"error">("Error loading application list!");
      });
  };

  useEffect(() => {
    if (loading) loadApps();
  }, [loading]);

  return (
    <Box>
      <PageNavBar title="Applications" backButton={true}>
        <IconButton
          disabled={loading}
          onClick={() => {
            loadApps();
          }}
        >
          <Refresh />
        </IconButton>
      </PageNavBar>
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
