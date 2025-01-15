// action.ts (server-side)
import { createSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { z } from "zod";

const testUser = {
  id: "1",
  email: "george@gmail.com",
  password: "123456",
};

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .trim(),
});

export const login = async (prevState: any, formData: FormData) => {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { error: result.error?.flatten().fieldErrors };
  }

  const { email, password } = result.data;

  // Simulate a database check
  if (email !== testUser.email || password !== testUser.password) {
    return {
      error: {
        email: ["Invalid email or password"],
      },
    };
  }

  // Create a session for the user
  await createSession(testUser.id);

  // Return success (no need for server-side redirect here, just return a success state)
  return { success: true }; // You can handle success state here
};
