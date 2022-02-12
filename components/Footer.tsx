import classNames from "classnames";
import Image from "next/image";
import React from "react";
import styles from "../styles/Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={classNames("container-fluid bg-light p-5 pb-4", styles.Footer)}>
      <div className="row flex-column align-items-center pb-5">
        <Image src="/pokemon.png" alt="LOGO" width={80} height={80} />
        <h1 className="text-primary text-center text-shadow mb-3">Pokemon</h1>
        <p className="text-center">
          This site is just a passion project and not affiliated with Pokemon company.
        </p>
      </div>
      <small className="d-block text-center text-secondary">
        &copy; 2021 Sai Han. All rights reserved.
      </small>
    </footer>
  );
};
