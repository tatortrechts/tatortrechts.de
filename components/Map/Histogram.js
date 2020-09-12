import React from "react";
import { VictoryChart, VictoryBar, VictoryAxis } from "victory";

const PieChart = ({ data }) => {
  return (
    <VictoryChart height={150} scale={{ x: "time" }}>
      <VictoryAxis />
      <VictoryAxis dependentAxis tickCount={3} />
      <VictoryBar
        barRatio={1}
        style={{
          data: { fill: "#045a8d" },
        }}
        data={data.map((x) => ({ x: new Date(x.month), y: x.total }))}
      />
    </VictoryChart>
  );
};

export default PieChart;
