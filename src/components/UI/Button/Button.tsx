import { FC, ComponentPropsWithoutRef } from "react";

import { IButtonType } from "./ButtonType";

import "./Button.css";

export const Button: FC<IButtonType> = ({
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) => {
  return (
    <button className="btn" {...props}>
      {children}
    </button>
  );
};
