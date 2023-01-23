import { FC, useContext } from "react";

import { GlobalContext } from "@/context/globalState";

import "./Balance.css";
import { FormattedMessage, FormattedNumber } from "react-intl";

import { motion } from "framer-motion";

export const Balance: FC = () => {
  const { transactions } = useContext(GlobalContext);
  const { locale } = useContext(GlobalContext);
  const { usd } = useContext(GlobalContext);

  const amounts: number[] = transactions.map((item) => item.amount);
  const sum = +amounts.reduce((prev, cur) => prev + cur, 0).toFixed(2);

  const sumCurrency = (): number => {
    if (locale === "ru-RU") {
      return sum;
    } else if (locale === "en") {
      return sum / usd.conversion_rates.RUB;
    } else {
      return sum;
    }
  };

  return (
    <>
      <h4>
        <FormattedMessage id="app.balance" defaultMessage="Your Balance" />
      </h4>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut" }}
      >
        <FormattedNumber
          value={sumCurrency()}
          // eslint-disable-next-line react/style-prop-object
          style="currency"
          currency={locale === "en" ? "USD" : "RUB"}
        />
      </motion.h1>
    </>
  );
};
