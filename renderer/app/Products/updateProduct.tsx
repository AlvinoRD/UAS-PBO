"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

export default function UpdateProduct({
  id,
  name,
  price,
  stock,
  fetchProducts,
}: Product & { fetchProducts: () => void }) {
  const [productName, setProductName] = useState(name);
  const [productPrice, setProductPrice] = useState(price);
  const [productStock, setProductStock] = useState(stock);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch(`http://localhost:5000/Product/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: productName,
        price: productPrice,
        stock: productStock,
      }),
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
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Edit
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {name}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Product Name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                value={productPrice}
                onChange={(e) => setProductPrice(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Price"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Stock</label>
              <input
                type="text"
                value={productStock}
                onChange={(e) => setProductStock(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Stock"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
