import cn from "classnames";
import { ICat } from "../../interfaces/cat.interface";
import { Button } from "../Button/Button";
import styles from "./Form.module.css";
import { useCallback, useState } from "react";

export interface FormProps {
  className?: string;
  cancelHandler?: (e: React.MouseEvent) => void;
  saveHandler?: (catValues: IFormCat) => void;
  cat: ICat;
}

interface Errors {
  name?: string;
  origin?: string;
  description?: string;
  temperament?: string;
  url?: string;
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
  cat,
  cancelHandler = () => {},
  saveHandler,
}: FormProps) {
  const [catValues, setCatValues] = useState<IFormCat>({
    id: cat.id,
    name: cat.breeds[0].name,
    origin: cat.breeds[0].origin,
    description: cat.breeds[0].description,
    temperament: cat.breeds[0].temperament,
    url: cat.url,
  });
  const { url, name, origin, description, temperament } = catValues;
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const validate = useCallback((): boolean => {
    const newErrors: Errors = {};
    const urlPattern = /^(https?:\/\/)[\w-]+(\.[\w-]+)+[#?]?.*$/i;
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];

    // Валидация имени
    if (!catValues.name.trim()) {
      newErrors.name = "Введите имя";
    }

    if (!catValues.origin.trim()) {
      newErrors.origin = "Введите страну";
    }

    if (!catValues.description.trim()) {
      newErrors.description = "Введите описание";
    }

    if (!catValues.temperament.trim()) {
      newErrors.temperament = "Введите особенности характера";
    }

    // Валидация URL изображения
    const url = catValues.url.trim();
    if (!url) {
      newErrors.url = "URL изображения обязателен";
    } else {
      if (!urlPattern.test(url)) {
        newErrors.url = "Некорректный URL";
      } else {
        const extension = url.split(".").pop()?.toLowerCase();
        if (!extension || !imageExtensions.includes(extension)) {
          newErrors.url = `Поддерживаются: ${imageExtensions.join(", ")}`;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [catValues]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitSuccess(false);

      if (validate()) {
        saveHandler?.(catValues);
        setCatValues({
          name: "",
          origin: "",
          description: "",
          temperament: "",
          url: "",
          id: "",
        });
        setErrors({});
        setSubmitSuccess(true);
      }
    },
    [catValues, saveHandler, validate]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCatValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Сброс ошибки при вводе
      if (errors[name as keyof Errors]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    },
    [errors]
  );

  return (
    <form className={cn(styles.form, className)} onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        {submitSuccess && (
          <p className="success-message">Форма успешно отправлена!</p>
        )}
        <label className={styles.label}>
          Порода
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => handleChange(e)}
            className={cn(styles.input, { [styles.error]: errors.name })}
          />
          {errors.name && (
            <span className={styles.errorMessage}>{errors.name}</span>
          )}
        </label>
        <label className={styles.label}>
          Страна
          <input
            type="text"
            name="origin"
            value={origin}
            onChange={(e) => handleChange(e)}
            className={cn(styles.input, { [styles.error]: errors.origin })}
          />
          {errors.origin && (
            <span className={styles.errorMessage}>{errors.origin}</span>
          )}
        </label>
        <label className={styles.label}>
          Описание
          <input
            name="description"
            value={description}
            onChange={(e) => handleChange(e)}
            className={cn(styles.input, { [styles.error]: errors.description })}
          />
          {errors.description && (
            <span className={styles.errorMessage}>{errors.description}</span>
          )}
        </label>
        <label className={styles.label}>
          Особенности
          <input
            type="text"
            name="temperament"
            value={temperament}
            onChange={(e) => handleChange(e)}
            className={cn(styles.input, { [styles.error]: errors.temperament })}
          />
          {errors.temperament && (
            <span className={styles.errorMessage}>{errors.temperament}</span>
          )}
        </label>
        <label className={styles.label}>
          Ссылка на фото
          <input
            type="url"
            name="url"
            value={url}
            onChange={(e) => handleChange(e)}
            className={cn(styles.input, { [styles.error]: errors.url })}
          />
          {errors.url && (
            <span className={styles.errorMessage}>{errors.url}</span>
          )}
        </label>
        <div className={styles.buttons}>
          <Button className={styles.buttonCancel} onClick={cancelHandler}>
            Отмена
          </Button>
          <Button className={styles.buttonSave} type="submit">
            Сохранить
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Form;
