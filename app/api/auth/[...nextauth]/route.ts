// description of code: This code sets up authentication for a Next.js application using NextAuth.js with Keycloak as the authentication provider. The main goal is to authenticate users, manage their sessions, and handle token lifeCycles, including refreshing expired tokens.

import NextAuth, { NextAuthOptions, Session } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { jwtDecode } from "jwt-decode";
import { encrypt } from "@/utils/encryption";

// Define a type for the token object
type CustomToken = {
  access_token: string; // The main token for accessing resources.
  refresh_token: string; // Used to request a new access token when expired.
  decoded: any; // Decoded JWT payload containing user info and roles.
  token_id: string; // Unique ID for the token (from Keycloak).
  expires_at: number; // UNIX timestamp when the token expires.
  roles?: string[]; // Array of roles assigned to the user.
  error: string; // Describes errors during token operations (if any).
  grant_type?: string; //
};

declare module "next-auth" {
  interface Session {
    access_token: string; // Encrypted access token.
    token_id: string; // Encrypted token ID.
    roles?: string[]; // User roles.
    error: string; // Error if token refresh fails.
  }
}

// console.log("Client ID:", process.env.TEST_KEYCLOAK_CLIENT_ID);
// console.log("Client Secret:", process.env.TEST_KEYCLOAK_CLIENT_SECRET);
// console.log("Keycloak URL:", process.env.KEYCLOAK_URL);
// console.log("Keycloak Realm:", process.env.KEYCLOAK_REALM);
// console.log("Refresh Token URL:", process.env.REFRESH_TOKEN_URL);

// This will refresh an expired access token when needed
export const refreshAccessToken = async (token: CustomToken) => {
  const response = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      clientId: `${process.env.TEST_KEYCLOAK_CLIENT_ID}`,
      clientSecret: `${process.env.TEST_KEYCLOAK_CLIENT_SECRET}`,
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
    }),
    method: "POST",
    cache: "no-store",
  });

  const refreshToken = await response.json();
  console.log('Token successfully refreshed:', refreshToken);

  if (!response.ok) throw refreshToken;


  return {
    ...token,
    access_token: refreshToken.access_token,
    decoded: jwtDecode(refreshToken.access_token),
    token_id: refreshToken.token_id,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  };
};

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: `${process.env.TEST_KEYCLOAK_CLIENT_ID}`,
      clientSecret: `${process.env.TEST_KEYCLOAK_CLIENT_SECRET}`,
      issuer: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`,
      authorization: {
        params: {
          grant_type: "authorization_code",
          scope: "openid profile email", //scope: Specifies the data requested during login.
          response_type: "code",
        },
      },
      httpOptions: {
        timeout: 5000, // Request timeout in milliseconds
      },
    }),
  ],

  //Functions to control token and session behavior.
  callbacks: {
    async jwt({
      token,
      user,
      account,
      profile,
      trigger,
      isNewUser,
      session,
    }: {
      token: any;
      user: any;
      account: any;
      profile?: any;
      trigger?: "signIn" | "signUp" | "update";
      isNewUser?: boolean;
      session?: any;
    }): Promise<any> {
      let roles: string[] | undefined = undefined;
      const nowTimeStamp = Math.floor(Date.now());

      //first time login
      if (account) {
        token.decoded = jwtDecode(account.access_token);
        token.access_token = account.access_token;
        token.token_id = account.token_id;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        token.roles = token.decoded.realm_access?.roles;
        console.log("access_token", token.decoded);

        return token;
      } else if (nowTimeStamp < token.expires_at) {
        return token; // Return token if not expired
      } else {
        //token is expired, try to refresh it
        console.log("token has expired. refreshing token...");

        try {
          const refreshedToken = await refreshAccessToken(token);
          console.log("Token is refreshed");
          return refreshedToken;
        } catch (error) {
          console.error("Error refreshing the access token", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },
    async session({
      session,
      token,
      user,
      newSession,
      trigger,
    }: {
      session: Session;
      token: any;
      user: any;
      newSession: any;
      trigger: "update";
    }): Promise<Session> {
      session.access_token = encrypt(token.access_token);
      session.token_id = encrypt(token.token_id);
      session.roles = token.roles; // Assign roles from token to session
      session.error = token.error;
      console.log("access_token", session.access_token);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
