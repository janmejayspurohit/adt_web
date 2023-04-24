import React from "react";

// CSS Imports
import "./App.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "react-datepicker/dist/react-datepicker.css";
import customTheme from "./styles/theme";

//Other Imports
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { Login, UserRegistration, ResetCredentials } from "./components/pages/auth";
import { Lost } from "./components/pages";
import { useAuth } from "./services/auth";
import { ResponseInterceptor } from "./utils/ResponseInterceptor";
import Landing from "./components/pages/landingpage/Landing";
import api from "./services/api";
import { Home, Reports } from "./components/pages/home";

const App = () => {
  const { token } = useAuth();
  api.setHeader(token);

  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <ResponseInterceptor />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<UserRegistration />} />
        <Route path="reset-credentials" element={<ResetCredentials />} />

        <Route path="home" element={<Home />} />
        <Route path="order-count-report" element={<Reports />} />

        <Route path="*" element={<Lost />} />
      </Routes>
    </ChakraProvider>
  );
};

export default App;
