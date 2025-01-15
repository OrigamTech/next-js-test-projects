//description of code: This code provides a React component for managing authentication status in a Next.js app using NextAuth.js with a Keycloak provider. It displays whether the user is logged in or not, handles logout via Keycloak, and forces a logout if the access token refresh fails.

"use client";

import { Session } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

type session = Session & {
  error:string; // Describes errors, like token refresh failure.
  grant_Type:string; //
}

//Handles Keycloak logout by calling the /api/auth/logout endpoint.
export const keycloakSessionLogout = async () => {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (err) {
    console.error(err);
  }
};

const AuthStatus = () => {
  const { data: session, status } = useSession();

  //Automatically logs the user out if there's a RefreshAccessTokenError
  useEffect(()=>{
    if(status != "loading" && session && (session as session)?.error === "RefreshAccessTokenError") {
      signOut({callbackUrl: "/"});
    }
  },[session, status])

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (session) {
    return (
      <div className="flex flex-col gap-1 ml-2">
        Logged in as:
        <span className="text-yellow-100">Name: {session?.user?.name}</span>
        <span className="text-yellow-100">Email: {session?.user?.email}</span>
        <button
          className="flex justify-center items-center bg-blue-400 font-bold text-white rounded border border-gray-100 w-20"
          onClick={() => {
            keycloakSessionLogout().then(() => signOut({ callbackUrl: "/" }));
          }}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div>
      Not logged in
      <button
        className="bg-blue-400 font-bold text-white py-1 px-2 rounded border border-gray-100"
        onClick={() => {
          signIn("keycloak");
        }}
      >
        Log in
      </button>
    </div>
  );
};
// console.log("session", session);
export default AuthStatus;
