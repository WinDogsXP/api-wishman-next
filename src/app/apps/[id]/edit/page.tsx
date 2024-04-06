"use client";
import { auth } from "@/app/firebase/config";
import AppEditForm from "@/templates/AppEdit";
import { AppInfo } from "@/types";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AppEditPage({ params }: { params: { id: string } }) {
  const [user] = useAuthState(auth);
  const [appInfo, setAppInfo] = useState<AppInfo>();
  const [loading, setLoading] = useState(true);

  const loadAppInfo = () => {
    fetch("/api/apps/getInfo/" + params.id)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAppInfo(res.app as AppInfo);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (loading) loadAppInfo();
  }, [loading, appInfo]);

  return <AppEditForm appInfo={appInfo} editMode />;
}
