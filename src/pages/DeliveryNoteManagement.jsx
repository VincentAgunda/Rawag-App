import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import DeliveryNoteCard from "./DeliveryNoteCard";
import DeliveryNoteForm from "./DeliveryNoteForm";
import DeliveryNoteDetails from "./DeliveryNoteDetails";

const DeliveryNoteManagement = () => {
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [selectedDeliveryNote, setSelectedDeliveryNote] = useState(null);
  const [viewDeliveryNote, setViewDeliveryNote] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchDeliveryNotes = async () => {
      const snapshot = await getDocs(collection(db, "deliveryNotes"));
      setDeliveryNotes(snapshot.docs.map((doc, index) => ({
        id: doc.id,
        deliveryNoteNumber: index + 1,
        ...doc.data(),
      })));
    };
    fetchDeliveryNotes();
  }, []);

  const deleteDeliveryNote = async (id) => {
    await deleteDoc(doc(db, "deliveryNotes", id));
    setDeliveryNotes(deliveryNotes.filter((note) => note.id !== id));
  };

  const handleEdit = (deliveryNote) => {
    setSelectedDeliveryNote(deliveryNote);
  };

  const handleView = (deliveryNote) => {
    setViewDeliveryNote(deliveryNote);
  };

  const handleUpdate = async (updatedDeliveryNote) => {
    await updateDoc(doc(db, "deliveryNotes", updatedDeliveryNote.id), updatedDeliveryNote);
    setDeliveryNotes(deliveryNotes.map((note) => (note.id === updatedDeliveryNote.id ? updatedDeliveryNote : note)));
    setSelectedDeliveryNote(null);
  };

  const handleDeliveryNoteAdded = (newDeliveryNote) => {
    setDeliveryNotes((prevNotes) => [...prevNotes, newDeliveryNote]);
  };

  return (
    <motion.div
      className="p-4 flex flex-col min-h-screen"
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-950">Delivery Notes</h2>

      {/* Add Delivery Note Button */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-rose-900 text-white px-4 py-2 mb-4 rounded-lg"
      >
        + Add Delivery Note
      </button>

      {/* Delivery Notes Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
        {deliveryNotes.map((deliveryNote) => (
          <DeliveryNoteCard
            key={deliveryNote.id}
            deliveryNote={deliveryNote}
            onEdit={handleEdit}
            onDelete={deleteDeliveryNote}
            onView={handleView}
          />
        ))}
      </div>

      {/* Animated Delivery Note Form */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <DeliveryNoteForm onClose={() => setShowForm(false)} onDeliveryNoteAdded={handleDeliveryNoteAdded} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Animated Delivery Note Details (Edit) */}
      <AnimatePresence>
        {selectedDeliveryNote && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <DeliveryNoteDetails deliveryNote={selectedDeliveryNote} onUpdate={handleUpdate} onClose={() => setSelectedDeliveryNote(null)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Animated Delivery Note Details (View Only) */}
      <AnimatePresence>
        {viewDeliveryNote && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <DeliveryNoteDetails deliveryNote={viewDeliveryNote} onClose={() => setViewDeliveryNote(null)} isViewOnly />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DeliveryNoteManagement;