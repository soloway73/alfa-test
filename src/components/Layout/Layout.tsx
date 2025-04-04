import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export function Layout() {
  useEffect(() => {}, []);

  return (
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  );
}
