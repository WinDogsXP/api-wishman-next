"use client";
import { AppInfo, Endpoint } from "@/types";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import PageHeader from "../../components/PageHeader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import formDataToDict from "@/util/formDataToDict";

export default function EndpointEditForm({
  endpoint,
  appId,
}: {
  endpoint?: Endpoint;
  appId: string;
}) {
  const [user] = useAuthState(auth);

  const newEndpoint: Endpoint = endpoint || {
    id: "",
    url: "",
    name: "",
    headers: "",
    method: "",
    body: "",
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const formDataDict = formDataToDict(formData);
    formDataDict.interval = parseInt(formDataDict.interval);

    console.log(formDataDict);

    const apiUrl =
      (endpoint
        ? "/api/endpoints/edit/" + formData.get("id")
        : "/api/endpoints/new/") + appId;

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
        title={(endpoint ? "Edit" : "Add") + " endpoint"}
        backButton
      />
      <Paper sx={{ px: 1.3, py: 1.7, pt: 0.3 }}>
        <Stack spacing={1.7}>
          <input type="hidden" name="id" defaultValue={newEndpoint.id} />
          <TextField
            label="Name"
            required
            name="name"
            type="text"
            defaultValue={newEndpoint.name}
          />
          <TextField
            label="URL"
            required
            name="url"
            type="text"
            defaultValue={newEndpoint.url}
          />
          <FormControl>
            <InputLabel id="method-label">Method</InputLabel>
            <Select
              labelId="method-label"
              label="Method"
              required
              name="method"
              defaultValue={newEndpoint.method}
            >
              <MenuItem value="GET">GET</MenuItem>
              <MenuItem value="POST">POST</MenuItem>
              <MenuItem value="PUT">PUT</MenuItem>
              <MenuItem value="DELETE">DELETE</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="interval-label">Interval</InputLabel>
            <Select
              labelId="interval-label"
              label="Interval"
              required
              name="interval"
              defaultValue={newEndpoint.interval}
            >
              <MenuItem value="1">1s</MenuItem>
              <MenuItem value="5">5s</MenuItem>
              <MenuItem value="30">30s</MenuItem>
              <MenuItem value="60">1min</MenuItem>
              <MenuItem value="300">5min</MenuItem>
              <MenuItem value="900">15min</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Headers"
            name="headers"
            type="text"
            defaultValue={newEndpoint.headers}
          />
          <TextField
            label="Body"
            name="body"
            type="text"
            defaultValue={newEndpoint.body}
          />

          <Stack spacing={1}>
            <Divider />
            <Stack direction="row-reverse" spacing={1.5}>
              <Button color="success" variant="contained" type="submit">
                {endpoint ? "Save" : "Add"}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
