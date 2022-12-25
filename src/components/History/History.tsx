import { FC, useContext } from "react";
import { FormattedMessage } from "react-intl";

import { GlobalContext } from "@/context/globalState";

import "./History.css";

export const History: FC = () => {
  const { transactions } = useContext(GlobalContext);
  const { removeTransaction } = useContext(GlobalContext);

  return (
    <>
      <h3>
        <FormattedMessage id="app.history" defaultMessage="History" />
      </h3>

      {transactions.length < 1 ? (
        <p style={{ textAlign: "center" }}>
          <FormattedMessage
            id="app.history.empty"
            defaultMessage="History is an empty . . ."
          />
        </p>
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
