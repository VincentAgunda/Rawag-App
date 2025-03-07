import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import InvoiceCard from "./InvoiceCard";
import InvoiceForm from "./InvoiceForm";
import InvoiceDetails from "./InvoiceDetails";

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [viewInvoice, setViewInvoice] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      const snapshot = await getDocs(collection(db, "invoices"));
      setInvoices(snapshot.docs.map((doc, index) => ({
        id: doc.id,
        invoiceNumber: index + 1, // Assign numerical invoice numbers
        ...doc.data(),
      })));
    };
    fetchInvoices();
  }, []);

  const deleteInvoice = async (id) => {
    await deleteDoc(doc(db, "invoices", id));
    setInvoices(invoices.filter((inv) => inv.id !== id));
  };

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleView = (invoice) => {
    setViewInvoice(invoice);
  };

  const handleUpdate = async (updatedInvoice) => {
    await updateDoc(doc(db, "invoices", updatedInvoice.id), updatedInvoice);
    setInvoices(invoices.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv)));
    setSelectedInvoice(null);
  };

  // ✅ Function to update state when a new invoice is added
  const handleInvoiceAdded = (newInvoice) => {
    setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-4 flex flex-col min-h-screen"
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-950">Invoices</h2>

      {/* ✅ Add Invoice Button */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-rose-900 text-white px-4 py-2 mb-4 rounded-lg"
      >
        + Add Invoice
      </button>

      {/* ✅ Responsive Grid Layout (2 columns on mobile) */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
        {invoices.map((invoice) => (
          <InvoiceCard
            key={invoice.id}
            invoice={invoice}
            onEdit={handleEdit}
            onDelete={deleteInvoice}
            onView={handleView}
          />
        ))}
      </div>

      {/* ✅ Animated Invoice Form */}
      <AnimatePresence>
        {showForm && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <InvoiceForm onClose={() => setShowForm(false)} onInvoiceAdded={handleInvoiceAdded} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ✅ Animated Invoice Details (Edit) */}
      <AnimatePresence>
        {selectedInvoice && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <InvoiceDetails invoice={selectedInvoice} onUpdate={handleUpdate} onClose={() => setSelectedInvoice(null)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ✅ Animated Invoice Details (View Only) */}
      <AnimatePresence>
        {viewInvoice && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <InvoiceDetails invoice={viewInvoice} onClose={() => setViewInvoice(null)} isViewOnly />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InvoiceManagement;
