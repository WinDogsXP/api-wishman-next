"use client";
import { BugInfo } from "@/types";
import { BugReport } from "@mui/icons-material";
import { Box, Chip, ListItemButton, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function BugListItem({ bugInfo }: { bugInfo: BugInfo }) {
  const router = useRouter();

  const linkTarget = "/apps/" + bugInfo.appId + "/bugs/" + bugInfo.id;

  return (
    <ListItemButton
      component="a"
      href={linkTarget}
      sx={{ display: "flex", flexDirection: "row", userSelect: "none", p: 0 }}
      onClick={(e) => {
        e.preventDefault();
        router.push(linkTarget);
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
        <BugReport sx={{ m: 1 }} fontSize="large" />
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 1 }}>
        <Typography sx={{ gap: 0.5 }}>{bugInfo.name}</Typography>
        <Stack direction="row" gap={0.6}>
          <Chip
            label={bugInfo.solveDate ? "Solved" : "Unsolved"}
            size="small"
            color={bugInfo.solveDate ? "success" : "error"}
          />
        </Stack>
      </Box>
    </ListItemButton>
  );
}
