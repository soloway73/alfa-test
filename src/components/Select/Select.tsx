import styles from "./Select.module.css";

export interface ICitySelectProps {
  value: string;
  setValue: (value: string) => void;
  items: string[];
}

export function Select({ value, setValue, items }: ICitySelectProps) {
  const handler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return (
    <label className={styles.label}>
      <select value={value} onChange={handler} className={styles.select}>
        <option value={""}>Выберите страну</option>
        {items.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Select;
