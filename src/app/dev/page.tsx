"use client";

import { Button, Typography } from "@mui/material";
import { auth } from "../firebase/config";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

export default function DashboardPage() {
  const [user] = useAuthState(auth);
  const [signOut, loadingSO, errorSO] = useSignOut(auth);

  return user ? (
    <>
      <Typography variant="h5">Developer Dashboard</Typography>
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
    </>
  ) : (
    <>
      <Typography>You are not logged in.</Typography>
    </>
  );
}
