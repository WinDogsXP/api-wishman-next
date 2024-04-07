"use client";
import {
  Box,
  Button,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import formDataToDict from "@/util/formDataToDict";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";

export default function NewBugReport({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFormSubmit = (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const formDataDict = formDataToDict(formData);

    console.log(formDataDict);

    fetch("/api/bugs/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataDict),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        enqueueSnackbar<"success">("Bug report sent succesfully!");
        router.back();
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar<"error">("Failed to send bug report!");
        setLoading(false);
      });
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <PageHeader title="New Bug Report" backButton />
      <LinearProgress
        style={{
          visibility: loading ? "visible" : "hidden",
        }}
      />
      <Paper sx={{ px: 1.3, py: 1.7, pt: 0.3 }}>
        <Stack spacing={1.7}>
          <input type="hidden" name="appId" defaultValue={params.id} />
          <TextField
            label="Title"
            required
            name="name"
            type="text"
            disabled={loading}
          />
          <TextField
            label="Details"
            multiline
            required
            name="details"
            type="text"
            disabled={loading}
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
                Send
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
