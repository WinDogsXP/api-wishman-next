import AppListItem from "@/components/AppListItem";
import { Box, List, Paper, Typography } from "@mui/material";

export default function ApplicationsPage() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1.2 }}>
        Applications
      </Typography>
      <Paper>
        <List sx={{ p: 0 }}>
          <AppListItem
            appInfo={{ id: "abc", name: "Application Name", status: "stable" }}
          />
          <AppListItem
            appInfo={{
              id: "def",
              name: "Application Name",
              status: "unstable",
            }}
          />
          <AppListItem
            appInfo={{ id: "ghi", name: "Application Name", status: "down" }}
          />
        </List>
      </Paper>
    </Box>
  );
}
