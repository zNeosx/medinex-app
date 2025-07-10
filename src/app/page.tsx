// import { auth } from "@/server/auth";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("session", session);
  if (!session?.user) {
    redirect("/auth/connexion");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white"></main>
  );
}
