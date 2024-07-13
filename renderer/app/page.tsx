import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="space-y-4 text-center">
        <Link href="/cart">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Cart
          </button>
        </Link>
        <Link href="/Products">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
            Management
          </button>
        </Link>
        <Link href="/Invoices">
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
            Invoice
          </button>
        </Link>
      </div>
    </div>
  );
}
