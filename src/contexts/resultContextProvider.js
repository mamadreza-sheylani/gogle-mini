import React, { createContext, useContext, useState } from "react";
import axios from "axios";
const ResultsContext = createContext();

const baseUrl = "https://google-search3.p.rapidapi.com/api/v1";

const headers = {
  "X-User-Agent": "desktop",
  "X-Proxy-Location": "US",
  "X-RapidAPI-Host": "google-search3.p.rapidapi.com",
  "X-RapidAPI-Key": "fb3fa0b56fmsh58e031d1924fcb3p1ac67bjsn9b6073771dd9",
};
//'fb3fa0b56fmsh58e031d1924fcb3p1ac67bjsn9b6073771dd9'
export const ResultsContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //here we get the search term
  const [searchTerm, setSearchTerm] = useState("");

  const getResults = async (type) => {
    setIsLoading(true);
    const response = await fetch(`${baseUrl}${type}`, {
      method: "GET",
      headers: headers,
    });

    // axios
    //   .get(`${baseUrl}${type}`, {
    //     method: "GET",
    //     headers: headers,
    //   })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       setResults(response.data);
    //       setIsLoading(false);
    //     } else {
    //       console.log("something happend wrong", response.status);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err.code);
    //   });
    const data = await response.json();
    setResults(data);
    setIsLoading(false);
  };

  //value is all the things (funcs or variables) you pass as props to your whole context for further use
  return (
    <ResultsContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export const useResultsContext = () => useContext(ResultsContext);
