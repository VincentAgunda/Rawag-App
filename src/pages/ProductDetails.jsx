import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  // In a real app, you would fetch the product by ID from your state or API
  const product = {
    id,
    name: "Sample Product",
    category: "Sweaters",
    color: "Red",
    quantityBags: 5,
    quantityIndividual: 20,
    sizes: "22/5, 24/8",
    status: "In Stock",
    date: new Date().toISOString()
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600">Category: {product.category}</p>
            <p className="text-gray-600">Color: {product.color}</p>
            <p className="text-gray-600">Sizes: {product.sizes}</p>
          </div>
          <div>
            <p className="text-gray-600">Bags: {product.quantityBags}</p>
            <p className="text-gray-600">Pieces: {product.quantityIndividual}</p>
            <p className="text-gray-600">Date: {new Date(product.date).toLocaleDateString()}</p>
            <span className={`px-2 py-1 rounded-full ${product.status === "In Stock" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {product.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;