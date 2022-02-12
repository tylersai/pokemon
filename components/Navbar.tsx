import Image from "next/image";
import { FC } from "react";
import classNames from "classnames";
import styles from "../styles/Navbar.module.scss";
import Link from "next/link";

export const Navbar: FC = () => {
  return (
    <header
      className={classNames(styles.Navbar, "d-flex align-items-center justify-content-between")}
    >
      <div className="d-flex align-items-center">
        <Link href="/">
          <a className="text-decoration-none">
            <Image src="/pokemon.png" alt="Logo" role="img" width={46} height={46} />
          </a>
        </Link>

        <Link href="/">
          <a className="text-decoration-none">
            <h1 className="mb-0 mt-1 ms-3 ms-lg-4 text-primary">Pokemon</h1>
          </a>
        </Link>
      </div>
      <button className={styles.menuButton}>
        <i className="bi bi-list"></i>
      </button>
    </header>
  );
};
