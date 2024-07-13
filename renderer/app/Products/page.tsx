"use client";

import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";
import { useState, useEffect } from "react";
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

export default function ProductList() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const products = await getProducts();
    setProducts(products);
    setFilteredProducts(products.filter((product) => product.stock > 0));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setFilteredProducts(products.filter((product) => product.stock > 0));
      return;
    }
    setFilteredProducts(
      products
        .filter((product) =>
          product.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        .filter((product) => product.stock > 0)
    );
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="py-5 px-10">
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

      <button onClick={handleBackToHome} className="btn float-left flex">
        Back to Home
      </button>

      <div className="py-20">
        <AddProduct fetchProducts={fetchProducts} />
      </div>
      <table className="table w-full ">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td className="flex">
                <UpdateProduct {...product} fetchProducts={fetchProducts} />
                <DeleteProduct {...product} fetchProducts={fetchProducts} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
