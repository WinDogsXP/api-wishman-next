import { WebAsset } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";

export default function AppListItem({
  appInfo,
}: {
  appInfo: { name: string; status: number };
}) {
  return (
    <Paper sx={{ display: "flex", flexDirection: "row", userSelect: "none" }}>
      <Box
        sx={{
          display: "flex",
          background: "#0001",
          borderRadius: 1,
          aspectRatio: "1 / 1",
          m: 1,
        }}
      >
        <WebAsset sx={{ m: 1 }} fontSize="large" />
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 1 }}>
        <Typography sx={{ gap: 0.5 }}>{appInfo.name}</Typography>
        <Typography sx={{ gap: 0.5 }}>{appInfo.status}</Typography>
      </Box>
    </Paper>
  );
}
