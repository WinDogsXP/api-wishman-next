"use client";
import { auth } from "@/app/firebase/config";
import EndpointListItem from "@/components/EndpointListItem";
import PageHeader from "@/components/PageHeader";
import { AppInfo, Endpoint } from "@/types";
import handleRouterPush from "@/util/handleRouterPush";
import { Add, BugReport, Delete, Edit } from "@mui/icons-material";
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
  Menu,
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

        console.log(_appInfo);

        // Add appId to each endpoint object
        const _endpoints = [] as Endpoint[];
        _appInfo.endpoint?.forEach((endpoint, index) => {
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleDeleteMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDeleteClose = () => {
    setAnchorEl(null);
  };

  function deleteApp() {
    fetch("/api/apps/delete/" + params.id, {
      method: "POST",
      headers: {
        "Content-Type": "text/json",
      },
      body: JSON.stringify({ userId: user?.uid }),
    })
      .then((res) => {
        enqueueSnackbar<"error">("Application deleted successfully!");
        router.replace("/dev/apps");
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar<"error">("Failed to delete application!");
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
      <PageHeader
        title={appInfo ? appInfo.name : "Application"}
        backButton={true}
      >
        {canEdit && (
          <>
            <Tooltip title="Edit application">
              <Button
                component="a"
                href={"/apps/" + params.id + "/edit"}
                color="inherit"
                onClick={handleRouterPush(router)}
              >
                <Stack direction="row" gap={1}>
                  <Edit />
                  <Typography>Edit</Typography>
                </Stack>
              </Button>
            </Tooltip>
            <Box>
              <Tooltip title="Delete application">
                <IconButton color="inherit" onClick={handleDeleteMenu}>
                  <Delete />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-delete-popup"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleDeleteClose}
              >
                <Stack
                  sx={{
                    maxWidth: "280px",
                    px: 1.6,
                    py: 0.6,
                    gap: 1,
                  }}
                >
                  <Typography>
                    Are you sure you want to delete this application?
                  </Typography>
                  <Stack direction="row" gap={1}>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        handleDeleteClose();
                        deleteApp();
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => {
                        handleDeleteClose();
                      }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Stack>
              </Menu>
            </Box>
          </>
        )}
      </PageHeader>
      <LinearProgress style={{ visibility: loading ? "visible" : "hidden" }} />
      <Stack gap={1}>
        <Paper>
          <Stack gap={1} sx={{ p: 1.8 }}>
            <Typography>Description: {appInfo?.description}</Typography>
            <Typography>
              Time interval of samples: {appInfo?.hours} hours
            </Typography>
            <Typography sx={{ opacity: 0.6, fontSize: "10pt" }}>
              ID: {params.id}
            </Typography>
          </Stack>

          <Divider />
          <Stack gap={1} sx={{ px: 1.8, py: 0.9 }} direction="row">
            <Typography sx={{ py: 0.7 }}>Any issues?</Typography>
            <Button
              component="a"
              href={"/apps/" + params.id + "/bugs/new"}
              color="info"
              sx={{ gap: 1 }}
              onClick={handleRouterPush(router)}
            >
              <BugReport />
              <Typography>Report a bug</Typography>
            </Button>
          </Stack>
        </Paper>

        <Stack>
          <PageHeader small title="Endpoints">
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
