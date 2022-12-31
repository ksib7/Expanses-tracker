import { createContext, useEffect, useReducer, useState } from "react";
import { IntlProvider } from "react-intl";

import { AppReducer } from "./AppReducer";
import Russian from "@/lang/ru.json";
import English from "@/lang/en.json";

const initialState = {
  transactions: [],
};

const local = navigator.language;

let lang;
if (local === "ru-RU") {
  lang = Russian;
} else if (local === "en") {
  lang = English;
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, () => {
    const storage = localStorage.getItem("transaction");
    return storage ? JSON.parse(storage) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("transaction", JSON.stringify(state));
  }, [state]);

  const removeTransaction = (id) => {
    dispatch({
      type: "REMOVE_TRANSACTION",
      payload: id,
    });
  };

  const addTransaction = (transaction) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  };

  const [locale, setLocale] = useState(local);
  const [message, setMessage] = useState(lang);

  const [currency, setCurrency] = useState([]);

  const getCurrency = async () => {
    try {
      const content = await fetch(
        "https://v6.exchangerate-api.com/v6/3ee81f1ffc4ae5158af23335/latest/USD"
      );
      const result = await content.json();
      setCurrency(result);
    } catch (err) {
      console.log(err.name);
    }
  };

  useEffect(() => {
    getCurrency();
  }, [locale]);

  const selectLang = (e) => {
    const newLocale = e.target.value;
    setLocale(newLocale);

    if (newLocale === "en") {
      setMessage(English);
    } else {
      setMessage(Russian);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        removeTransaction,
        addTransaction,
        locale,
        selectLang,
        currency,
      }}
    >
      <IntlProvider locale={locale} messages={message}>
        {children}
      </IntlProvider>
    </GlobalContext.Provider>
  );
};
