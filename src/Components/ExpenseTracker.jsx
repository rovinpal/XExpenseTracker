import React, { useState, useEffect } from 'react';
import AddIncomeForm from './IncomeForm';
import AddExpenseForm from './ExpenseForm';
// import EditExpenseForm from './EditExpenseForm';
import ExpenseList from './ExpenseList';
import PieChartBox from './PieChartBox';
import BarChart from './BarChart';

function ExpenseTracker() {
    const [walletBalance, setWalletBalance] = useState(5000);
    const [totalExpense, setTotalExpense] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [expenseList, setExpenseList] = useState([]);

    const handleAddIncome = (amount) => {
        setWalletBalance(prev => prev + amount);
    };

    
    const handleAddExpense = (expense) => {
        if (expense.amount > walletBalance) {
          alert("You cannot spend more than the wallet balance!");
          return;
        }
      
        const updatedExpenses = [...expenseList, expense];
        setExpenseList(updatedExpenses);
        setWalletBalance(prev => prev - expense.amount);
        setTotalExpense(prev => prev + expense.amount);
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };
  
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenseList(storedExpenses);
    const total = storedExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    setTotalExpense(total);
    setWalletBalance(5000 - total); 
  }, []);

  const getChartData = () => {
    const categoryTotals = {};
  
    expenseList.forEach(exp => {
      const category = exp.category;
      const amount = Number(exp.amount);
      if (!categoryTotals[category]) {
        categoryTotals[category] = 0;
      }
      categoryTotals[category] += amount;
    });
  
    return Object.keys(categoryTotals).map(cat => ({
      label: cat,
      value: categoryTotals[cat],
    }));
  };
  
  const getPieChartData = () => {
    const categories = ["food", "travel", "entertainment"];
    const categoryTotals = {
      food: 0,
      travel: 0,
      entertainment: 0,
    };
  
    expenseList.forEach((exp) => {
      const category = exp.category.toLowerCase();
      if (categoryTotals.hasOwnProperty(category)) {
        categoryTotals[category] += Number(exp.amount);
      }
    });
  
    const data = categories.map((cat) => categoryTotals[cat]);
    const colors = ["#FF6384", "#36A2EB", "#FFCD56"];
  
    return {
      labels: categories,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderWidth: 1,
        },
      ],
    };
  };
  
  



return (
    <div style={{ padding: "10px" }}>

        <h1 style={{ color: "white" }}>Expense Tracker</h1>

        <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", height: "250px", borderRadius: "10px", backgroundColor: "#626262", padding: "40px", gap: "30px" }}>
        
            <div style={{ flex: 0.5, backgroundColor: "#9b9b9b", height: "250px", borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <p style={{ color: "white", fontWeight: "400", fontSize: "30px", lineHeight: "100%", letterSpacing: "0%" }}>
                Wallet balance: <span style={{ fontWeight: "700", color: "#9DFF5B" }}>₹{walletBalance}</span>
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
                Expenses: <span style={{ fontWeight: "700", color: "#F4BB4A" }}>₹{totalExpense}</span>
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
                <PieChartBox chartData={getPieChartData()} />
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
                    <ExpenseList expenses={expenseList}/>
                </div>
            </div>

            <div style={{ flex: 1, height: "250px", borderRadius: "10px" }}>

                <h2 style={{ fontStyle: "italic", color: "white" }}>Top Expenses</h2>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", backgroundColor: "white", width: "100%", minHeight: "250px", borderRadius: "10px" }}>
                    <BarChart data={getChartData()}/>
                </div>

            </div>
        
        </div>

    </div>
);
}

export default ExpenseTracker;
