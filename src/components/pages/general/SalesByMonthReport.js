import { Spinner, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import useCustomToastr from "../../../utils/useCustomToastr";
import api from "../../../services/api";
import { SALESBYMONTHREPORT } from "../../../constants/apiRoutes";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const SalesByMonthReport = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState({});
  const toast = useCustomToastr();

  let data = Object.keys(report)
    .map((year) =>
      Object.keys(report[year]).map((month) => ({
        name: month + "-" + year,
        value: report[year][month],
        year,
      }))
    )
    .flat();

  useEffect(() => {
    setLoading(true);
    api
      .get(SALESBYMONTHREPORT)
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
        <Text fontWeight={"bold"} fontSize="32px" mb="10">
          Sales By Month Report
        </Text>
        {loading ? (
          <Spinner />
        ) : (
          <LineChart
            width={1200}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        )}
      </VStack>
    </Layout>
  );
};

export default SalesByMonthReport;
