import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export const encrypt = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
};

export const decrypt = async (input: string): Promise<any> => {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
};

export const login = async (formData: FormData) => {
  //verify credentials and get the user
  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
  };

  //create session
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });

  //save the session in a cookie
  (await cookies()).set("session", session, { expires, httpOnly: true });
};

export const logout = async () => {
  (await cookies()).set("session", "", { expires: new Date(0) });
};

export const getSession = async () => {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
};

export const updateSession = async (request: NextRequest) => {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  //refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const response = NextResponse.next();
  response.cookies.set({
    name:'session',
    value: await encrypt(parsed),
    expires: parsed.expires,
    httpOnly: true,
  });
  return response;
};