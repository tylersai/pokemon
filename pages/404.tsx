import type { NextPage } from "next";
import { PageLayout } from "../components";
import styles from "../styles/NotFound.module.scss";

const NotFound: NextPage = () => {
  return (
    <PageLayout>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>404</h1>
          <h1 className={styles.title}>Not Found</h1>
        </main>
      </div>
    </PageLayout>
  );
};

export default NotFound;
