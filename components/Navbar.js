"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-800 text-white p-3 flex justify-between items-center max-w-6xl m-auto w-[90%] mt-4 rounded-md">
      <Link href="/" className="text-xl font-bold">
        Mini<span className="text-green-500">URL</span>
      </Link>
      <Link
        href="/"
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Try Now
      </Link>
    </nav>
  );
}
