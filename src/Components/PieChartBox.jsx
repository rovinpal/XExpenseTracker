import React from "react";
// import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const PieChartBox = ({ chartData }) => {
  const options = {
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
      {chartData && chartData.datasets?.length > 0 ? (
        <Pie data={chartData} options={options} />
      ) : (
        <div></div>
      )}
    </div>
  );
};


export default PieChartBox;
