import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { decrypt } from "./encryption";

type session = Session & {
    access_token: string;
    token_id: string;
}

export const  getAccessToken = async () => {
    const session = await getServerSession(authOptions);
    if (session) {
        const accessTokenDecrypted = decrypt((session as session).access_token);
        return accessTokenDecrypted;
    }
    return null;
}

export const getIdToken = async () => {
    const session = await getServerSession(authOptions);
    if (session) {
        const idTokenDecrypted = decrypt((session as session).token_id)
        return idTokenDecrypted;
    }
    return null;
}