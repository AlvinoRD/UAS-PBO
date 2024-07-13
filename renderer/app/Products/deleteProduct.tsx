"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

export default function DeleteProduct({
  id,
  name,
  fetchProducts,
}: Product & { fetchProducts: () => void }) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(productId: number) {
    setIsMutating(true);
    await fetch(`http://localhost:5000/Product/${productId}`, {
      method: "DELETE",
    });

    setIsMutating(false);
    fetchProducts();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={handleChange}>
        Delete
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are You Sure To Delete "{name}"?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(id)}
                className="btn btn-primary"
              >
                Delete
              </button>
            ) : (
              <button type="button" className="btn-loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
