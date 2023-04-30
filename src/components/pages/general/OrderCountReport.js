import { Grid, Spinner, Text, VStack, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Pie, PieChart, Sector } from "recharts";
import api from "../../../services/api";
import { ORDERCOUNTREPORT } from "../../../constants/apiRoutes";
import useCustomToastr from "../../../utils/useCustomToastr";
import Layout from "../../common/Layout";

const FetchDataByCategory = ({ category, report }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { colorMode } = useColorMode();

  const cData = report.filter((item) => item.category === category);
  const finalData = cData.map((item) => {
    return {
      name: item.subCategory,
      value: parseInt(item.orderCount),
    };
  });

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
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill={colorMode == "dark" ? "#fff" : "#333"}
        >{`Value: ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

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

const OrderCountReport = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState([]);
  const categories = [...new Set(report.map((item) => item.category))];
  const toast = useCustomToastr();

  useEffect(() => {
    setLoading(true);
    api
      .get(ORDERCOUNTREPORT)
      .then((res) => {
        setReport(res.data?.result);
        setLoading(false);
      })
      .catch((err) => {
        toast.showError({ description: err?.message });
        setLoading(false);
      });
    return () => {
      setReport([]);
      setLoading(false);
    };
  }, []);

  return (
    <Layout>
      <VStack>
        <Text fontWeight={"bold"} fontSize="32px">
          Order Count Report
        </Text>
        {loading ? (
          <Spinner />
        ) : (
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {categories.map((category) => {
              return (
                <VStack key={category} spacing={0}>
                  <Text fontWeight={"bold"} fontSize="25px">
                    {category}
                  </Text>
                  <FetchDataByCategory category={category} report={report} />
                </VStack>
              );
            })}
          </Grid>
        )}
      </VStack>
    </Layout>
  );
};

export default OrderCountReport;
