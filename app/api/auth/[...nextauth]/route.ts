import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { jwtDecode } from "jwt-decode";
import { encrypt } from "@/utils/encryption";

// console.log("Client ID:", process.env.TEST_KEYCLOAK_CLIENT_ID);
// console.log("Client Secret:", process.env.TEST_KEYCLOAK_CLIENT_SECRET);
// console.log("Keycloak URL:", process.env.KEYCLOAK_URL);
// console.log("Keycloak Realm:", process.env.KEYCLOAK_REALM);
// console.log("Refresh Token URL:", process.env.REFRESH_TOKEN_URL);
// console.log("next auth secret:", process.env.NEXTAUTH_SECRET);

// // This will refresh an expired access token when needed
export const refreshAccessToken = async (token: any) => {
  const response = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: `${process.env.TEST_KEYCLOAK_CLIENT_ID}`,
      client_secret: `${process.env.TEST_KEYCLOAK_CLIENT_SECRET}`,
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
    }),
    method: "POST",
    cache: "no-store",
  });

  const refreshToken = await response.json();
  // console.log('Token successfully refreshed:', refreshToken);

  // Log client ID when refreshing token
  // console.log("Refreshing token. Client ID:", process.env.TEST_KEYCLOAK_CLIENT_ID);

  if (!response.ok) throw refreshToken;

  return {
    ...token,
    access_token: refreshToken.access_token,
    decoded: jwtDecode(refreshToken.access_token),
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  };
};

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: `${process.env.TEST_KEYCLOAK_CLIENT_ID}`,
      clientSecret: `${process.env.TEST_KEYCLOAK_CLIENT_SECRET}`,
      issuer: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`,
    }),
  ],

  //Functions to control token and session behavior.
  callbacks: {
    async jwt({ token, account }: { token: any; account: any }) {
      const nowTimeStamp = Math.floor(Date.now());

      // Log the account object to inspect its contents
      // console.log("Account object during login:", account);

      //first time login
      if (account) {
        // console.log("Sign-In Client ID:", process.env.TEST_KEYCLOAK_CLIENT_ID);
        token.decoded = jwtDecode(account.access_token);
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        // console.log("access_token", token.decoded);

        return token;
      } else if (nowTimeStamp < token.expires_at) {
        return token;
      } else {
        //token is expired, try to refresh it
        console.log("token has expired. refreshing token...");

        try {
          const refreshedToken = await refreshAccessToken(token);
          console.log("token is refreshed");
          return refreshedToken;
        } catch (error) {
          console.error("Error refreshing access token", error); //**the error message that says --"invalid_client"-- is here**
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },

    async session({ session, token }: { session: any; token: any }) {
      // console.log("token.access_token",token.access_token)
      // console.log("Token in session callback:", token);
      // console.log("token : ",token);

      session.access_token = encrypt(token.access_token);
      session.id_token = encrypt(token.id_token);
      session.roles = token.roles; // Assign roles from token to session
      session.error = token.error;
      // console.log("session: ", session.access_token);

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
