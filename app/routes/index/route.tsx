import type { UserType } from "@kinde-oss/kinde-typescript-sdk";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { getSessionManager, kindeClient } from "~/utils/kinde.server.ts";
import { useLiveLoader } from "~/components/hooks/use-live-loader.ts";
import Landing from "~/components/landing/index.tsx";

export type LoaderData = {
  isAuthenticated: boolean
  profile?: UserType
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionManager } = await getSessionManager(request)
  const isAuthenticated = await kindeClient.isAuthenticated(sessionManager);
  if (!isAuthenticated) return { isAuthenticated }

  const profile = await kindeClient.getUserProfile(sessionManager);
  return {
    isAuthenticated,
    profile
  }
}

export default function Index() {
  const { isAuthenticated, profile } = useLiveLoader<LoaderData>();

  if (!isAuthenticated) return <Landing />
  return (
    <div className="bg-green-100">
      <h1>You are log in with this email: {profile?.email}</h1>
      <Link to="/logout">Logout</Link>
    </div>
  );
}
