import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "./ProductCard";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  // Handle product updates
  const handleUpdate = (updatedProduct) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  // Handle product deletion
  const handleDelete = (productId) => {
    setProducts(prevProducts =>
      prevProducts.filter(product => product.id !== productId)
    );
  };

  // Categorize products into sections
  const categorizedProducts = {
    Sweaters: products.filter(p => p.category === "Sweaters"),
    Yarn: products.filter(p => p.category === "Yarn"),
    Others: products.filter(p => !["Sweaters", "Yarn"].includes(p.category))
  };

  // Define background colors for each category
  const categoryColors = {
    Sweaters: "bg-blue-100", // Light blue background
    Yarn: "bg-green-100",   // Light green background
    Others: "bg-purple-100" // Light purple background
  };

  // Render a category box
  const renderCategoryBox = (category, products) => (
    <div className={`p-6 rounded-lg shadow-lg ${categoryColors[category]}`}>
      <h3 className="text-xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">
        {category}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Product Inventory</h2>
      
      {/* Yarn Box */}
      {categorizedProducts.Yarn.length > 0 && (
        <div className="mb-8">
          {renderCategoryBox("Yarn", categorizedProducts.Yarn)}
        </div>
      )}

      {/* Sweaters Box */}
      {categorizedProducts.Sweaters.length > 0 && (
        <div className="mb-8">
          {renderCategoryBox("Sweaters", categorizedProducts.Sweaters)}
        </div>
      )}

      {/* Others Box */}
      {categorizedProducts.Others.length > 0 && (
        <div className="mb-8">
          {renderCategoryBox("Others", categorizedProducts.Others)}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;