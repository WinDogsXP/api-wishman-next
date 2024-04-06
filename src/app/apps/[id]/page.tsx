"use client";
import { auth } from "@/app/firebase/config";
import EndpointListItem from "@/components/EndpointListItem/EndpointListItem";
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
} from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const apiUrl = "/api/apps/get/";

export default function ApplicationPage({
  params,
}: {
  params: { id: string };
}) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [appInfo, setAppInfo] = useState<AppInfo>();
  const [loading, setLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);

  function loadApp() {
    fetch(apiUrl + params.id)
      .then((res) => res.json())
      .then((json) => {
        const _appInfo = json.app as AppInfo;

        // Add appId to each endpoint object
        const _endpoints = [] as Endpoint[];
        _appInfo.endpoint?.forEach((endpoint, index) => {
          console.log(endpoint);
          _endpoints[index] = endpoint;
          _endpoints[index].appId = _appInfo.id;
        });
        _appInfo.endpoint = _endpoints;

        setAppInfo(_appInfo);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar<"error">("Error loading application details!");
        setLoading(false);
      });
  }

  useEffect(() => {
    if (loading) loadApp();
  }, [loading]);

  useEffect(() => {
    setCanEdit(
      user != null &&
        user != undefined &&
        appInfo != undefined &&
        user?.uid == appInfo?.userId
    );
  }, [user, appInfo]);

  return (
    <>
      <PageHeader title="Application" backButton={true}>
        {canEdit && (
          <>
            <Tooltip title="Edit application">
              <Button color="inherit">
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
          <Typography>ID: {params.id}</Typography>
        </Paper>

        <Stack>
          <PageHeader small title="Endpoints">
            {canEdit && (
              <Tooltip title="Create new endpoint">
                <IconButton
                  component="a"
                  href="/endpoints/new"
                  onClick={handleRouterPush(router)}
                >
                  <Add />
                </IconButton>
              </Tooltip>
            )}
          </PageHeader>
          <Paper>
            {!appInfo || !appInfo.endpoint || appInfo.endpoint.length == 0 ? (
              <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h6">No endpoints</Typography>
              </Box>
            ) : (
              appInfo.endpoint && (
                <List sx={{ p: "0 !important" }}>
                  {appInfo.endpoint.map((endpointInfo, index) => (
                    <div key={index}>
                      <EndpointListItem endpointInfo={endpointInfo} />
                      {appInfo.endpoint &&
                        index < appInfo.endpoint.length - 1 && (
                          <Divider variant="inset" />
                        )}
                    </div>
                  ))}
                </List>
              )
            )}
          </Paper>
        </Stack>
      </Stack>
    </>
  );
}
