import { InputHTMLAttributes } from "react";
import styles from "./SearchInput.module.css";
import cn from "classnames";
import SearchIcon from "../../assets/search-icon.svg?react";

export interface SearchInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
export function SearchInput({
  className,
  value,
  onChange,
  placeholder,
  ...props
}: SearchInputProps) {
  return (
    <div className={cn(styles.container, className)}>
      <SearchIcon className={styles.icon} />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

export default SearchInput;
