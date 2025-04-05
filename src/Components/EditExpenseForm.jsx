import React, { useState } from "react";

const AddExpenseForm = ({ onClose, onAddExpense, walletBalance, closeFormEscape }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (title && amount && category && date && amount <= walletBalance) {
      onAddExpense({ title, amount: Number(amount), category, date });
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
      onClose(); // Close the form
    } else {
      alert("Please fill all fields and ensure you don't exceed the wallet balance.");
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleAddExpense}>
        <input
          type="text"
          name="title"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          name="price"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddExpenseForm;
