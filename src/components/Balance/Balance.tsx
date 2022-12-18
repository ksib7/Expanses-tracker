import { FC, useContext } from "react";

import { GlobalContext } from "@/context/globalState";

import "./Balance.css";

export const Balance: FC = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((item) => item.amount);
  const sum = amounts.reduce((prev, cur) => prev + cur, 0).toFixed(2);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>${sum}</h1>
    </>
  );
};
