"use client";
import { AppInfo } from "@/types";
import {
  Box,
  Button,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import formDataToDict from "@/util/formDataToDict";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";

export default function NewApp() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const newAppInfo: AppInfo = {
    id: "",
    userId: user?.uid || "",
    name: "",
    hours: 12,
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const formDataDict = formDataToDict(formData);
    formDataDict.hours = parseInt(formDataDict.hours);
    formDataDict.reportEmail = user?.email ?? "";
    const apiUrl = "/api/apps/new";

    console.log(formDataDict);

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataDict),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        enqueueSnackbar<"success">("Application created succesfully!");
        router.replace("/apps/" + res.app.id);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar<"error">("Failed to create application!");
        setLoading(false);
      });
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <PageHeader title="Create new application" backButton />
      <LinearProgress
        style={{
          visibility: loading ? "visible" : "hidden",
        }}
      />
      <Paper sx={{ px: 1.3, py: 1.7, pt: 0.3 }}>
        <Stack spacing={1.7}>
          <input type="hidden" name="id" defaultValue={newAppInfo.id} />
          <input type="hidden" name="userId" defaultValue={newAppInfo.userId} />
          <TextField
            label="Name"
            required
            name="name"
            type="text"
            disabled={loading}
            defaultValue={newAppInfo.name}
          />
          <TextField
            label="Description"
            multiline
            name="description"
            type="text"
            disabled={loading}
            defaultValue={newAppInfo.description || ""}
          />
          <TextField
            label="Time history (hours)"
            name="hours"
            required
            type="number"
            disabled={loading}
            defaultValue={newAppInfo.hours}
          />
          <Stack spacing={1}>
            <Divider />
            <Stack direction="row-reverse" spacing={1.5}>
              <Button
                color="success"
                variant="contained"
                type="submit"
                disabled={loading}
              >
                Create
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
