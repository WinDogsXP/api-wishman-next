"use client";
import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function PageNavBar({
  title,
  backButton,
  children,
}: {
  title?: string;
  backButton?: boolean;
  children?: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex", gap: 1.2, mb: 1.2 }}>
      {backButton && (
        <IconButton
          onClick={() => {
            router.back();
          }}
        >
          <ArrowBack />
        </IconButton>
      )}
      <Typography
        variant="h5"
        sx={{ flexGrow: 1, py: 0.5, pl: backButton ? 0 : 1.5 }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}
