import { ICat } from "../../../interfaces/cat.interface";
import styles from "./CatListItem.module.css";
import Heart from "../../../assets/Heart.svg?react";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { catsActions } from "../../../store/cats.slice";
import RemoveIcon from "../../../assets/Remove-icon.svg?react";
import { useNavigate } from "react-router-dom";

export function CatListItem({ cat }: { cat: ICat }) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const likeHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(catsActions.like(cat.id));
  };

  const removeHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(catsActions.delete(cat.id));
  };

  const handlerCardClick = () => {
    navigate(`/cats/${cat.id}`);
  };
  return (
    <div className={styles.card} onClick={handlerCardClick}>
      <img className={styles.img} src={cat.url} alt={cat.breeds[0].name} />
      <h3 className={styles.name}>{cat.breeds[0].name}</h3>
      <div className={styles.description}>{cat.breeds[0].description}</div>
      <div className={styles.like} onClick={likeHandler}>
        <Heart className={cn(styles.heart, { [styles.liked]: cat.isLiked })} />
      </div>
      <div className={styles.remove} onClick={removeHandler}>
        <RemoveIcon />
      </div>
    </div>
  );
}

export default CatListItem;
