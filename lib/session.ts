// import "server-only";
'use server'
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET || undefined;
const encodedKey = new TextEncoder().encode(secretKey);

import { JWTPayload } from "jose";
import { cookies } from "next/headers";

//create a session for when the credentials of the user are correct
export const createSession = async (userId: string) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); //7days
  //this is our JWT token
  const session = await encrypt({ userId, expiresAt });

  (await cookies()).set("session", session, {
    expires: expiresAt,
    httpOnly: true,
    secure: true,
  });
};

export const logout = async () => {
  (await cookies()).delete("session");
};

interface SessionPayload extends JWTPayload {
  userId: string;
  expiresAt: Date;
}

export const encrypt = async (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
};

export const decrypt = async (session: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (err) {
    console.log("failed to verify session");
  }
};
