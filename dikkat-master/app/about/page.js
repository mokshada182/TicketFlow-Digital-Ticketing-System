'use client'
import Link from "next/link";
import { useSignOut } from "../signOut";
import "../main.css";

export default function About() {
  const handleSignOut = useSignOut();
  return (
    <main
      data-theme="forest"
      className="flex min-h-screen flex-col items-center"
    >
      <div className="navbar bg-base-100 justify">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            Dikkat
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li
              className="btn btn-active btn-primary btn-sm font-semibold"
              onClick={handleSignOut}
            >
              SIGN OUT
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
