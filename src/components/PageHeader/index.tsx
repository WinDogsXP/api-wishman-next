"use client";
import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function PageHeader({
  title,
  backButton,
  small,
  children,
}: {
  title?: string;
  backButton?: boolean;
  small?: boolean;
  children?: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        gap: small ? 0.6 : 1.2,
        mb: small ? 0.6 : 1.2,
        userSelect: "none",
      }}
    >
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
        variant={small ? "h6" : "h5"}
        sx={{ flexGrow: 1, py: 0.5, pl: backButton ? 0 : 1.5 }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}
