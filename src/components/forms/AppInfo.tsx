"use client";
import { AppInfo } from "@/types";
import { Box, Button, Divider, Paper, Stack, TextField } from "@mui/material";
import PageHeader from "../PageHeader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import formDataToDict from "@/util/formDataToDict";

export default function AppInfoForm({ appInfo }: { appInfo?: AppInfo }) {
  const [user] = useAuthState(auth);

  const newAppInfo: AppInfo = appInfo || {
    id: "",
    userId: user?.uid || "",
    name: "",
    hours: 12,
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const formDataDict = formDataToDict(formData);
    formDataDict.hours = parseInt(formDataDict.hours);

    const apiUrl = appInfo
      ? "/api/apps/edit/" + formData.get("id")
      : "/api/apps/new";

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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <PageHeader
        title={(appInfo ? "Edit" : "Add") + " application"}
        backButton
      />
      <Paper sx={{ px: 1.3, py: 1.7 }}>
        <Stack spacing={1.7}>
          <input type="hidden" name="id" defaultValue={newAppInfo.id} />
          <input type="hidden" name="userId" defaultValue={newAppInfo.userId} />
          <TextField
            label="Name"
            required
            name="name"
            type="text"
            defaultValue={newAppInfo.name}
          />
          <TextField
            label="Description"
            multiline
            name="description"
            type="text"
            defaultValue={newAppInfo.description || ""}
          />
          <TextField
            label="Time history (hours)"
            name="hours"
            required
            type="number"
            defaultValue={newAppInfo.hours}
          />
          <Stack spacing={1}>
            <Divider />
            <Stack direction="row-reverse" spacing={1.5}>
              <Button color="success" variant="contained" type="submit">
                {appInfo ? "Save" : "Add"}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
