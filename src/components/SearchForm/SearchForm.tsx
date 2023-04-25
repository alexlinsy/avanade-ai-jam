import React, { useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./SearchForm.css";
import { useGlobalContext } from "../../context";



function SearchForm({}) {
  const {setSearchTerm, setResultTitle } = useGlobalContext<string>();
  const searchText = useRef("");
  const navigate = useNavigate();

  useEffect(() => (searchText.current as String | any)?.focus(), []);
  const handleSubmit = (e : any) => {
    e.preventDefault();
    let tempSearchTerm = (searchText.current as String | any)?.value.trim();
    if (tempSearchTerm.replace(/[^\w\s]/gi, "").length === 0) {
      setSearchTerm("html");
      setResultTitle("Please Enter Something ...");
    } else {
      setSearchTerm((searchText.current as String | any).value);
    }

    navigate("/resumeList");
  };

  return (
    <div className="search-form">
      <div className="container">
        <div className="search-form-content">
          <form className="search-form">
            <div className="search-form-elem flex flex-sb bg-white">
              <input
                type="text"
                className="form-control"
                placeholder="what you are interested"
                ref={searchText as String | any}
              />
              <button type="submit" className="flex flex-c">
                <FaSearch
                  className="text-purple"
                  size={32}
                  onClick={handleSubmit}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
