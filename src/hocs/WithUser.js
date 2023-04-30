import React from "react";
import { Outlet } from "react-router-dom";
import { redirectToLogin, useAuth } from "../services/auth";
import api from "../services/api";

function WithUser() {
  const { user = null, token } = useAuth();
  api.setHeader(token);
  return user && !user.isAdmin ? <Outlet /> : redirectToLogin();
}

export default WithUser;
