"use client";

import { auth } from "@/app/firebase/config";
import EndpointListItem from "@/components/EndpointListItem";
import PageHeader from "@/components/PageHeader";
import ProgressBarElement from "@/components/ProgressBarElement";
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
import { Gauge, gaugeClasses, ScatterChart } from "@mui/x-charts";
import { info } from "console";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface EndpointEx extends Endpoint {
  endpointCalls: any[];
}

export default function EndpointPage({
  params,
}: {
  params: { id: string; endId: string };
}) {
  const [user] = useAuthState(auth);
  const [info, setInfo] = useState<EndpointEx>();
  const router = useRouter();
  const [canEdit, setCanEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState(1 * 60 * 60);

  const statuses = { Stable: 2, Unstable: 1, Down: 0 };
  const statusesr = ["Down", "Unstable", "Stable"];

  function sum(arr) {
    let s = 0;
    for (let i = 0; i < 10; i++) {
      if (arr[i] == 2) {
        s++;
      }
    }
    return s;
  }

  useEffect(() => {
    fetch("/api/endpoints/get/" + params.endId).then((res) => {
      res.json().then((json) => {
        console.log(json);
        json.endpointCalls = json.endpointCalls.map(
          (el: { date: string; status: any; id: any }) => {
            const mod_el = {
              date: Math.floor(
                (Date.parse(el.date) - Date.now() + 1000 * period) / 1000
              ),
              status: el.status,
              id: el.id,
              statusNum: statuses[el.status as "Stable" | "Unstable" | "Down"],
            };
            return mod_el;
          }
        );
        setInfo(json);
        setLoading(false);
        // setTimeout(() => {
        //   console.log(info?.endpointCalls);
        // }, 10000);
      });
    });
    setInfo({ name: "/" } as EndpointEx);
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
            <ListItem>
              <Typography>URL: {info?.url}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Method: {info?.method}</Typography>
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
          <Paper style={{ padding: "10px" }}>
            {!loading && (
              <ScatterChart
                width={750}
                height={300}
                series={[
                  {
                    label: "Stable",
                    color: "#59a14f",
                    data: info?.endpointCalls
                      .filter((el) => el.statusNum == 2)
                      .map((v) => ({
                        x: v.date,
                        y: v.statusNum,
                        id: v.id,
                      })),
                  },
                  {
                    label: "Unstable",
                    color: "#edc949",
                    data: info?.endpointCalls
                      .filter((el) => el.statusNum == 1)
                      .map((v) => ({
                        x: v.date,
                        y: v.statusNum,
                        id: v.id,
                      })),
                  },
                  {
                    label: "Down",
                    color: "#e15759",
                    data: info?.endpointCalls
                      .filter((el) => el.statusNum == 0)
                      .map((v) => ({
                        x: v.date,
                        y: v.statusNum,
                        id: v.id,
                      })),
                  },
                ]}
              />
            )}
            <Paper
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Gauge
                width={300}
                height={300}
                value={
                  info?.endpointCalls
                    ? sum(
                        info?.endpointCalls.slice(-10).map((el) => el.statusNum)
                      )
                    : 0
                }
                valueMax={10}
                valueMin={0}
                startAngle={-110}
                endAngle={110}
                sx={(theme) => ({
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 40,
                  },
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill:
                      (info?.endpointCalls
                        ? sum(
                            info?.endpointCalls
                              .slice(-10)
                              .map((el) => el.statusNum)
                          )
                        : 0) == 10
                        ? "#52b202"
                        : (info?.endpointCalls
                            ? sum(
                                info?.endpointCalls
                                  .slice(-10)
                                  .map((el) => el.statusNum)
                              )
                            : 0) == 0
                        ? "red"
                        : "yellow",
                  },
                })}
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
              />
              <Typography style={{ fontSize: "30px" }}>
                Last 10 API calls
              </Typography>
            </Paper>
          </Paper>
        </Stack>
      </Stack>
    </>
  );
}
