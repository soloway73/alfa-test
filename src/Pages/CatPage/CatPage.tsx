import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BackBtn from "../../assets/backBtn.svg?react";
import Heart from "../../assets/Heart.svg?react";
import { Button } from "../../components/Button/Button";
import { catsActions } from "../../store/cats.slice";
import { AppDispatch, RootState } from "../../store/store";
import styles from "./CatPage.module.css";
import { useMemo, useState } from "react";
import PenIcon from "../../assets/pen-icon.svg?react";
import Form, { IFormCat } from "../../components/Form/Form";
import { ICat } from "../../interfaces/cat.interface";

export function CatPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((s: RootState) => s.cats);
  const { id } = useParams();
  const cat = useMemo(
    () => items.find((i) => i.id === id),
    [id, items]
  ) as ICat;
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const editHandler = () => {
    console.log("isFormVisible :>> ", isFormVisible);
    setIsFormVisible(true);
  };

  const likeHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (cat?.id) {
      dispatch(catsActions.like(cat.id));
    }
  };

  const cancelHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFormVisible(false);
  };

  const saveHandler = (catValues: IFormCat) => {
    catsActions.edit(catValues);
    setIsFormVisible(false);
  };

  return (
    <>
      {isFormVisible && (
        <Form
          className={cn({ [styles.formActive]: isFormVisible })}
          cat={cat}
          cancelHandler={cancelHandler}
          saveHandler={saveHandler}
        />
      )}
      <div className={styles.head}>
        <Button className={styles.altBackBtn} onClick={() => navigate("/")}>
          <BackBtn /> Назад
        </Button>
        <Button className={styles.edit} onClick={editHandler}>
          <PenIcon /> Редактировать
        </Button>
        <div className={styles.like} onClick={likeHandler}>
          <Heart
            className={cn(styles.heart, {
              [styles.liked]: cat?.isLiked,
            })}
          />
        </div>
      </div>
      <h1>{cat?.breeds[0].name}</h1>
      <h2>Страна: {cat?.breeds[0].origin}</h2>
      <div className={styles.content}>
        <img
          className={styles.image}
          src={cat?.url}
          alt="Изображение продукта"
        />
        <div className={styles.description}>
          <p>{cat?.breeds[0].description}</p>
          <p>Особенности: {cat?.breeds[0].temperament}</p>
        </div>
      </div>
    </>
  );
}
