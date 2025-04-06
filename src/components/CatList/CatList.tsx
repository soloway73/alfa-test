import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { catsActions, getData } from "../../store/cats.slice";
import { AppDispatch, RootState } from "../../store/store";
import CatListItem from "./CatListItem/CatListItem";
import styles from "./CatList.module.css";
import SearchInput from "../SearchInput/SearchInput";
import { Button } from "../Button/Button";
import { Pagination, Stack } from "@mui/material";

export function CatList() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, items } = useSelector((s: RootState) => s.cats);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const itemsPerPage = 10;

  const filteredItems = useMemo(() => {
    return items?.filter((cat) => cat?.breeds[0]?.name?.includes(search));
  }, [items, search]);

  const pageCount = useMemo(() => {
    const result = Math.ceil(filteredItems?.length / itemsPerPage);
    if (page > result && result > 0) {
      setPage(result);
    }
    return result;
  }, [filteredItems?.length, page]);

  const slicedItems = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems?.slice(startIndex, endIndex);
  }, [filteredItems, page]);

  const catList = useMemo(() => {
    return slicedItems?.map((cat) => <CatListItem key={cat.id} cat={cat} />);
  }, [slicedItems]);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (!items.length) {
      dispatch(getData(abortController));
    }
    return () => {
      abortController.abort("Component unmounted or new request initiated");
    };
  }, [dispatch, items.length]);

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
        <>
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent={"center"}
            mt={2}
          >
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChange}
              variant="outlined"
              shape="rounded"
              size="large"
              showFirstButton
              showLastButton
              className={styles.pagination}
            />
          </Stack>
          <div className={styles.list}>{catList}</div>
        </>
      )}
    </div>
  );
}

export default CatList;
