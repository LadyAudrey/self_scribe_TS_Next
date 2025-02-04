import { auth } from "@/auth";

import Navbar from "../../components/UI/Navbar";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  const user = session.user;
  return (
    <>
      <main className="h-screen w-screen text-white">
        <header className="flex flex-col-reverse lg:flex-row justify-between mb-4 p-4">
          <Navbar />
          <div>{user.email}</div>
        </header>
        <div>{children}</div>
      </main>
    </>
  );
}
