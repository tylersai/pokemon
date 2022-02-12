import classNames from "classnames";
import React from "react";
import styles from "../styles/Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer
      className={classNames("d-flex justify-content-center pb-4 pb-lg-5 pt-4", styles.Footer)}
    >
      <button className="btn btn-primary">
        <i className="bi bi-cart"></i> View Cart
      </button>
    </footer>
  );
};
