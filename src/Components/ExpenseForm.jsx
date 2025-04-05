import React, { useState } from "react";

const AddExpenseForm = ({ onAddExpense, onClose }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const validTitles = ["food", "travel", "entertainment"];

  const handleAddExpense = (e) => {
    e.preventDefault();

    if (!validTitles.includes(title.toLowerCase())) {
      alert("Title must be one of: Food, Travel, Entertainment");
      return;
    }

    if (!amount || !category || !date) {
      alert("All fields are required.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title: title.toLowerCase(),
      amount: parseFloat(amount),
      category,
      date,
    };

    onAddExpense(newExpense); // Send expense to parent
    onClose(); // Close form
  };

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
        <h2>Add Expense</h2>
        <form onSubmit={handleAddExpense}>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (food/travel/entertainment)"
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
              name="price"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Price"
              className="hide-arrow"
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
                  }}>
              Add Expense
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
                  }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default AddExpenseForm;