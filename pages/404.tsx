import classNames from "classnames";
import type { NextPage } from "next";
import { PageLayout } from "../components";
import styles from "../styles/NotFound.module.scss";

const NotFound: NextPage = () => {
  return (
    <PageLayout hideFooter notFullHeight>
      <section
        className={classNames(
          styles.NotFound,
          "d-flex flex-column justify-content-center align-items-center",
        )}
      >
        <h1 className={styles.title}>404</h1>
        <h2 className="text-uppercase mt-2">Not Found</h2>
      </section>
    </PageLayout>
  );
};

export default NotFound;
