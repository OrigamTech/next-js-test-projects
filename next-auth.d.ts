import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    access_token?: string; // Encrypted access token
    id_token?: string; // Encrypted ID token
    roles?: string[]; // User roles
    error?: string; // Error if token refresh fails
  }
}
