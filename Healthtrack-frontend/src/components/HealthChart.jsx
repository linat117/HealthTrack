import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

const HealthChart = ({ entries }) => {
  const labels = entries.map((e, i) => `Day ${i + 1}`);
  const data = {
    labels,
    datasets: [
      {
        label: "Steps",
        data: entries.map((e) => e.steps || 0),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.3)",
        tension: 0.3,
      },
      {
        label: "Water Intake (L)",
        data: entries.map((e) => e.waterIntake || 0),
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245,158,11,0.3)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
  };

  return <Line data={data} options={options} />;
};

export default HealthChart;
