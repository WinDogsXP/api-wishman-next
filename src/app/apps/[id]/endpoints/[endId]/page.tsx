"use client";

import { auth } from "@/app/firebase/config";
import EndpointListItem from "@/components/EndpointListItem";
import PageHeader from "@/components/PageHeader";
import { AppInfo, Endpoint } from "@/types";
import handleRouterPush from "@/util/handleRouterPush";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Paper,
  Stack,
  Typography,
  Divider,
  IconButton,
  LinearProgress,
  List,
  Tooltip,
  Button,
  Box,
  ListItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function EndpointPage({
  params,
}: {
  params: { id: string; endId: string };
}) {
  const [user] = useAuthState(auth);
  const [info, setInfo] = useState<Endpoint>();
  const router = useRouter();
  const [canEdit, setCanEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch("/api/endpoints/get" + params.endId).then((res) => {
    //   res.json().then((json) => {
    //     setInfo(json);
    //   });
    // });
    setInfo({ name: "/" } as Endpoint);
  }, []);

  return (
    <>
      <PageHeader title={info ? info.name : "Endpoint"} backButton={true}>
        {canEdit && (
          <>
            <Tooltip title="Edit endpoint">
              <Button
                component="a"
                href={"/apps/endpoints/" + params.id + "/new/" + params.endId}
                color="inherit"
                onClick={handleRouterPush(router)}
              >
                <Stack direction="row" gap={1}>
                  <Edit />
                  <Typography>Edit</Typography>
                </Stack>
              </Button>
            </Tooltip>
            <Tooltip title="Delete application">
              <IconButton color="inherit">
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        )}
      </PageHeader>
      <LinearProgress style={{ visibility: loading ? "visible" : "hidden" }} />
      <Stack gap={1}>
        <Paper sx={{ p: 1 }}>
          <List>
            <ListItem>
              <Typography>ID: {params.id}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Name: {info?.name}</Typography>
            </ListItem>
          </List>
        </Paper>

        <Stack>
          <PageHeader small title="Status">
            {canEdit && (
              <Tooltip title="Create new endpoint">
                <IconButton
                  component="a"
                  href={"/apps/" + params.id + "/endpoints/new"}
                  onClick={handleRouterPush(router)}
                >
                  <Add />
                </IconButton>
              </Tooltip>
            )}
          </PageHeader>
          <Paper>
            <Typography>Sunt un endpoint</Typography>
          </Paper>
        </Stack>
      </Stack>
    </>
  );
}
