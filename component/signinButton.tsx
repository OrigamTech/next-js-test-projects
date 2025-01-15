"use client";
import { signIn } from "next-auth/react";

const SigninButton = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <p className="text-red-500">
        These contents are restricted. Please{" "}
        <button
          className="text-blue-500 underline"
          onClick={() => signIn("keycloak")}
        >
          sign up or log in
        </button>{" "}
        to view them.
      </p>
    </div>
  );
};

export default SigninButton;
