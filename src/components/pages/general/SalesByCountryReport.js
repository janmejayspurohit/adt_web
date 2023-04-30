import { Spinner, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import useCustomToastr from "../../../utils/useCustomToastr";
import api from "../../../services/api";
import { SALESBYCOUNTRYREPORT } from "../../../constants/apiRoutes";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

const SalesByCountryReport = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState([]);
  const toast = useCustomToastr();

  useEffect(() => {
    setLoading(true);
    api
      .get(SALESBYCOUNTRYREPORT)
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
          <BarChart
            width={500}
            height={300}
            data={report}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSales" fill="#82ca9d" />
          </BarChart>
        )}
      </VStack>
    </Layout>
  );
};

export default SalesByCountryReport;
