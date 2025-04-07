import cn from "classnames";
import { ICat } from "../../interfaces/cat.interface";
import { Button } from "../Button/Button";
import styles from "./Form.module.css";
import { useState } from "react";

export interface FormProps {
  className?: string;
  cancelHandler?: (e: React.MouseEvent) => void;
  saveHandler?: (catValues: IFormCat) => void;
  cat: ICat;
}

export interface IFormCat {
  id: string;
  name: string;
  origin: string;
  description: string;
  temperament: string;
  url: string;
}
export function Form({
  className = "",
  cat = {} as ICat,
  cancelHandler = () => {},
  saveHandler,
}: FormProps) {
  // const INITIAL_STATE: IFormCat = {
  //   id: cat.id,
  //   name: cat.breeds[0].name,
  //   origin: cat.breeds[0].origin,
  //   description: cat.breeds[0].description,
  //   temperament: cat.breeds[0].temperament,
  //   url: cat.url,
  // };

  const [catValues, setCatValues] = useState<IFormCat>({
    id: cat.id,
    name: cat.breeds[0].name,
    origin: cat.breeds[0].origin,
    description: cat.breeds[0].description,
    temperament: cat.breeds[0].temperament,
    url: cat.url,
  });
  const { url, name, origin, description, temperament } = catValues;

  return (
    <form className={cn(styles.form, className)}>
      <label className={styles.label}>
        Порода
        <input
          type="text"
          value={name}
          onChange={(e) =>
            setCatValues({
              ...catValues,
              name: e.target.value,
            })
          }
        />
      </label>
      <label className={styles.label}>
        Страна
        <input
          type="text"
          value={origin}
          onChange={(e) =>
            setCatValues({
              ...catValues,
              origin: e.target.value,
            })
          }
        />
      </label>
      <label className={styles.label}>
        Описание
        <input
          type="text"
          value={description}
          onChange={(e) =>
            setCatValues({
              ...catValues,
              description: e.target.value,
            })
          }
        />
      </label>
      <label className={styles.label}>
        Особенности
        <input
          type="text"
          value={temperament}
          onChange={(e) =>
            setCatValues({
              ...catValues,
              temperament: e.target.value,
            })
          }
        />
      </label>
      <label className={styles.label}>
        Ссылка на фото
        <input
          type="text"
          value={url}
          onChange={(e) => setCatValues({ ...catValues, url: e.target.value })}
        />
      </label>
      <div className={styles.buttons}>
        <Button className={styles.buttonCancel} onClick={cancelHandler}>
          Отмена
        </Button>
        <Button
          className={styles.buttonSave}
          onClick={() => saveHandler?.(catValues)}
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
}

export default Form;
