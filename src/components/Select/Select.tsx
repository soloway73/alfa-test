export interface ICitySelectProps {
  value: string;
  setValue: (value: string) => void;
  items: string[];
}

export function Select({ value, setValue, items }: ICitySelectProps) {
  const handler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("e :>> ", e.target.value);
    setValue(e.target.value);
  };

  return (
    <label>
      Страна
      <select value={value} onChange={handler}>
        <option value={""}>Все</option>
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
