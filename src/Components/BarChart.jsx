import React from "react";

const BarChart = ({ data }) => {
  if (!data || data.length === 0) return <div></div>;

  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <div style={{padding: "20px" }}>
      {sortedData.map((item) => (
        <div key={item.label} style={{ marginBottom: "12px" }}>
          <span style={{ display: "inline-block", width: "120px", textAlign: "right", marginRight: "10px" }}>
            {item.label}-
          </span>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "#8784D2",
              height: "16px",
              width: `${item.value * 2}px`, 
              verticalAlign: "middle",
            }}
          ></span>
        </div>
      ))}
    </div>
  );
};

export default BarChart;

