import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import cn from "classnames";
export function Header() {
  return (
    <div className={styles.header}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          cn(styles.link, { [styles.active]: isActive })
        }
      >
        Главная
      </NavLink>
      <NavLink
        to="/favorite"
        className={({ isActive }) =>
          cn(styles.link, { [styles.active]: isActive })
        }
      >
        Избранное
      </NavLink>
    </div>
  );
}
