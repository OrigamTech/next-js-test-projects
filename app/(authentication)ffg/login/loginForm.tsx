"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation"; // Import useRouter to handle redirection
import { login } from "./actions";
import { cookies } from "next/headers"; // To get cookies on the client

const LoginForm = () => {
  const [state, loginAction, pending] = useActionState(login, undefined);
  const router = useRouter(); // Initialize the useRouter hook

  // Read the redirectTo cookie when the component loads
  const redirectTo = (await cookies()).get("redirectTo")?.value || "/"; // Default to home if no redirect URL is set

  // Handle success state after login
  if (state?.success) {
    // Redirect to the original protected route or default to homepage
    router.push(redirectTo);
  }

  return (
    <form
      action={loginAction}
      className="flex flex-col h-screen items-center justify-center mx-auto max-w-[600px] gap-2"
    >
      <div className="flex flex-col border border-white rounded-md w-[400px] h-auto space-y-5 p-7">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl">ثبت نام</h1>
        </div>
        <div className="flex flex-col gap-2">
          <input
            id="email"
            name="email"
            placeholder="email..."
            className="px-1 py-2 rounded-md text-black"
          />
        </div>
        {state?.error?.email && (
          <p className="text-red-500">{state.error.email}</p>
        )}
        <div className="flex flex-col gap-2">
          <input
            id="password"
            name="password"
            placeholder="password..."
            className="px-1 py-2 rounded-md text-black"
          />
        </div>
        {state?.error?.password && (
          <p className="text-red-500">{state.error.password}</p>
        )}

        <div className="flex justify-center items-center">
          <button
            disabled={pending}
            type="submit"
            className="bg-white p-3 rounded-lg text-black"
          >
            {pending ? "Submitting..." : "Login"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
