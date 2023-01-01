import { FC, useContext } from "react";

import { GlobalContext } from "@/context/globalState";

import "./Balance.css";
import { FormattedMessage, FormattedNumber } from "react-intl";

export const Balance: FC = () => {
  const { transactions } = useContext(GlobalContext);
  const { locale } = useContext(GlobalContext);
  const { usd } = useContext(GlobalContext);

  const amounts = transactions.map((item) => item.amount);
  const sum = amounts.reduce((prev, cur) => prev + cur, 0).toFixed(2);

  const sumCurrency = () => {
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
      <h1>
        <FormattedNumber
          value={sumCurrency()}
          // eslint-disable-next-line react/style-prop-object
          style="currency"
          currency={locale === "en" ? "USD" : "RUB"}
        />
      </h1>
    </>
  );
};
