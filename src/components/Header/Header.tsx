import { FC } from "react";
import { FormattedMessage } from "react-intl";

import { Selection } from "../UI/Select/Selection";

import "./Header.css";

export const Header: FC = () => {
  return (
    <h2 className="heading">
      <FormattedMessage id="app.header" defaultMessage="Expense Tracker" />
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <p style={{ fontSize: "16px" }}>
          <FormattedMessage id="app.set.language" defaultMessage="Language:" />
        </p>
        <Selection />
      </div>
    </h2>
  );
};
