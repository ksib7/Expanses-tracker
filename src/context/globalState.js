import { createContext, useEffect, useReducer } from "react";
import { AppReducer } from "./AppReducer";

const initialState = {
  transactions: [],
};

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

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        removeTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
