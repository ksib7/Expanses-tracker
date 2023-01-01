import { FC, useContext } from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";

import { GlobalContext } from "@/context/globalState";

import "./History.css";

export const History: FC = () => {
  const { transactions } = useContext(GlobalContext);
  const { removeTransaction } = useContext(GlobalContext);
  const { locale } = useContext(GlobalContext);
  const { usd } = useContext(GlobalContext);

  const sumCurrency = (item) => {
    if (locale === "ru-RU") {
      return Math.abs(item);
    } else if (locale === "en") {
      return Math.abs(item) / usd.conversion_rates.RUB;
    } else {
      return Math.abs(item);
    }
  };

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
                {item.amount < 0 ? "-" : "+"}{" "}
                {
                  <FormattedNumber
                    value={sumCurrency(item.amount)}
                    /* value={
                      locale === "ru-RU"
                        ? Math.abs(item.amount)
                        : Math.abs(item.amount) / usd.conversion_rates.RUB
                    } */
                    // eslint-disable-next-line react/style-prop-object
                    style="currency"
                    currency={locale === "en" ? "USD" : "RUB"}
                  />
                }
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
