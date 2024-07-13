"use client";

import { useRouter } from "next/navigation";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Cart } from "../page";

export default function Invoice() {
  const dateTime = new Date().toLocaleString();
  const router = useRouter();
  const [cart, setCart] = useLocalStorage<Cart | null>("cart", null);
  const cartItems = cart?.items ?? [];

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="py-5 px-10">
      <h1 className="text-2xl font-bold mb-5">Invoice</h1>
      <div className="mb-5">
        <p>
          <strong>Date and Time:</strong> {dateTime}
        </p>
      </div>
      <table className="table w-full mb-5">
        <thead>
          <tr>
            <th>#</th>
            <th className="max-w-xs">Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.product.id}>
              <td>{index + 1}</td>
              <td className="max-w-xs truncate">{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>{item.product.price * item.quantity}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} className="text-2xl font-bold text-right">
              Total
            </td>
            <td className="text-2xl font-bold">{total}</td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={handleBackToHome}
        className="w-full bg-blue-500 h-10 rounded-full text-white"
      >
        Back to Home
      </button>
    </div>
  );
}
