"use client";
import Link from "next/link";
import "./main.css";
import { useSignOut } from "./signOut";

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

      <div className="mcont">
        <div className="flex w-full">
          <div className="sbox artboard artboard-horizontal phone-2 cont">
            <div className="scont">
              <Link href="/submit">
                <button className="btn btn-neutral btn-wide">Submit</button>
              </Link>

              <div className="divider"></div>
              <Link href="/log">
                <button className="btn btn-neutral btn-wide">Logs</button>
              </Link>
            </div>
          </div>

          <div className="divider lg:divider-horizontal"></div>

          <div className="sbox sboxr artboard artboard-horizontal phone-2">
            <div className="scont scontr">
              <div className="cont siteTitle">
                <div className="tit">D I K K A T</div>
              </div>

              <div className="cont sbody">
                <div className="cont">
                  <Link href="/sign-up">
                    <button className="btn btn-neutral btn-wide">
                      Sign Up if its your first time
                    </button>
                  </Link>

                  <div className="divider"></div>
                  <Link href="/sign-in">
                    <button className="btn btn-primary btn-wide">
                      Sign in Otherwise
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
