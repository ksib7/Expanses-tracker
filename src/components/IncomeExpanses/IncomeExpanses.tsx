import { GlobalContext } from "@/context/globalState";
import { FC, useContext } from "react";
import { FormattedMessage } from "react-intl";

import "./IncomeExpanses.css";

export const IncomeExpanses: FC = () => {
  const { transactions } = useContext(GlobalContext);

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
        <p className="money plus">+${income}</p>
      </div>
      <div>
        <h4>
          <FormattedMessage id="app.expanses" defaultMessage="Expanses" />
        </h4>
        <p className="money minus">-${Math.abs(expanses)}</p>
      </div>
    </div>
  );
};
