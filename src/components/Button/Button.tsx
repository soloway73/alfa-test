import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <div className={styles.buttonContainer}>
      <button
        className={classNames(
          styles.btn,
          styles.btnWhite,
          styles.btnAnimated,
          className
        )}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}
