"use client";
import { AppInfo } from "@/types";
import { WebAsset } from "@mui/icons-material";
import { Box, Chip, ListItemButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function AppListItem({ appInfo }: { appInfo: AppInfo }) {
  const router = useRouter();

  const appRouteTarget = "/apps/" + appInfo.id;

  return (
    <ListItemButton
      component="a"
      href={appRouteTarget}
      sx={{ display: "flex", flexDirection: "row", userSelect: "none", p: 0 }}
      onClick={(e) => {
        e.preventDefault();
        router.push(appRouteTarget);
      }}
    >
      <Box
        sx={{
          display: "flex",
          background: "#8885",
          borderRadius: 1,
          aspectRatio: "1 / 1",
          m: 1,
        }}
      >
        <WebAsset sx={{ m: 1 }} fontSize="large" />
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 1 }}>
        <Typography sx={{ gap: 0.5 }}>{appInfo.name}</Typography>
        <Box>
          <Chip
            label={appInfo.status ? appInfo.status : "Unknown"}
            size="small"
            color={
              appInfo.status === "Stable"
                ? "success"
                : appInfo.status === "Unstable" || appInfo.status === undefined
                ? "warning"
                : "error"
            }
          />
        </Box>
      </Box>
    </ListItemButton>
  );
}
