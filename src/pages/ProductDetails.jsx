import React from "react";


const ProductDetails = ({ match }) => {
  const productId = match.params.id;
  const product = {
    id: productId,
    name: "Product A",
    quantity: 10,
    status: "In Stock",
  };

  return (
    <div>
     
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p className="text-gray-600">Quantity: {product.quantity}</p>
          <div className={`mt-2 px-2 py-1 rounded-full text-sm ${product.status === "In Stock" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {product.status}
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default ProductDetails;