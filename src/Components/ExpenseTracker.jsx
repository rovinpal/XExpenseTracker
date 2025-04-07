import React, { useState, useEffect } from 'react';
import AddIncomeForm from './IncomeForm';
import AddExpenseForm from './ExpenseForm';
import EditExpenseForm from './EditExpenseForm';
import ExpenseList from './ExpenseList';
import PieChartBox from './PieChartBox';
import BarChart from './BarChart';

function ExpenseTracker() {
    const [showForm, setShowForm] = useState(false);
    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null); // Track expense being edited
  
    const [walletBalance, setWalletBalance] = useState(() => {
      const storedBalance = localStorage.getItem("walletBalance");
      return storedBalance ? JSON.parse(storedBalance) : 5000;
    });
  
    const [expenses, setExpenses] = useState(() => {
      const storedExpenses = localStorage.getItem("expenses");
      return storedExpenses ? JSON.parse(storedExpenses) : [];
    });
  
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  
    useEffect(() => {
      localStorage.setItem("walletBalance", JSON.stringify(walletBalance));
    }, [walletBalance]);
  
    useEffect(() => {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);
  
    const handleAddIncome = (amount) => {
      setWalletBalance((prev) => prev + amount);
    };
  
    const handleAddExpense = (newExpense) => {
      if (walletBalance >= newExpense.amount) {
        setWalletBalance((prev) => prev - newExpense.amount);
        setExpenses((prev) => [...prev, newExpense]);
      } else {
        alert("Insufficient balance!");
      }
    };
  
    const handleEditExpense = (expense) => {
      setEditingExpense(expense);
      setShowExpenseForm(true);
    };
  
    const handleUpdateExpense = (updatedExpense) => {
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
      );
      setEditingExpense(null);
    };
  
    const handleDeleteExpense = (id) => {
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    };


return (
    <div style={{ padding: "10px" }}>

        <h1 style={{ color: "white" }}>Expense Tracker</h1>

        <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", height: "250px", borderRadius: "10px", backgroundColor: "#626262", padding: "40px", gap: "30px" }}>
        
            <div style={{ flex: 0.5, backgroundColor: "#9b9b9b", height: "250px", borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <p style={{ color: "white", fontWeight: "400", fontSize: "30px", lineHeight: "100%", letterSpacing: "0%" }}>
                Wallet Balance: <span style={{ fontWeight: "700", color: "#9DFF5B" }}>₹{walletBalance}</span>
            </p>
            <button type="button" onClick={() => setShowForm(true)} style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", width: "150px", borderRadius: "15px", border: "none", cursor: "pointer", fontSize: "16px", background: "linear-gradient(90deg, #B5DC52 0%, #89E148 100%)" }}>
                + Add Income
            </button>
            </div>

            {showForm && (
                <AddIncomeForm
                    onAddIncome={handleAddIncome}
                    onClose={() => setShowForm(false)}
                />
            )}


            <div style={{ flex: 0.5, backgroundColor: "#9b9b9b", height: "250px", borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <p style={{ color: "white", fontWeight: "400", fontSize: "30px", lineHeight: "100%", letterSpacing: "0%" }}>
                Expenses: <span style={{ fontWeight: "700", color: "#F4BB4A" }}>₹{totalExpenses}</span>
            </p>
            <button type="button" onClick={() => setShowExpenseForm(true)} style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", width: "150px", borderRadius: "15px", border: "none", cursor: "pointer", fontSize: "16px", background: "linear-gradient(90deg, #FF9595 0%, #FF4747 80%, #FF3838 100%)" }}>
                + Add Expense
            </button>
            </div>

            {showExpenseForm && (
                <AddExpenseForm
                    onAddExpense={handleAddExpense}
                    onClose={() => setShowExpenseForm(false)}
                />
            )}
            
            <div style={{ flex: 0.5 }}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <PieChartBox expenses={expenses}/>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "30px"
                    }}
                    >
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "5px"
                        }}
                    >
                        <div
                        style={{ height: "15px", width: "30px", backgroundColor: "#A000FF" }}
                        ></div>
                        <p>Food</p>
                    </div>
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "5px"
                        }}
                    >
                        <div
                        style={{ height: "15px", width: "30px", backgroundColor: "#FF9304" }}
                        ></div>
                        <p>Entertainment</p>
                    </div>
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "5px"
                        }}
                    >
                        <div
                        style={{ height: "15px", width: "30px", backgroundColor: "#FDE006" }}
                        ></div>
                        <p>Travel</p>
                    </div>
                </div>
            </div>

        </div>

        <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>

            <div style={{ flex: 2, height: "250px", borderRadius: "10px" }}>

                <h2 style={{ fontStyle: "italic", color: "white" }}>Recent Transactions</h2>

                <div style={{ background: "#FFFFFF", borderRadius: "10px", padding: "20px" }}>
                    <ExpenseList expenses={expenses} onEdit={handleEditExpense} onDelete={handleDeleteExpense} />
                </div>
            </div>

            <div style={{ flex: 1, height: "250px", borderRadius: "10px" }}>

                <h2 style={{ fontStyle: "italic", color: "white" }}>Top Expenses</h2>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", backgroundColor: "white", width: "100%", minHeight: "250px", borderRadius: "10px" }}>
                    <BarChart expenses={expenses}/>
                </div>

            </div>
        
        </div>

        {editingExpense  && (
            <EditExpenseForm
                expense={editingExpense}
                onUpdateExpense={handleUpdateExpense}
                onClose={() => setEditingExpense(null)}
                closeFormEscape={(e, close) => {
                    if (e.key === "Escape") close();
                }}
            />
        )}

    </div>
);
}

export default ExpenseTracker;
