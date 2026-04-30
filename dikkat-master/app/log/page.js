"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useSignOut } from "../signOut";
import "../main.css";

function getComplaints() {
  return fetch("/api/complaints", {
    cache: "no-store",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  });
}

function timestamp(dateString) {
  let date = new Date(dateString);
  let day = ("0" + date.getDate()).slice(-2);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear().toString().substr(-2);
  let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let ampm = date.getHours() >= 12 ? "PM" : "AM";

  return `${day}/${month}/${year} - ${hours}:${minutes} ${ampm}`;
}

export default function Log() {
  const handleSignOut = useSignOut();
  const { user } = useUser();
  const [admno, setAdmno] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const email = user?.emailAddresses?.[0]?.emailAddress || "";

  useEffect(() => {
    const newAdmno = email ? email.match(/\d+/g).join("") : "";
    setAdmno(newAdmno);
  }, [email]);

  useEffect(() => {
    getComplaints().then((data) => {
      setComplaints(data);
      setLoading(false); // Set loading to false after data is fetched
    });
  }, []);

  let m = admno;
  const admnoComp = complaints
    .filter((complaint) => complaint.admno === m)
    .reverse();

  return (
    <main
      data-theme="forest"
      className="flex min-h-screen flex-col items-center"
    >
      {loading ? (
        <div role="alert" className="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Loading your complaints!</span>
        </div>
      ) : (
        <>
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

          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Admission No.</th>
                  <th>Full Name</th>
                  <th>Class & Section</th>
                  <th>Date & Time</th>
                  <th>Complaint</th>
                </tr>
              </thead>
              <tbody>
                {admnoComp.map((item, index) => (
                  <tr key={item._id}>
                    <th>{admnoComp.length - index}</th>
                    <td>{item.admno}</td>
                    <td>{item.name}</td>
                    <td>{item.stdClass + " - " + item.section}</td>
                    <td>{timestamp(item.date)}</td>
                    <td>{item.comp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
