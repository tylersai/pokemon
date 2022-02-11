import type { NextPage } from "next";
import Image from "next/image";
import { PageLayout } from "../components";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <PageLayout className="HomePage">
      <div className={styles.container}>
        <div className={styles.main}>
          <Image src="/pokemon.png" width={180} height={180} alt="Pokemon" />
          <h1 className={styles.title}>
            <i className="bi bi-triangle-half"></i> Welcome to Pokemon site!
          </h1>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
