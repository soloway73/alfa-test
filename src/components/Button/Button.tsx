import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";
import cn from "classnames";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <>
      <button
        className={cn(
          styles.buttonContainer,
          styles.btn,
          styles.btnWhite,
          styles.btnAnimated,
          className
        )}
        {...props}
      >
        {children}
      </button>
    </>
  );
}
