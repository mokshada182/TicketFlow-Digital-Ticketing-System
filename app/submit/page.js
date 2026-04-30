"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useSignOut } from "../signOut";
import "../compsub.css";

export default function Submit() {
  const handleSignOut = useSignOut();
  const { user } = useUser();
  const [stdClass, setStdClass] = useState("");
  const [section, setSection] = useState("");
  const [comp, setComp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [admno, setAdmno] = useState("");

  const email = user?.emailAddresses?.[0]?.emailAddress || "";
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";

  useEffect(() => {
    const tname = `${firstName}${lastName}`;
    const formattedName = tname
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
    setName(formattedName);
  }, [firstName, lastName]);

  useEffect(() => {
    const newAdmno = email ? email.match(/\d+/g).join("") : "";
    setAdmno(newAdmno);
  }, [email]);

  const addComplaint = async () => {
    setIsSubmitting(true);

    try {
      const result = await fetch("/api/complaints", {
        method: "POST",
        body: JSON.stringify({ admno, email, name, stdClass, section, comp }),
      });

      if (result.ok) {
        window.location.href = "/log/";
      } else {
        console.error("Error submitting complaint:", result.statusText);
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = !stdClass || !section || !comp || isSubmitting;

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

      <div className="subcont w-full max-w-xs flex flex-col justify-center items-center">
        <div className="admno">
          <input
            type="text"
            placeholder="Admission No."
            value={admno}
            className="input input-bordered w-full max-w-xs"
            disabled
          />
        </div>
        <div className="name">
          <input
            type="text"
            placeholder="Name"
            value={name}
            className="input input-bordered w-full max-w-xs"
            disabled
          />
        </div>

        <select
          value={stdClass}
          onChange={(e) => setStdClass(e.target.value)}
          className="stdclass select select-bordered w-full max-w-xs"
        >
          <option disabled value="">
            Class
          </option>
          <option value="I">I</option>
          <option value="II">II</option>
          <option value="III">III</option>
          <option value="IV">IV</option>
          <option value="V">V</option>
          <option value="VI">VI</option>
          <option value="VII">VII</option>
          <option value="VIII">VIII</option>
          <option value="IX">IX</option>
          <option value="X">X</option>
          <option value="XI">XI</option>
          <option value="XII">XII</option>
        </select>

        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="stdsection select select-bordered w-full max-w-xs"
        >
          <option disabled value="">
            Section
          </option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>

        <div className="stdcomplaint">
          <textarea
            value={comp}
            onChange={(e) => setComp(e.target.value)}
            className="txt textarea textarea-bordered w-full max-w-xs"
            placeholder="Complaint"
          ></textarea>
        </div>
        <div className="compSubmit">
          <button
            onClick={addComplaint}
            className={`btn btn-primary w-full max-w-xs ${
              isDisabled ? "disabled" : ""
            }`}
            disabled={isDisabled}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </main>
  );
}
