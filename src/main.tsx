import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, defer, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout/Layout.tsx";
import "./index.css";
import { store } from "./store/store.ts";
import { CatPage } from "./Pages/CatPage/CatPage.tsx";
import axios from "axios";

const CatList = lazy(() => import("./components/CatList/CatList"));
// const PREFIX =
//   "https://api.thecatapi.com/v1/images/search?api_key=live_iXt581Pzo7rOnpLSmJMXSIYk9wqF12BJOK8qNUFoZRJReXl5KjFo9qRrAPUv2Tvm&id=EHG3sOpAM";

const apiKey =
  "live_iXt581Pzo7rOnpLSmJMXSIYk9wqF12BJOK8qNUFoZRJReXl5KjFo9qRrAPUv2Tvm";
// const imageId = "EHG3sOpAM";

const url = `https://api.thecatapi.com/v1/images/`;

// axios
//   .get(url, {
//     headers: {
//       "x-api-key": apiKey,
//     },
//   })
//   .then((response) => {
//     console.log("Результат:", response.data);
//   })
//   .catch((error) => {
//     console.error(
//       "Ошибка при выполнении запроса:",
//       error.response ? error.response.data : error.message
//     );
//   });

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<div>Loading</div>}>
              <CatList />
            </Suspense>
          ),
        },
        {
          path: "/cats/:id",
          element: <CatPage />,
          errorElement: <>Ошибка</>,
          loader: async ({ params }) => {
            return defer({
              data: new Promise((resolve, reject) => {
                setTimeout(() => {
                  axios
                    .get(url + `${params.id}`, {
                      headers: {
                        "x-api-key": apiKey,
                      },
                    })
                    .then((data) => resolve(data))
                    .catch((e) => reject(e));
                }, 2000);
              }),
            });
          },
        },
      ],
    },
    {
      path: "*",
      element: <div>404</div>,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider
        future={{
          v7_startTransition: true,
        }}
        router={router}
      />
    </Provider>
  </StrictMode>
);
