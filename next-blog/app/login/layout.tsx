import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { validateRequest } from "@/actions/auth.actions";

export default async function Layout({ children }: { children: ReactNode }) {
    const { user } = await validateRequest();
    if (user) {
        return redirect("/dashboard");
    }
    return (
        <div>
            {children}
        </div>
    );
}
