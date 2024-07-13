"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct({ fetchProducts }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);
    await fetch("http://localhost:5000/Product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        price: price,
        stock: stock,
      }),
    });

    setIsMutating(false);
    setName("");
    setPrice("");
    setStock("");
    fetchProducts();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn float-left flex" onClick={handleChange}>
        Add New
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Name Product</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Product Name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Price"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Stock</label>
              <input
                type="text"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
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
                  Save
                </button>
              ) : (
                <button type="button" className="btn-loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
