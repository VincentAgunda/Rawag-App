import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import ProductCard from "../components/ProductCard";
import EditProductModal from "../components/EditProductModal";

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeInOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeInOut" } },
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter out empty products
        const filteredProducts = productsList.filter(
          (product) =>
            product.name?.trim() &&
            product.color?.trim() &&
            (product.quantityBags > 0 || product.quantityIndividual > 0)
        );

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      if (!updatedProduct?.id) throw new Error("Invalid product data: missing ID.");

      const productRef = doc(db, "products", updatedProduct.id);

      // Only update valid fields
      const cleanUpdatedProduct = Object.fromEntries(
        Object.entries(updatedProduct).filter(([_, v]) => v !== undefined && v !== null)
      );

      await updateDoc(productRef, cleanUpdatedProduct);

      // Update state
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
        )
      );      

      setEditingProduct(null); // Close modal
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!productId) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", productId));

      // Remove from state
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));

      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col min-h-screen"
    >
      <main className="container mx-auto p-4 flex-grow">
        <h2 className="text-2xl font-bold mb-4 text-blue-950">Products</h2>

        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-8"
          >
            Loading products...
          </motion.p>
        ) : error ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-8 text-red-500"
          >
            {error}
          </motion.p>
        ) : products.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard
                  product={product}
                  onUpdate={() => setEditingProduct(product)}
                  onDelete={() => handleDeleteProduct(product.id)} // ✅ Pass delete function
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-600"
          >
            No products found.
          </motion.p>
        )}
      </main>

      {/* Animated Edit Modal */}
      <AnimatePresence>
        {editingProduct && (
          <>
            {/* Modal Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              key="editModal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <EditProductModal
                product={editingProduct}
                onClose={() => setEditingProduct(null)}
                onUpdate={handleUpdateProduct}
                onDelete={(productId) => handleDeleteProduct(productId)} // ✅ Ensure it's properly passed
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;
