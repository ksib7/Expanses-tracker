import { GlobalContext } from "@/context/globalState";
import { FC, useContext } from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";

import "./IncomeExpanses.css";

export const IncomeExpanses: FC = () => {
  const { transactions } = useContext(GlobalContext);
  const { locale } = useContext(GlobalContext);

  const income = transactions
    .filter((item) => item.amount > 0)
    .reduce((prev, cur) => prev + cur.amount, 0);

  const expanses = transactions
    .filter((item) => item.amount < 0)
    .reduce((prev, cur) => prev + cur.amount, 0);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>
          <FormattedMessage id="app.income" defaultMessage="Income" />
        </h4>
        <p className="money plus">
          +
          <FormattedNumber
            value={income}
            // eslint-disable-next-line react/style-prop-object
            style="currency"
            currency={locale === "en" ? "USD" : "RUB"}
          />
        </p>
      </div>
      <div>
        <h4>
          <FormattedMessage id="app.expanses" defaultMessage="Expanses" />
        </h4>
        <p className="money minus">
          -
          <FormattedNumber
            value={Math.abs(expanses)}
            // eslint-disable-next-line react/style-prop-object
            style="currency"
            currency={locale === "en" ? "USD" : "RUB"}
          />
        </p>
      </div>
    </div>
  );
};
