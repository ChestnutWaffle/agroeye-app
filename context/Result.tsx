import { createContext, useContext, useState } from "react";

export const initialResult = {
  key: "",
  value: "",
};

type Result = {
  key: string;
  value: string;
};

export const ResultContext = createContext<{
  result1: Result;
  result2: Result;
  updateResults: (result1: Result, result2: Result) => void;
}>({
  result1: initialResult,
  result2: initialResult,
  updateResults: (result1, result2) => {},
});

export const ResultsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [result1, setResult1] = useState(initialResult);
  const [result2, setResult2] = useState(initialResult);

  const updateResults = (result1: Result, result2: Result) => {
    setResult1(result1);
    setResult2(result2);
  };

  const value = { result1, result2, updateResults };

  return (
    <ResultContext.Provider value={value}>{children}</ResultContext.Provider>
  );
};

export const useResult = () => useContext(ResultContext);
