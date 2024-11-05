// PieChart.js
import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { IoIosCloudOutline } from "react-icons/io";
import { PiHardDrives } from "react-icons/pi";

Chart.register(...registerables);

const PieChart = ({ name, iconType }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Define a custom plugin to add text inside the pie chart
    const centerTextPlugin = {
      id: "centerTextPlugin",
      afterDatasetsDraw: (chart) => {
        const { width, height, ctx } = chart;
        ctx.save();

        // Set the font style for the center text
        const fontSize = Math.min(width, height) / 5; // Scale font based on chart size
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000"; // Text color

        // Calculate the center point
        const textX = width / 2;
        const textY = height / 2;

        // Draw the text at the center of the pie
        ctx.fillText(name, textX, textY);
        ctx.restore();
      },
    };
    const backgroundColor = name === "A" ? "#4CAF50" : "#FFA500"; // Green for 'A', orange otherwise

    // Create pie chart with plugin
    const pieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Value"],
        datasets: [
          {
            data: [75, 25], // 75% filled
            backgroundColor: [backgroundColor, "#FFFFFF"], // Use white or transparent for remaining
            borderColor: "#FFFFFF",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: () => name,
            },
          },
          title: {
            display: false, // Remove the title to avoid positioning above the pie
          },
        },
        cutout: "70%", // Keep the cutout to give a border effect
      },
      plugins: [centerTextPlugin], // Register custom plugin
    });

    // Cleanup to prevent memory leaks
    return () => {
      pieChart.destroy();
    };
  }, [name, iconType]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {/* Conditionally render cloud or storage icon */}
      {iconType === "cloud" ? (
        <IoIosCloudOutline style={{ fontSize: "16px", color: "#666" }} />
      ) : (
        <PiHardDrives style={{ fontSize: "16px", color: "#666" }} />
      )}
      <div style={{ width: "30px", height: "30px" }}>
        <canvas
          ref={chartRef}
          style={{ width: "100%", height: "100%" }}></canvas>
      </div>
    </div>
  );
};

export default PieChart;
