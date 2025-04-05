import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { catsActions, getData } from "../../store/cats.slice";
import { AppDispatch, RootState } from "../../store/store";
import CatListItem from "./CatListItem/CatListItem";
import styles from "./CatList.module.css";
import SearchInput from "../SearchInput/SearchInput";
import { Button } from "../Button/Button";

export function CatList() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, items } = useSelector((s: RootState) => s.cats);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    if (!items.length) {
      dispatch(getData(abortController));
    }
    return () => {
      abortController.abort("Component unmounted or new request initiated");
    };
  }, [dispatch, items.length]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredItems = items?.filter((cat) =>
    cat.breeds[0].name.includes(search)
  );

  return (
    <div className={styles.catList}>
      <div className={styles.controls}>
        <Button
          onClick={() => dispatch(catsActions.clean())}
          className={styles.refresh}
        >
          Обновить
        </Button>
        <SearchInput
          className={styles.searchInput}
          placeholder="Введите породу"
          onChange={onChangeHandler}
          value={search}
        />
      </div>
      <h1>Коты</h1>
      {isLoading && <div>Loading</div>}
      {!isLoading && items.length > 0 && (
        <div className={styles.list}>
          {filteredItems.slice(0, 10).map((cat) => (
            <CatListItem key={cat.id} cat={cat} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CatList;
