import { Box, Paper, Typography } from "@mui/material";

export default function ApplicationPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1.2 }}>
        Application
      </Typography>
      <Paper>
        <Typography>ID: {params.id}</Typography>
      </Paper>
    </Box>
  );
}
