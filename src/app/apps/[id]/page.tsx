"use client";

import PageHeader from "@/components/PageHeader";
import { Box, Paper, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";

const apiUrl = "/api/apps/get/";

export default function ApplicationPage({
  params,
}: {
  params: { id: string };
}) {
  function loadApp() {
    fetch(apiUrl + params.id)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar<"error">("Error loading application!");
      });
  }

  useEffect(() => {
    loadApp();
  }, []);

  return (
    <Box>
      <PageHeader title="Application" backButton={true} />
      <Paper sx={{ p: 1 }}>
        <Typography>ID: {params.id}</Typography>
      </Paper>
    </Box>
  );
}
