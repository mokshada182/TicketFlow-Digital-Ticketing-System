import Link from "next/link";

async function getComplaints() {
  const res = await fetch("https://dikkat.vercel.app/api/complaints", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

function timestamp(dateString) {
  let date = new Date(dateString);
  date.setHours(date.getHours() + 5);
  date.setMinutes(date.getMinutes() + 30);
  let day = ("0" + date.getDate()).slice(-2);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear().toString().substr(-2);
  let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let ampm = date.getHours() >= 12 ? "PM" : "AM";

  return `${day}/${month}/${year} - ${hours}:${minutes} ${ampm}`;
}

export default async function Log() {
  const complaints = await getComplaints();
  const comp = complaints.reverse();

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
            <li className="btn btn-active btn-primary btn-sm font-semibold" onClick={handleSignOut}>SIGN OUT</li>
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
            {comp.map((item, index) => (
              <tr key={item._id}>
                <th>{complaints.length - index}</th>
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
    </main>
  );
}
