import { FC, ComponentPropsWithoutRef } from "react";

import { IAttributeType } from "./InputType";

import "./Input.css";

export const Input: FC<IAttributeType> = ({
  ...props
}: ComponentPropsWithoutRef<"input">) => {
  return <input {...props} />;
};
