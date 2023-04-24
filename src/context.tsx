import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";
const URL = "http://localhost:3031/data/";

export type GlobalContent = {
  searchTerm: string;
  setSearchTerm: (c: string) => void;
  resultTitle: string;
  setResultTitle: (c: string) => void;
  loading: boolean;
  resumes: any;
  setResumes: (c: any) => void;
};

const AppContext = React.createContext<GlobalContent>({
  searchTerm: "",
  setSearchTerm: function (c: string): void {
    throw new Error("Function not implemented.");
  },
  resultTitle: "",
  setResultTitle: function (c: string): void {
    throw new Error("Function not implemented.");
  },
  loading: false,
  resumes: undefined,
  setResumes: function (c: any): void {
    throw new Error("Function not implemented.");
  }
});

interface IProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: IProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState<string>("");

  const fetchPortfolios = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}?query=${searchTerm}`);
      const data = await response.json();

      if (data) {
        const cvs = data.map((portfolio: any) => {
          const {
            Id,
            avatar,
            name,
            title,
            level,
            contact,
            work_email,
            region,
            country,
            city,
            embedding,
            experiences,
            certificates,
          } = portfolio;

          return {
            id: Id,
            avatar,
            fullName: name,
            job_title: title,
            level,
            contact,
            work_email,
            region,
            country,
            city,
            embedding,
            experiences,
            certificates,
          };
        });

        setResumes(cvs);
        console.log(cvs);

        if (cvs.length > 1) {
          setResultTitle("Your Search Result");
        } else {
          setResultTitle("No Search Result Found!");
        }
      } else {
        setResumes([]);
        setResultTitle("No Search Result Found!");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchPortfolios();
  }, [searchTerm, fetchPortfolios]);

  return (
    <AppContext.Provider
      value ={{
        loading,
        resumes,
        setResumes,
        searchTerm,
        setSearchTerm,
        resultTitle,
        setResultTitle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
