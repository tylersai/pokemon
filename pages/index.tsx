import axios, { AxiosResponse } from "axios";
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useState } from "react";
import { PageLayout, PokemonCard } from "../components";
import styles from "../styles/Home.module.scss";

const defPageSize = 12;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { data: pageData } = await axios.get(
      `${process.env.POKEMON_API_URL}/cards?pageSize=${defPageSize}`,
      {
        headers: {
          "X-Api-Key": process.env.POKEMON_API_KEY as string,
        },
      },
    );
    return {
      props: { data: pageData.data },
    };
  } catch (err: any) {
    return {
      props: { error: JSON.parse(JSON.stringify(err.response)) },
    };
  }
};

interface HomePageProps {
  data?: any[] | undefined;
  error?: AxiosResponse | undefined;
}

const Home: NextPage<HomePageProps> = ({ data, error }) => {
  const [cards, setCards] = useState<any[] | undefined>(data);
  const [cardsError, setCardsError] = useState<AxiosResponse | undefined>(error);

  return (
    <PageLayout>
      {!cardsError ? (
        cards && cards.length > 0 ? (
          <div className="row justify-content-evenly py-5">
            {cards.map((card: any) => (
              <div
                key={card.id}
                className="col-11 col-sm-5 col-md-4 d-flex justify-content-center my-4"
              >
                <PokemonCard
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
        ) : (
          <div className="row justify-content-center py-5">
            <div className="col-10 col-sm-6 col-lg-4">
              <div className="alert alert-warning">No pokemon cards data</div>
            </div>
          </div>
        )
      ) : (
        <div className="row justify-content-center py-5">
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
