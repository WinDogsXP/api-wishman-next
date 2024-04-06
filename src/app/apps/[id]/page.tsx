"use client";
import { auth } from "@/app/firebase/config";
import EndpointListItem from "@/components/EndpointListItem/EndpointListItem";
import PageHeader from "@/components/PageHeader";
import { AppInfo, Endpoint } from "@/types";
import handleRouterPush from "@/util/handleRouterPush";
import { Add } from "@mui/icons-material";
import {
  Paper,
  Stack,
  Typography,
  Divider,
  IconButton,
  LinearProgress,
  List,
  Tooltip,
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
    loadApp();
  }, []);

  return (
    <>
      <PageHeader title="Application" backButton={true} />
      <Stack gap={1}>
        <Paper sx={{ p: 1 }}>
          <Typography>ID: {params.id}</Typography>
        </Paper>

        <Stack>
          <PageHeader small title="Endpoints">
            {user && appInfo && user?.uid == appInfo?.userId && (
              <Tooltip title="Create new endpoint">
                <IconButton
                  component="a"
                  href="/apps/new"
                  onClick={handleRouterPush(router)}
                >
                  <Add />
                </IconButton>
              </Tooltip>
            )}
          </PageHeader>
          <LinearProgress
            style={{ visibility: loading ? "visible" : "hidden" }}
          />
          <Paper>
            {appInfo?.endpoint && (
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
            )}
          </Paper>
        </Stack>
      </Stack>
    </>
  );
}
