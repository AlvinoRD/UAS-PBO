"use client";

import Link from "next/link";

export default function SearchButton() {
  return (
    <div className="py-2">
      <Link href="/cart/search">
        <button className="btn flex">Search</button>
      </Link>
    </div>
  );
}
