"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  onAddCart: (product: Props, quantity: number) => void;
};

export default function AddCart(props: Props) {
  const [quantity, setQuantity] = useState(1);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleAddCart(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);
    await fetch("http://localhost:5000/Cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: props.id,
        quantity: quantity,
      }),
    });

    setIsMutating(false);
    setQuantity(1);
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-primary btn-sm" onClick={handleChange}>
        Add to Cart
      </button>

      <input
        onClick={handleChange}
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add to Cart</h3>
          <form onSubmit={handleAddCart}>
            <div className="form-control">
              <label className="label font-bold">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="input input-bordered"
                min={1}
              />
            </div>
            <div className="modal-action"></div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => props.onAddCart(props, quantity)}
            >
              Add to Cart
            </button>
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
