import AppListItem from "@/components/AppListItem";
import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Paper, Typography } from "@mui/material";

export default function ApplicationsPage() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Applications
        <AppListItem appInfo={{ name: "Application Name", status: 200 }} />
      </Typography>
    </Box>
  );
}
