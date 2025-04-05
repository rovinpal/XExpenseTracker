import React, { useState } from "react";

const AddIncomeForm = ({ onAddIncome, onClose }) => {
  const [incomeAmount, setIncomeAmount] = useState("");

  const handleAddBalance = (e) => {
    e.preventDefault();
    const amount = parseFloat(incomeAmount);
    if (!isNaN(amount) && amount > 0) {
      onAddIncome(amount);
      setIncomeAmount("");
      onClose();
    } else {
      alert("Please enter a valid amount.");
    }
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
          borderRadius: "15px",
          width: "500px",
        }}
      >
        <h2>Add Balance</h2>
        <form onSubmit={handleAddBalance}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <input
              className="hide-arrow"
              type="number"
              placeholder="Income Amount"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
              style={{
                width: "200px",
                height: "47px",
                marginBottom: "10px",
                borderRadius: "8px",
                paddingLeft: "15px",
                border: "1px solid #ccc",
                background: "linear-gradient(0deg, #FBFBFB, #FBFBFB)",
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
            />
            <button
              type="submit"
              style={{
                width: "150px",
                height: "50px",
                padding: "10px 20px",
                background: "linear-gradient(0deg, #F4BB4A, #F4BB4A)",
                boxShadow: "0px 4px 4px 0px #00000040",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Add Balance
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                width: "100px",
                height: "50px",
                padding: "10px 20px",
                background: "linear-gradient(0deg, #D9D9D9, #D9D9D9)",
                boxShadow: "0px 4px 4px 0px #00000040",
                color: "black",
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

export default AddIncomeForm;
