import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getIdToken } from "@/utils/sessionTokenAccessor";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    const idToken = await getIdToken();

    //this will logout the user on keycloak side
    const url = `${
      process.env.END_SESSION_URL
    }?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(
      process.env.NEXTAUTH_URL as string
    )}`;

    try {
        const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        console.error("Logout request failed:", response.statusText);
        return new Response(null, { status: 500 });
      }
    } catch (err) {
      console.error(err);
      return new Response(null, { status: 500 });
    }
  }
  return new Response(null, { status: 200 });
};
