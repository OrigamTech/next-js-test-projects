import Cryptr from "cryptr";

export const encrypt = (text:string) => {
    const secretKey = process.env.NEXTAUTH_SECRET || "this-is-a-secret-key-for-our-encryption-and-decruption-inside-our-code";
    // if (!secretKey) {
    //     throw new Error("NEXTAUTH_SECRET is not defined");
    // }
    const cryptr = new Cryptr(secretKey);

    const encryptedString = cryptr.encrypt(text);
    return encryptedString;
}

export const decrypt = (encryptedString:string) => {
const secretKey = process.env.NEXTAUTH_SECRET || "this-is-a-secret-key-for-our-encryption-and-decruption-inside-our-code";
const cryptr = new Cryptr(secretKey);

const text = cryptr.decrypt(encryptedString);
return text;
}