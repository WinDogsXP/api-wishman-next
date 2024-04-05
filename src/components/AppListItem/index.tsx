"use client";
import { WebAsset } from "@mui/icons-material";
import { Box, Chip, ListItemButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function AppListItem({
  appInfo,
}: {
  appInfo: {
    id: string;
    name: string;
    status: "stable" | "unstable" | "down";
  };
}) {
  const router = useRouter();

  return (
    <ListItemButton
      component="a"
      href={"/app/" + appInfo.id}
      sx={{ display: "flex", flexDirection: "row", userSelect: "none", p: 0 }}
      onClick={(e) => {
        e.preventDefault();
        router.push("/app/" + appInfo.id);
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
            label={
              appInfo.status.toString().charAt(0).toUpperCase() +
              appInfo.status.toString().slice(1)
            }
            size="small"
            color={
              appInfo.status == "stable"
                ? "success"
                : appInfo.status == "unstable"
                ? "warning"
                : "error"
            }
          />
        </Box>
      </Box>
    </ListItemButton>
  );
}
