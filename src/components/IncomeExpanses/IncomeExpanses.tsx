import { GlobalContext } from "@/context/globalState";
import { FC, useContext } from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";

import { motion } from "framer-motion";

import "./IncomeExpanses.css";

export const IncomeExpanses: FC = () => {
  const { transactions } = useContext(GlobalContext);
  const { locale } = useContext(GlobalContext);
  const { usd } = useContext(GlobalContext);

  const income: number = transactions
    .filter((item) => item.amount > 0)
    .reduce((prev, cur) => prev + cur.amount, 0);

  const expanses: number = transactions
    .filter((item) => item.amount < 0)
    .reduce((prev, cur) => prev + cur.amount, 0);

  const incomeCurrency = (): number => {
    if (locale === "ru-RU") {
      return income;
    } else if (locale === "en") {
      return income / usd.conversion_rates.RUB;
    } else {
      return income;
    }
  };

  const expansesCurrency = () => {
    if (locale === "ru-RU") {
      return Math.abs(expanses);
    } else if (locale === "en") {
      return Math.abs(expanses) / usd.conversion_rates.RUB;
    } else {
      return Math.abs(expanses);
    }
  };

  return (
    <div className="inc-exp-container">
      <div>
        <h4>
          <FormattedMessage id="app.income" defaultMessage="Income" />
        </h4>
        <motion.p
          className="money plus"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut" }}
        >
          +
          <FormattedNumber
            value={incomeCurrency()}
            // eslint-disable-next-line react/style-prop-object
            style="currency"
            currency={locale === "en" ? "USD" : "RUB"}
          />
        </motion.p>
      </div>
      <div>
        <h4>
          <FormattedMessage id="app.expanses" defaultMessage="Expanses" />
        </h4>
        <motion.p
          className="money minus"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut" }}
        >
          -
          <FormattedNumber
            value={expansesCurrency()}
            // eslint-disable-next-line react/style-prop-object
            style="currency"
            currency={locale === "en" ? "USD" : "RUB"}
          />
        </motion.p>
      </div>
    </div>
  );
};
