import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { catsActions, getData } from "../../store/cats.slice";
import { AppDispatch, RootState } from "../../store/store";
import CatListItem from "./CatListItem/CatListItem";
import styles from "./CatList.module.css";
import SearchInput from "../SearchInput/SearchInput";
import { Button } from "../Button/Button";
import { Pagination, Stack } from "@mui/material";
import { Checkbox } from "../Checkbox/Checkbox";
import Form, { IFormCat } from "../Form/Form";
import cn from "classnames";
import { ICat } from "../../interfaces/cat.interface";
import { Loading } from "../Loading/Loading";

const catEmptyForm: ICat = {
  id: Date.now().toLocaleString(),
  url: "",
  breeds: [
    {
      name: "",
      description: "",
      temperament: "",
      origin: "",
    },
  ],
};

export function CatList() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, items } = useSelector((s: RootState) => s.cats);
  const [search, setSearch] = useState<string>("");
  const [isLikedFilter, setIsLikedFilter] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const itemsPerPage = 10;

  // const filteredItems = useMemo(() => {
  //   return items?.filter((cat) => cat?.breeds[0]?.name?.includes(search));
  // }, [items, search]);

  const filteredItems = useMemo(() => {
    let result = items;

    if (isLikedFilter) {
      result = result?.filter(
        (cat) => cat?.isLiked && cat?.breeds[0]?.name?.includes(search)
      );
    } else {
      result = result?.filter((cat) => cat?.breeds[0]?.name?.includes(search));
    }

    return result;
  }, [items, search, isLikedFilter]);

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

  const cancelHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFormVisible(false);
  };

  const saveHandler = (catValues: IFormCat) => {
    dispatch(catsActions.add(catValues));
    setIsFormVisible(false);
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
      {isFormVisible && (
        <Form
          cat={catEmptyForm}
          className={cn({ [styles.formActive]: isFormVisible })}
          cancelHandler={cancelHandler}
          saveHandler={saveHandler}
        />
      )}
      <div className={styles.controls}>
        <Button
          onClick={() => dispatch(catsActions.clean())}
          className={styles.refresh}
        >
          Обновить
        </Button>
        <Button
          className={styles.createBtn}
          onClick={() => setIsFormVisible(true)}
        >
          Создать
        </Button>
        <SearchInput
          className={styles.searchInput}
          placeholder="Введите породу"
          onChange={onChangeHandler}
          value={search}
        />
        <div className={styles.filter}>
          <Checkbox
            className={styles.checkbox}
            checked={isLikedFilter}
            onChange={(e) => setIsLikedFilter(e.target.checked)}
          >
            Только избранные
          </Checkbox>
        </div>
      </div>
      <h1>Коты</h1>
      {isLoading && <Loading />}
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
