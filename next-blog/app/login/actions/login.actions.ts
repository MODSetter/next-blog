"use server";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/db/auth";
import { redirect } from "next/navigation";
import prisma from "@/db/prismaclient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export const onLogin = async (values: z.infer<typeof formSchema>) => {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  const existingUser = await prisma.user.findUnique({
    where: {
      username: values.username,
    },
  });

  if (!existingUser) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid usernames from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid usernames.
    // However, valid usernames can be already be revealed with the signup page among other methods.
    // It will also be much more resource intensive.
    // Since protecting against this is non-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
    // If usernames are public, you may outright tell the user that the username is invalid.
    return {
      error: "Incorrect username or password",
    };
  }

  const validPassword = await verify(
    existingUser.password_hash,
    values.password,
    {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    }
  );
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/dashboard");
}