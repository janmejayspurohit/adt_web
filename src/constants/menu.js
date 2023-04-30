import React from "react";
import { AiFillHome } from "react-icons/ai";
import { MdAccountBalance, MdAccountTree, MdCalendarViewMonth } from "react-icons/md";

const menu = [
  {
    name: "Home",
    link: "/home",
    icon: <AiFillHome color="white" />,
  },
  {
    name: "Order Counts",
    link: "/order-count-report",
    icon: <MdAccountTree color="white" />,
  },
  {
    name: "Sales by Country",
    link: "/sales-by-country-report",
    icon: <MdAccountBalance color="white" />,
  },
  {
    name: "Sales by Month",
    link: "/sales-by-month-report",
    icon: <MdCalendarViewMonth color="white" />,
  },
];

export default menu;
