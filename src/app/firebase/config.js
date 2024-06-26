import { getApp, initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./secret";

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
export { app, auth };
