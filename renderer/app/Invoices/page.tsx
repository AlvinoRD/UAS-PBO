"use client";
import { useEffect, useState } from "react";
import { Invoice } from "../types";
import { useRouter } from "next/navigation";

export default function InvoicesPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/Invoice", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((invoices) => {
        setInvoices(invoices);
      });
  }, []);

  const handleBackToHome = () => {
    router.push("/");
  };

  console.log(invoices);

  return (
    <div className="py-5 px-10">
      <button onClick={handleBackToHome} className="btn float-left flex">
        Back to Home
      </button>
      <h1 className="text-2xl font-bold mb-5 py-20">Invoices</h1>
      {invoices.length === 0 ? (
        <p>No invoices found.</p>
      ) : (
        invoices.map((invoice) => (
          <div key={invoice.id} className="mb-10">
            <h2 className="text-xl font-bold mb-3">Invoice #{invoice.id}</h2>
            <div className="mb-3">
              <p>
                <strong>Date and Time:</strong> {invoice.datetime}
              </p>
            </div>
            <table className="table w-full mb-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={item.product.id}>
                    <td>{index + 1}</td>

                    <td>{item.product.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.product.price * item.quantity}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className="text-2xl font-bold text-right">
                    Total
                  </td>
                  <td className="text-2xl font-bold">
                    {invoice.items.reduce(
                      (acc, item) => acc + item.product.price * item.quantity,
                      0
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}
