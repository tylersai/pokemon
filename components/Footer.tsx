import classNames from "classnames";
import React from "react";
import styles from "../styles/Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={classNames("d-flex justify-content-center py-4 py-lg-5", styles.Footer)}>
      <button className="btn btn-primary">
        <i className="bi bi-cart"></i> View Cart
      </button>
    </footer>
  );
};
