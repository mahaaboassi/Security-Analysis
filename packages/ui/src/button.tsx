"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  appName: string;
}

export const Button = ({ children, appName, ...props }: ButtonProps) => {
  return (
    <button{...props}  >
      {children}
    </button>
  );
};
