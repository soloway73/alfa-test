import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { catsActions, getData } from "../../store/cats.slice";
import { AppDispatch, RootState } from "../../store/store";
import CatListItem from "./CatListItem/CatListItem";
import styles from "./CatList.module.css";

export function CatList() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, items } = useSelector((s: RootState) => s.cats);

  useEffect(() => {
    const abortController = new AbortController();
    if (!items.length) {
      // const cats: ICat[] | undefined = loadState(CATS_PERSISTENT_STATE);
      // if (cats?.length) {
      //   dispatch(catsActions.set(cats));
      // } else {
      dispatch(getData(abortController));
      // }
    }
    return () => {
      abortController.abort("Component unmounted or new request initiated");
    };
  }, [dispatch, items.length]);

  return (
    <div>
      <h1>Коты</h1>
      <button onClick={() => dispatch(catsActions.clean())}>Обновить</button>
      {isLoading && <div>Loading</div>}
      {!isLoading && items.length > 0 && (
        <div className={styles.list}>
          {items.slice(0, 10).map((cat) => (
            <CatListItem key={cat.id} cat={cat} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CatList;
