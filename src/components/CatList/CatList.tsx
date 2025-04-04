import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { catsActions, getData } from "../../store/cats.slice";
import { AppDispatch, RootState } from "../../store/store";
import CatListItem from "./CatListItem/CatListItem";

export function CatList() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, items } = useSelector((s: RootState) => s.cats);

  useEffect(() => {
    if (!items.length) {
      dispatch(getData());
    }
  }, [dispatch, items.length]);

  return (
    <div>
      <h1>Коты</h1>
      <button onClick={() => dispatch(catsActions.clean())}>Обновить</button>
      {isLoading && <div>Loading</div>}
      {!isLoading &&
        items.slice(0, 10).map((cat) => <CatListItem key={cat.id} cat={cat} />)}
    </div>
  );
}

export default CatList;
