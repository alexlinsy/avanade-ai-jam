import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Home;
