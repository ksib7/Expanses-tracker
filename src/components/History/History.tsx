import { FC, useContext } from "react";

import { GlobalContext } from "@/context/globalState";

import "./History.css";

export const History: FC = () => {
  const { transactions } = useContext(GlobalContext);
  const { removeTransaction } = useContext(GlobalContext);

  return (
    <>
      <h3>History</h3>
      {transactions.length < 1 ? (
        <p>History is an empty . . .</p>
      ) : (
        <ul className="list">
          {transactions.map((item) => (
            <li key={item.id} className={item.amount < 0 ? "minus" : "plus"}>
              {item.text}
              <span>
                {item.amount < 0 ? "-" : "+"}${Math.abs(item.amount)}
              </span>
              <button
                onClick={() => removeTransaction(item.id)}
                className="delete-btn"
              >
                x
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
