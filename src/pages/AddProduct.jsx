import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    color: "",
    quantityBags: "",
    quantityIndividual: "",
    sizes: "",
    category: "Sweaters",
    status: "In Stock",
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      ...product,
      quantityBags: product.quantityBags ? parseInt(product.quantityBags, 10) : 0,
      quantityIndividual: product.quantityIndividual ? parseInt(product.quantityIndividual, 10) : 0,
      date: selectedDate ? selectedDate.toISOString() : null,
    };

    try {
      await addDoc(collection(db, "products"), newProduct);
      setProduct({
        name: "",
        color: "",
        quantityBags: "",
        quantityIndividual: "",
        sizes: "",
        category: "Sweaters",
        status: "In Stock",
      });
      setSelectedDate(null);
      navigate("/");
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="Sweaters">Sweaters</option>
            <option value="Yarn">Yarn</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <input
            type="text"
            value={product.color}
            onChange={(e) => setProduct({ ...product, color: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Bags</label>
            <input
              type="number"
              value={product.quantityBags}
              onChange={(e) => setProduct({ ...product, quantityBags: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pieces</label>
            <input
              type="number"
              value={product.quantityIndividual}
              onChange={(e) => setProduct({ ...product, quantityIndividual: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sizes</label>
          <input
            type="text"
            value={product.sizes}
            onChange={(e) => setProduct({ ...product, sizes: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Format: 22/5, 26/10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={product.status}
            onChange={(e) => setProduct({ ...product, status: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="In Progress">In Progress</option>
            <option value="Shipped">Shipped</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;