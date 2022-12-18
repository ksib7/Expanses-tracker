import { FC, useContext, useState } from "react";

import { Input } from "@/components/UI/Input/Input";
import { Button } from "@/components/UI/Button/Button";

import { GlobalContext } from "@/context/globalState";

import { nanoid } from "nanoid";

import "./Transaction.css";

export const Transaction: FC = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const { addTransaction } = useContext(GlobalContext);

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
      <h3>Add new transaction</h3>
      <form onSubmit={sendTransaction}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <Input
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Enter amount..."
          />
        </div>
        <Button disabled={!text.length || !amount.length}>
          Add transaction
        </Button>
      </form>
    </>
  );
};
