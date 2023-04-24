import React from "react";
import Navbar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="header">
      <Navbar />
      <div className="header-content flex flex-c text-center text-white">
        <h2 className="header-title text-capitalize">
          Find your candidates by ChatGPT
        </h2>
        <br />
        <p className="header-text fs-18 fw-3">
          Quickly find the candidates by inputting skill sets or experiences
          that you expect to see in their portfolios.
        </p>
        <SearchForm />
      </div>
    </header>
  );
};

export default Header;
