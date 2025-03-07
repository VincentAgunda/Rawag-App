import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Import autoTable correctly

const PDFGenerator = ({ invoice }) => {
  const generatePDF = () => {
    if (!invoice) {
      console.error("Invoice data is missing!");
      return;
    }

    const doc = new jsPDF();

    // ✅ Header
    doc.setFontSize(16);
    doc.text("Rawag Collection", 14, 20);
    doc.setFontSize(12);
    doc.text("For smart outfits", 14, 26);
    doc.text("Tel: 0727 207 245, 0738 295 663 | Email: rawagcollection@gmail.com", 14, 32);

    // ✅ Invoice Info (Without Status)
    doc.setFontSize(14);
    doc.text("INVOICE", 160, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${invoice.date || ""}`, 160, 30);
    doc.text(`Invoice No: ${invoice.invoiceNumber || ""}`, 160, 36);

    // ✅ Bill To
    doc.text("BILL TO:", 14, 50);
    doc.text(invoice.customerName || "", 14, 56);

    // ✅ Table (Including Size)
    const tableColumn = ["Description", "Size", "Qty", "Unit Price", "Amount"];
    const tableRows =
      invoice.items && invoice.items.length > 0
        ? invoice.items.map((item) => [
            item.description || "",
            item.size || "",
            item.quantity || 0,
            (item.unitPrice || 0).toFixed(2),
            ((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2),
          ])
        : [["No items available", "-", "-", "-", "-"]];

    // ✅ Use autoTable correctly
    autoTable(doc, {
      startY: 70,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
    });

    // ✅ Subtotals
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`SUB-TOTAL: ${invoice.subtotal?.toFixed(2) || "0.00"}`, 150, finalY);
    doc.text(`VAT (16%): ${invoice.tax?.toFixed(2) || "0.00"}`, 150, finalY + 6);
    doc.text(`TOTAL: ${invoice.totalAmount?.toFixed(2) || "0.00"}`, 150, finalY + 12);

    // ✅ Save PDF
    doc.save(`Invoice_${invoice.invoiceNumber || ""}.pdf`);
  };

  return (
    <button onClick={generatePDF} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg">
      Download PDF
    </button>
  );
};

export default PDFGenerator;
