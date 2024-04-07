import { auth } from "@/app/firebase/config";
import PageHeader from "@/components/PageHeader";
import { Button } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ViewBugPage({
  params,
}: {
  params: { id: string; bugId: string };
}) {
  const [user, loadingAuth] = useAuthState(auth);

  const markBugSolved = () => {
    fetch("/api/bugs/solve/" + params.bugId, {
      method: "POST",
      headers: {
        "Content-Type": "text/json",
      },
      body: JSON.stringify({ userId: user?.uid }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        enqueueSnackbar("Bug marked as solved!");
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar("Failed to mark bug as solved!");
      });
  };

  return (
    <>
      <PageHeader title="Bug report" />
      <span>Bug ID: {params.bugId}</span>
      <Button onClick={markBugSolved}>Mark bug as solved</Button>
    </>
  );
}
