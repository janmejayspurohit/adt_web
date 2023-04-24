import React, { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import api from "../../../services/api";
import { ORDERCOUNTREPORT } from "../../../constants/apiRoutes";
import useCustomToastr from "../../../utils/useCustomToastr";
import OrderCountReport from "./OrderCountReport";
import { Spinner, Text, VStack } from "@chakra-ui/react";

const Reports = () => {
  const toast = useCustomToastr();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState([]);

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
        {loading ? <Spinner /> : <OrderCountReport data={report} />}
      </VStack>
    </Layout>
  );
};

export default Reports;
