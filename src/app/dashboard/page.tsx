import { auth } from "@/auth";

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    console.error("no user");
    return null;
  }
  const user = session.user;
  console.log(user);
  return (
    <div>
      <div></div>
    </div>
  );
}
