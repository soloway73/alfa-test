import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { ICat } from "../../interfaces/cat.interface";
import styles from "./CatPage.module.css";
import { Suspense } from "react";
import { Button } from "../../components/Button/Button";

export function CatPage() {
  const data = useLoaderData() as { data: ICat };
  const navigate = useNavigate();
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Await resolve={data.data}>
          {({ data }: { data: ICat }) => (
            <>
              <div className={styles.head}>
                <Button
                  className={styles.altBackBtn}
                  onClick={() => navigate("/")}
                >
                  <img src="/backBtn.svg" alt="Назад" /> Назад
                </Button>
                <h1>{data.breeds[0].name}</h1>
              </div>
              <div className={styles.product}>
                <img
                  className={styles.image}
                  src={data.url}
                  alt="Изображение продукта"
                />
                <div className={styles.description}>
                  <p>{data.breeds[0].description}</p>
                  <Button>Добавить в избранное</Button>
                </div>
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}
