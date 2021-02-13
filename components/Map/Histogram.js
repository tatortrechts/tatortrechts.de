import * as dayjs from "dayjs";
import React from "react";
import {
  Bar,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTooltip,
} from "victory";

const fontFamily = `BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif`;

const addTimeInterval = (x, timeInterval) => {
  if (timeInterval === "year") return dayjs(x).add(1, "years");
  if (timeInterval === "quarter") return dayjs(x).add(3, "months");
  if (timeInterval === "month") return dayjs(x).add(1, "months");
  if (timeInterval === "week") return dayjs(x).add(1, "weeks");
  if (timeInterval === "day") return dayjs(x).add(1, "days");
};

const fillMissingData = (data, timeInterval) => {
  const transformedData = [];

  let prevDate = null;

  for (const x of data) {
    const newDate = dayjs(x.date_histogram);

    if (prevDate !== null) {
      while (true) {
        const addedTime = addTimeInterval(prevDate, timeInterval);
        if (newDate.diff(addedTime, "day") !== 0) {
          transformedData.push({ x: addedTime.toDate(), y: 0 });
          prevDate = addedTime;
        } else break;
      }
    }

    transformedData.push({ x: newDate.toDate(), y: x.total });
    prevDate = newDate;
  }
  return transformedData;
};

const Histogram = ({
  data,
  yMax = null,
  width = 450,
  height = 100,
  padding = { left: 50, top: 30, bottom: 20, right: 10 },
  barOnClick = null,
}) => {
  if (data == null || !data.length || data.length === 0) return null;

  let timeInterval = data[0].time_interval;

  const genLabelText = (date, count) => {
    const firstDate = dayjs(date);
    const secondDate = addTimeInterval(firstDate, timeInterval).add(
      "-1",
      "days"
    );

    const firstPart = count > 1 ? `${count} Fälle` : `ein Fall`;
    let secondPart = ` von ${firstDate.format(
      "DD.MM.YYYY"
    )} bis ${secondDate.format("DD.MM.YYYY")}`;

    if (timeInterval === "day")
      secondPart = ` am ${firstDate.format("DD.MM.YYYY")}`;

    return firstPart + secondPart;
  };

  const genTimeFormat = (t) => {
    if (timeInterval === "year")
      return t.toLocaleString("de-de", { year: "numeric" });
    if (timeInterval === "day")
      return t.toLocaleString("de-de", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

    return t.toLocaleString("de-de", { month: "short", year: "numeric" });
  };

  const transformedData = fillMissingData(data, timeInterval);

  return (
    <VictoryChart
      padding={padding}
      height={height}
      width={width}
      scale={{ x: "time" }}
      domain={yMax == null ? {} : { y: [0, yMax] }}
      domainPadding={{ x: 10 }}
    >
      <VictoryAxis
        tickCount={3}
        style={{
          tickLabels: { fontSize: 8, fontFamily },
          axis: {
            stroke: "grey",
          },
        }}
        tickFormat={genTimeFormat}
      />
      <VictoryAxis
        label="Fälle"
        style={{
          tickLabels: { fontSize: 8, fontFamily },
          axisLabel: { fontSize: 7, padding: 40, fontFamily },
          axis: {
            stroke: "grey",
          },
        }}
        dependentAxis
        tickCount={3}
        tickFormat={(x) => Math.floor(x)}
      />
      <VictoryBar
        events={[
          barOnClick === null
            ? {}
            : {
                target: "data",
                eventHandlers: {
                  onClick: barOnClick,
                },
              },
        ]}
        dataComponent={<Bar transform="translate(0, -1)" />}
        barRatio={0.8}
        style={{
          data: {
            fill: "#fc9272",
            cursor: barOnClick === null ? "inherit" : "pointer",
          },
        }}
        data={transformedData}
        labels={({ datum }) => genLabelText(datum.x, datum.y)}
        labelComponent={
          <VictoryTooltip
            cornerRadius={1}
            style={{ fontFamily, fontSize: 8 }}
          />
        }
      />
    </VictoryChart>
  );
};

export default Histogram;
