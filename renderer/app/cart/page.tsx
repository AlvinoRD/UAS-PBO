"use client";
import { useEffect, useState } from "react";
import AddCart from "./addCart";
import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

async function getProducts() {
  const res = await fetch("http://localhost:5000/Product", {
    cache: "no-store",
  });
  return res.json();
}

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
};

export default function ProductList() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [_, setCartLocalStorage] = useLocalStorage<Cart | null>("cart", null);

  useEffect(() => {
    fetch(`http://localhost:5000/Product`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((products) => {
        setProducts(products);
        setFilteredProducts(products);
      });
  }, []);

  useEffect(() => {
    setCartLocalStorage({ items: cartItems });
  }, [cartItems]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setFilteredProducts(products);
      return;
    }
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  async function handleAddCart(product: Product, quantity: number) {
    if (cartItems.some((item) => item.product.id === product.id)) {
      const newCartItems = cartItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      if (newCartItems.some((item) => item.quantity > item.product.stock)) {
        setAlertMessage("Stock is not enough");
        setShowAlert(true);
        return;
      }
      setCartItems(newCartItems.filter((item) => item.quantity > 0));
    } else {
      setCartItems([...cartItems, { product, quantity }]);
    }
  }

  function handleIncreaseQuantity(product: Product) {
    handleAddCart(product, 1);
  }

  function handleDecreaseQuantity(product: Product) {
    handleAddCart(product, -1);
  }

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="py-5 px-10">
      {showAlert && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-slate-800 modal-box rounded-lg shadow-md">
            <h1 className="text-lg font-bold mb-2 text-center">Alert</h1>
            <p className="text-center">{alertMessage}</p>
            <button
              className="mt-4 btn btn-primary w-full"
              onClick={() => setShowAlert(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <button onClick={handleBackToHome} className="btn float-left flex">
        Back to Home
      </button>

      <div className="w-[500px] relative top-1 float-right">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search Product"
          className="input rounded-full p-4 w-full bg-slate-800"
        />
        <button
          type="submit"
          className="btn absolute right-1 top-0.9 p-4 bg-slate-900 rounded-full"
        >
          Search
        </button>
      </div>
      <h1 className="py-20 text-2xl font-bold">Product List</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>{product.price}</td>
              <td className="flex">
                <AddCart {...product} onAddCart={handleAddCart} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className="text-2xl font-bold">Cart</h1>
      {cartItems.length === 0 ? (
        <h1>Your cart is empty.</h1>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Stock</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.product.id}>
                <td>{index + 1}</td>
                <td>{item.product.name}</td>
                <td>{item.product.stock}</td>
                <td className="flex items-center">
                  <button
                    onClick={() => handleDecreaseQuantity(item.product)}
                    className="px-2"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.product)}
                    className="px-2"
                  >
                    +
                  </button>
                </td>
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
      )}
      {cartItems.length > 0 && (
        <button
          className="w-full bg-green-900 h-10 rounded-full"
          onClick={() => {
            fetch("http://localhost:5000/Invoice", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                datetime: new Date().toISOString(),
                items: cartItems,
                total: total,
              }),
            })
              .then(() => {
                // Decrement product stocks
                Promise.all(
                  cartItems.map((item) => {
                    if (item.product.stock == item.quantity) {
                      return fetch(
                        `http://localhost:5000/Product/${item.product.id}`,
                        {
                          method: "DELETE",
                        }
                      );
                    } else {
                      return fetch(
                        `http://localhost:5000/Product/${item.product.id}`,
                        {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            stock: item.product.stock - item.quantity,
                          }),
                        }
                      );
                    }
                  })
                );
              })
              .then(() => router.push("/cart/invoice"));
          }}
        >
          Checkout
        </button>
      )}
    </div>
  );
}
