import React from "react";

const InvoiceTable = ({ invoices, onViewDetails, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Invoice #</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="text-center">
              <td className="border p-2">{invoice.id}</td>
              <td className="border p-2">{invoice.customer}</td>
              <td className="border p-2">${invoice.total.toFixed(2)}</td>
              <td className="border p-2">
                {invoice.paid ? (
                  <span className="text-green-600 font-bold">Paid</span>
                ) : (
                  <span className="text-red-600 font-bold">pending</span>
                )}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => onViewDetails(invoice)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  View Details
                </button>
                <button
                  onClick={() => onDelete(invoice.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
