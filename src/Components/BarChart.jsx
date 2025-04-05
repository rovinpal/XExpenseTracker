import React from "react";

const BarChart = ({ expenses }) => {
  if (!expenses  || expenses.length === 0) return;

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const categories = ["food", "travel", "entertainment"];
  const categoryData = categories.map((category) => {
    const categoryExpenses = expenses
      .filter((expense) => expense.category.toLowerCase() === category)
      .reduce((acc, curr) => acc + curr.amount, 0);

    return {
      label: category.charAt(0).toUpperCase() + category.slice(1), 
      value: totalExpenses ? (categoryExpenses / totalExpenses) * 100 : 0,
    };
  });

  const sortedCategoryData = [...categoryData].sort((a, b) => b.value - a.value);


  return (
    <div style={{ padding: "20px" }}>
      {sortedCategoryData.map((item) => (
        <div key={item.label} style={{ marginBottom: "12px" }}>
          <span style={{ display: "inline-block", width: "120px", textAlign: "right", marginRight: "10px" }}>
            {item.label} - 
          </span>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "#A000FF",
              height: "16px",
              width: `${item.value * 2}px`,
              verticalAlign: "middle",
              transition: "width 0.5s ease-in-out",
            }}
          ></span>
          {/* <span style={{ marginLeft: "8px", color: "#333", fontSize: "12px" }}>
            {item.value.toFixed(1)}%
          </span> */}
        </div>
      ))}
    </div>
  );
};

export default BarChart;

