import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex gap-2">
      <Link href={"/dashboard"}>Home</Link>
      <Link href={"/dashboard/lists"}>Tasks</Link>
      <Link href={"/dashboard/symptoms"}>Symptoms</Link>
      <Link href={"/dashboard/graphs"}>Graphs</Link>
      <Link href={"/dashboard/profile"}>Profile</Link>
    </div>
  );
}
