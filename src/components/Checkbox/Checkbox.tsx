import styles from "./Checkbox.module.css";
import cn from "classnames";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  className: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
}

export function Checkbox({ children, className, ...props }: CheckboxProps) {
  return (
    <label className={cn(styles.label, className)}>
      <input type="checkbox" className={styles.input} {...props} />
      {children}
    </label>
  );
}
