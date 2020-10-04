import React from "react";
import { VictoryChart, VictoryBar, VictoryAxis } from "victory";

const Histogram = ({ data }) => {
  return (
    <VictoryChart height={150} scale={{ x: "time" }} domainPadding={{ x: 10 }}>
      <VictoryAxis />
      <VictoryAxis
        dependentAxis
        tickCount={3}
        tickFormat={(x) => Math.floor(x)}
      />
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

export default Histogram;
