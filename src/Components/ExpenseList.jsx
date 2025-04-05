import React, { useState } from "react";
import { MdEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { FaUtensils, FaPlane, FaFilm } from "react-icons/fa";

const categoryIcons = {
  food: <FaUtensils size={16} color="black" />,
  travel: <FaPlane size={16} color="black" />,
  entertainment: <FaFilm size={16} color="black" />,
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ExpenseList = ({ expenses  = [] }) => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const totalPages = Math.ceil(sortedExpenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentExpenses = sortedExpenses.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      {currentExpenses.map((tx) => (
        <div key={tx.id} style={{ marginBottom: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#d9d9d9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {categoryIcons[tx.category.toLowerCase()]}
              </div>
              <div>
                <div style={{ fontWeight: "bold" }}>{tx.category}</div>
                <div style={{ fontSize: "12px", color: "gray" }}>
                  {formatDate(tx.date)}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontWeight: "bold", color: "#f4bb4a" }}>
                ${tx.amount}
              </span>

              <button
                style={{
                  backgroundColor: "#ff3e3e",
                  border: "none",
                  borderRadius: "4px",
                  padding: "6px",
                  cursor: "pointer",
                }}
                title="Delete"
              >
                <MdOutlineDeleteOutline size={16} color="#fff" />
              </button>

              <button
                style={{
                  backgroundColor: "#f4bb4a",
                  border: "none",
                  borderRadius: "4px",
                  padding: "6px",
                  cursor: "pointer",
                }}
                title="Edit"
              >
                <MdEdit size={16} color="#fff" />
              </button>
            </div>
          </div>
          <hr style={{ marginTop: "10px", borderColor: "#eee" }} />
        </div>
      ))}

      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            style={{
              borderRadius: "50%",
              backgroundColor: "white",
              border: "1px solid #ccc",
              width: "30px",
              height: "30px",
              cursor: "pointer",
            }}
          >
            ←
          </button>
          <span
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#00a278",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            {currentPage}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            style={{
              borderRadius: "50%",
              backgroundColor: "white",
              border: "1px solid #ccc",
              width: "30px",
              height: "30px",
              cursor: "pointer",
            }}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
