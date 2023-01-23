import { FC, useContext } from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";

import { GlobalContext } from "@/context/globalState";

import { motion } from "framer-motion";

import "./History.css";

export const History: FC = () => {
  const { transactions } = useContext(GlobalContext);
  const { removeTransaction } = useContext(GlobalContext);
  const { locale } = useContext(GlobalContext);
  const { usd } = useContext(GlobalContext);

  const sumCurrency = (item: number): number => {
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
            <motion.li
              key={item.id}
              className={item.amount < 0 ? "minus" : "plus"}
              whileHover={{
                boxShadow: "0px 0px 8px 3px rgba(34, 60, 80, 0.24)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeInOut" }}
              layout
            >
              {item.text}
              <span>
                {item.amount < 0 ? "-" : "+"}{" "}
                {
                  <FormattedNumber
                    value={sumCurrency(item.amount)}
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
            </motion.li>
          ))}
        </ul>
      )}
    </>
  );
};
