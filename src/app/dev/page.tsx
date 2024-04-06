"use client";

import { Button, LinearProgress, Paper, Typography } from "@mui/material";
import { auth } from "../firebase/config";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import PageHeader from "@/components/PageHeader";

export default function DashboardPage() {
  const [user, loading] = useAuthState(auth);
  const [signOut, loadingSO, errorSO] = useSignOut(auth);

  return (
    <>
      <PageHeader title="Developer Dashboard" />
      {loading ? (
        <LinearProgress />
      ) : user ? (
        <>
          <Paper sx={{ p: 1 }}>
            <Button
              onClick={async () => {
                const success = await signOut();
                if (success) {
                  alert("You are sign out");
                }
              }}
            >
              Log out
            </Button>
          </Paper>
        </>
      ) : (
        <Paper sx={{ p: 1 }}>
          <Typography>You are not logged in.</Typography>
        </Paper>
      )}
    </>
  );
}
