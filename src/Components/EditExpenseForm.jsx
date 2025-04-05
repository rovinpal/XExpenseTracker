import React, { useState, useEffect } from "react";

const EditExpenseForm = ({ expense, onUpdateExpense, onClose, closeFormEscape }) => {
  const [editedExpense, setEditedExpense] = useState({
    ...expense,
    title: expense.title || "",
    amount: expense.amount || "",
    category: expense.category || "",
    date: expense.date || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateExpense(editedExpense);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      closeFormEscape(e, onClose);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeFormEscape, onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#FFFFFFC4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#EFEFEFD9",
          padding: "20px",
          borderRadius: "8px",
          width: "500px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Edit Expense</h2>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <input
              type="text"
              name="title"
              value={editedExpense.title}
              onChange={handleChange}
              placeholder="Title"
              style={{
                width: "225px",
                height: "30px",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="number"
              name="amount"
              value={editedExpense.amount}
              onChange={handleChange}
              placeholder="Amount"
              style={{
                width: "225px",
                height: "30px",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <input
              type="text"
              name="category"
              value={editedExpense.category}
              onChange={handleChange}
              placeholder="Category (Food, Travel, Entertainment)"
              style={{
                width: "225px",
                height: "30px",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="date"
              name="date"
              value={editedExpense.date}
              onChange={handleChange}
              style={{
                width: "225px",
                height: "30px",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                width: "245px",
                height: "47px",
                background: "linear-gradient(0deg, #F4BB4A, #F4BB4A)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Update Expense
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "10px 20px",
                width: "245px",
                height: "47px",
                background: "linear-gradient(0deg, #D9D9D9, #D9D9D9)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseForm;
