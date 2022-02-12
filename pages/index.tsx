import type { NextPage } from "next";
import Image from "next/image";
import { PageLayout } from "../components";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <PageLayout>
      <section className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Image src="/pokemon.png" width={180} height={180} alt="Pokemon" />
        <h1 className="text-center mt-4">
          <i className="bi bi-triangle-half"></i> Welcome to Pokemon site!
        </h1>
      </section>
    </PageLayout>
  );
};

export default Home;
