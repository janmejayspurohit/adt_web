import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Pie, PieChart, Sector } from "recharts";

const OrderCountReport = ({ data = [] }) => {
  const categories = [...new Set(data.map((item) => item.category))];

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Value: ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const fetchDataByCategory = (category) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const cData = data.filter((item) => item.category === category);
    const finalData = cData.map((item) => {
      return {
        name: item.subCategory,
        value: parseInt(item.orderCount),
      };
    });
    return (
      <PieChart width={600} height={400}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={finalData}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={(_, index) => setActiveIndex(index)}
        />
      </PieChart>
    );
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      {categories.map((category) => {
        return (
          <VStack key={category} spacing={0}>
            <Text fontWeight={"bold"} fontSize="25px">
              {category}
            </Text>
            {fetchDataByCategory(category)}
          </VStack>
        );
      })}
    </Grid>
  );
};

export default OrderCountReport;
