import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const PieChartBox = ({ expenses }) => {
  if (!expenses || expenses.length === 0) return;

  // const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const categories = ["food", "travel", "entertainment"];
  const categoryData = categories.map((category) => {
    const categoryExpenses = expenses
      .filter((expense) => expense.category.toLowerCase() === category)
      .reduce((acc, curr) => acc + curr.amount, 0);

    return categoryExpenses;
  });

  const data = {
    labels: categories.map((cat) => cat.charAt(0).toUpperCase() + cat.slice(1)),
    datasets: [
      {
        data: categoryData,
        backgroundColor: ["#A000FF", "#FDE006", "#FF9304"], 
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value, context) => {
          const total = context.chart._metasets[0].total;
          const percentage = ((value / total) * 100).toFixed(0);
          return `${percentage}%`;
        },
      },
    },
  };

  return (
    <div style={{ width: "250px", height: "250px" }}>
      <Pie data={data} options={options} />
    </div>
  );
};


export default PieChartBox;
