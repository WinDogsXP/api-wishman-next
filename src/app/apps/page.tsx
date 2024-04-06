"use client";
import AppListItem from "@/components/AppListItem";
import { AppInfo } from "@/types";
import { Box, Divider, List, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function ApplicationsPage() {
  const [loading, setLoading] = useState(true);
  const [appList, setAppList] = useState<Array<AppInfo>>([]);

  const getApps = () => {
    fetch("/api/apps/get")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
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
    if (loading) getApps();
  }, [loading]);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1.2 }}>
        Applications
      </Typography>
      <Paper>
        {loading ? (
          <Box sx={{ p: 7, textAlign: "center" }}>
            <Typography variant="h5">Loading...</Typography>
          </Box>
        ) : appList.length > 0 ? (
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
          <Box sx={{ p: 7, textAlign: "center" }}>
            <Typography variant="h5">No applications!</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
