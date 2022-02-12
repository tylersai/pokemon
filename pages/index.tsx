import axios, { AxiosResponse } from "axios";
import classNames from "classnames";
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React, { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { PageLayout, PokemonCard } from "../components";
import styles from "../styles/Home.module.scss";

export const fetchCards = async (
  baseUrl: string | undefined = process.env.POKEMON_API_URL,
  page: number = 1,
  pageSize: number = 12,
): Promise<{ data?: any; error?: any }> => {
  try {
    const { data: pageData } = await axios.get(
      `${baseUrl}/cards?pageSize=${pageSize}&page=${page}`,
      {
        headers: {
          "X-Api-Key": process.env.POKEMON_API_KEY as string,
        },
      },
    );
    return { data: pageData.data };
  } catch (err: any) {
    return { error: JSON.parse(JSON.stringify(err.response)) };
  }
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await fetchCards();
  return {
    props: { ...res, baseUrl: process.env.POKEMON_API_URL },
  };
};

interface HomePageProps {
  data?: any[] | undefined;
  error?: AxiosResponse | undefined;
  baseUrl: string;
}

const Home: NextPage<HomePageProps> = ({ data, error, baseUrl }) => {
  const [isInit, setIsInit] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cards, setCards] = useState<any[] | undefined>(data);
  const [cardsError, setCardsError] = useState<AxiosResponse | undefined>(error);

  useEffect(() => {
    if (!isInit) {
      fetchCards(baseUrl, currentPage).then((res) => {
        if (res.error) {
          setCardsError(res.error);
        } else {
          setCards((old) => [...(old || []), ...res.data]);
        }
      });
    }
  }, [baseUrl, currentPage, isInit]);

  const loadMore = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    setIsInit(false);
    setCurrentPage((old) => old + 1);
  }, []);

  return (
    <PageLayout hideFooter={Boolean(cardsError)}>
      {!cardsError ? (
        cards && cards.length > 0 ? (
          <div className={styles.HomePage}>
            <div className={classNames("row justify-content-evenly")}>
              {cards.map((card: any) => (
                <div
                  key={card.id}
                  className="col-11 col-sm-5 col-md-4 d-flex justify-content-center my-4"
                >
                  <PokemonCard
                    className="my-2"
                    id={card.id}
                    image={card.images}
                    name={card.name}
                    rarity={card.rarity}
                    price={card.cardmarket.prices.averageSellPrice}
                    total={card.set.total}
                  />
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn" onClick={loadMore}>
                <i className="bi bi-search me-2"></i>Load More
              </button>
            </div>
          </div>
        ) : (
          <div className={classNames(styles.HomePage, "row justify-content-center")}>
            <div className="col-10 col-sm-6 col-lg-4">
              <div className="alert alert-warning">No pokemon cards data</div>
            </div>
          </div>
        )
      ) : (
        <div className={classNames(styles.HomePage, "row justify-content-center")}>
          <div className="col-10 col-sm-8 col-md-6 col-lg-4">
            <div className="alert alert-danger">
              Error! Unable to fetch pokemon cards data. Try again.
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Home;
