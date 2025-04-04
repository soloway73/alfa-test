import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout/Layout.tsx";
import "./index.css";
import { store } from "./store/store.ts";

const CatList = lazy(() => import("./components/CatList/CatList"));

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
          path: "/product/:id",
          element: <div>123</div>,
          errorElement: <>Ошибка</>,
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
