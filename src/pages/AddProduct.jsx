import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker CSS

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    color: "",
    quantityBags: "",
    quantityIndividual: "",
    sizes: "", // New field for sizes
    status: "In Stock",
  });

  const [selectedDate, setSelectedDate] = useState(null); // State for calendar date

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new product object with default values for empty fields
    const newProduct = {
      name: product.name || "Unnamed Product", // Default name if not provided
      color: product.color || "N/A", // Default color if not provided
      quantityBags: product.quantityBags ? parseInt(product.quantityBags, 10) : 0, // Default to 0 if not provided
      quantityIndividual: product.quantityIndividual ? parseInt(product.quantityIndividual, 10) : 0, // Default to 0 if not provided
      sizes: product.sizes, // Include sizes
      date: selectedDate ? selectedDate.toISOString() : null, // Include selected date
      status: product.status || "In Stock", // Default status if not provided
    };

    try {
      // Save the product to Firestore
      const docRef = await addDoc(collection(db, "products"), newProduct);
      console.log("Product added with ID: ", docRef.id);

      // Reset the form
      setProduct({
        name: "",
        color: "",
        quantityBags: "",
        quantityIndividual: "",
        sizes: "", // Reset sizes
        status: "In Stock",
      });
      setSelectedDate(null); // Reset calendar date

      // Redirect to the home page
      navigate("/");
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div>
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <input
              type="text"
              value={product.color}
              onChange={(e) => setProduct({ ...product, color: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity (Bags)</label>
            <input
              type="number"
              value={product.quantityBags}
              onChange={(e) => setProduct({ ...product, quantityBags: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity (Pieces)</label>
            <input
              type="number"
              value={product.quantityIndividual}
              onChange={(e) => setProduct({ ...product, quantityIndividual: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sizes (e.g., 22/5, 26/10)</label>
            <input
              type="text"
              value={product.sizes}
              onChange={(e) => setProduct({ ...product, sizes: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter sizes in the format 22/5, 26/10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select a date"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={product.status}
              onChange={(e) => setProduct({ ...product, status: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="In Progress">In Progress</option>
              <option value="Shipped">Shipped</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-rose-400 text-white px-4 py-2 rounded-md hover:bg-rose-500 transition-colors duration-200"
          >
            Add Product
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddProduct;