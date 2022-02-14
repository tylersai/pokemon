import Image from "next/image";
import { FC } from "react";
import classNames from "classnames";
import styles from "../styles/Navbar.module.scss";

export const Navbar: FC<{ loading?: boolean | undefined }> = ({ loading }) => {
  return (
    <header
      className={classNames(
        styles.Navbar,
        "d-flex bg-white align-items-center justify-content-center py-4",
      )}
    >
      <div className="d-flex flex-column align-items-center position-relative">
        <h1 className="my-0">TCG Marketplace</h1>
        <div
          className={classNames(
            styles.logoWrapper,
            loading && styles.logoWrapperLoading,
            "position-absolute d-flex bg-white align-items-center justify-content-center p-3",
          )}
        >
          <Image src="/pokemon.png" alt="Logo" width={42} height={42} />
        </div>
      </div>
    </header>
  );
};
