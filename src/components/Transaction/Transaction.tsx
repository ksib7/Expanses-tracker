import { FC, useContext, useState } from "react";

import { Input } from "@/components/UI/Input/Input";
import { Button } from "@/components/UI/Button/Button";

import { GlobalContext } from "@/context/globalState";

import { nanoid } from "nanoid";

import { FormattedMessage, useIntl } from "react-intl";

import "./Transaction.css";

export const Transaction: FC = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const { addTransaction } = useContext(GlobalContext);

  const intl = useIntl();
  const placeholderText = intl.formatMessage({ id: "app.placeholder.text" });
  const placeholderAmount = intl.formatMessage({
    id: "app.placeholder.amount",
  });

  const sendTransaction = (e) => {
    e.preventDefault();

    addTransaction({
      id: nanoid(),
      text,
      amount: +amount,
    });

    setText("");
    setAmount("");
  };

  return (
    <>
      <h3>
        <FormattedMessage
          id="app.add.transaction"
          defaultMessage="Add new transaction"
        />
      </h3>
      <form onSubmit={sendTransaction}>
        <div className="form-control">
          <label htmlFor="text">
            <FormattedMessage id="app.text" defaultMessage="Text" />
          </label>
          <Input
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder={placeholderText}
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            <FormattedMessage id="app.amount" defaultMessage="Amount" /> <br />
            <FormattedMessage
              id="app.sign"
              defaultMessage="(+) - income, (-) - expenses"
            />
          </label>
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder={placeholderAmount}
          />
        </div>
        <Button disabled={!text.length || !amount.length}>
          <FormattedMessage
            id="app.add.transaction"
            defaultMessage="Add transaction"
          />
        </Button>
      </form>
    </>
  );
};
