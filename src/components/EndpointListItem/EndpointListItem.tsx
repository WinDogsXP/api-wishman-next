"use client";
import { Endpoint } from "@/types";
import { Link } from "@mui/icons-material";
import { Box, Chip, ListItemButton, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function EndpointListItem({
  endpointInfo,
}: {
  endpointInfo: Endpoint;
}) {
  const router = useRouter();

  const hrefTarget = "/endpoints/" + endpointInfo.id;

  return (
    <ListItemButton
      component="a"
      href={hrefTarget}
      sx={{ display: "flex", flexDirection: "row", userSelect: "none", p: 0 }}
      onClick={(e) => {
        e.preventDefault();
        router.push(hrefTarget);
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
        <Link sx={{ m: 1 }} fontSize="large" />
      </Box>
      <Stack sx={{ flexGrow: 1, p: 0.7 }}>
        <Typography>{endpointInfo.name}</Typography>
        <Typography fontSize={12} sx={{ opacity: 0.5 }}>
          {endpointInfo.url}
        </Typography>
      </Stack>
      <Stack sx={{ alignItems: "right", pr: 1, gap: 0.2 }}>
        <Box sx={{ textAlign: "right" }}>
          <Chip label={endpointInfo.method} size="small" color="default" />
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Chip
            label={endpointInfo.status ? endpointInfo.status : "Unknown"}
            size="small"
            color={
              endpointInfo.status === "Stable"
                ? "success"
                : endpointInfo.status === "Unstable" ||
                  endpointInfo.status === undefined
                ? "warning"
                : "error"
            }
          />
        </Box>
      </Stack>
    </ListItemButton>
  );
}
