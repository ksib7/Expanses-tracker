import { FC } from "react";

import { Header } from "@/components/Header/Header";
import { Balance } from "@/components/Balance/Balance";
import { IncomeExpanses } from "@/components/IncomeExpanses/IncomeExpanses";
import { History } from "@/components/History/History";
import { Transaction } from "@/components/Transaction/Transaction";

import { GlobalProvider } from "@/context/globalState";

import "./Main.css";

export const Main: FC = () => {
  return (
    <>
      <GlobalProvider>
        <div className="container">
          <Header />
          <Balance />
          <IncomeExpanses />
          <History />
          <Transaction />
        </div>
      </GlobalProvider>
    </>
  );
};
