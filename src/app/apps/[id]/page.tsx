import PageHeader from "@/components/PageHeader";
import { Box, Paper, Typography } from "@mui/material";

export default function ApplicationPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Box>
      <PageHeader title="Application" backButton={true} />
      <Paper sx={{ p: 1 }}>
        <Typography>ID: {params.id}</Typography>
      </Paper>
    </Box>
  );
}
