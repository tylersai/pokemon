import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import classNames from "classnames";
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React, {
  Dispatch,
  FC,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Cart,
  Filter,
  OnSelectHandlerType,
  PageLayout,
  PokemonCard,
  PokemonCardModel,
} from "../components";
import DataContext from "../context/DataContext";
import styles from "../styles/Home.module.scss";

const defaultPageSize = 12;

export const fetchCards = async (
  baseUrl: string | undefined = process.env.POKEMON_API_URL,
  apiKey: string | undefined = process.env.POKEMON_API_KEY,
  page: number = 1,
  name = "",
  cardType = "",
  rarity = "",
  cardSet = "",
): Promise<{ data?: any; error?: any }> => {
  const reqOpt: AxiosRequestConfig = {
    headers: {
      "X-Api-Key": apiKey as string,
    },
  };

  let url: string = `${baseUrl}/cards?pageSize=${defaultPageSize}&page=${page}`;

  let filter: string[] = [];
  if (name && name.trim()) {
    filter.push(`name:"*${name}*"`);
  }
  if (cardType) {
    filter.push(`type:"${cardType}"`);
  }
  if (rarity) {
    filter.push(`rarity:"${rarity}"`);
  }
  if (cardSet) {
    filter.push(`set.id:"${cardSet}"`);
  }

  if (filter.length > 0) {
    url = url + "&q=" + filter.join(" ");
  }

  try {
    const { data: pageData } = await axios.get(url, reqOpt);
    return { data: pageData.data };
  } catch (err: any) {
    return {
      error: err.response
        ? JSON.parse(JSON.stringify(err.response))
        : { status: err.status || 500, message: err.message || "Unknown error occurred" },
    };
  }
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await fetchCards();
  return {
    props: {
      ...res,
      baseUrl: process.env.POKEMON_API_URL || null,
      apiKey: process.env.POKEMON_API_KEY || null,
    },
  };
};

const NoDataAlert: FC = () => (
  <div className={classNames(styles.HomePage, "row justify-content-center")}>
    <div className="col-10 col-sm-6 col-lg-4">
      <div className="alert alert-warning text-center">No pokemon cards data</div>
    </div>
  </div>
);

const ErrorAlert: FC = () => (
  <div className={classNames(styles.HomePage, "row justify-content-center")}>
    <div className="col-10 col-sm-8 col-md-6 col-lg-4">
      <div className="alert alert-danger text-center">
        Error! Unable to fetch pokemon cards data. Try again.
      </div>
    </div>
  </div>
);

interface HomePageProps {
  data?: any[] | undefined;
  error?: AxiosResponse | undefined;
  baseUrl: string;
  apiKey: string;
}

const Home: NextPage<HomePageProps> = ({ data, error, baseUrl, apiKey }) => {
  const { cartItems, setCartItems } = useContext(DataContext);

  const [isInit, setIsInit] = useState<boolean>(true);
  const [isAppend, setIsAppend] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cards, setCards] = useState<any[] | undefined>(data);
  const [cardsError, setCardsError] = useState<AxiosResponse | undefined>(error);

  const [name, setName] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardSet, setCardSet] = useState("");
  const [rarity, setRarity] = useState("");

  useEffect(() => {
    if (!isInit) {
      setLoading(true);
      fetchCards(baseUrl, apiKey, currentPage, name, cardType, rarity, cardSet)
        .then((res) => {
          setLoading(false);
          if (res.error) {
            setCardsError(res.error);
          } else {
            if (isAppend) {
              setCards((old) => [...(old || []), ...res.data]);
            } else {
              setCards(res.data);
            }
          }
        })
        .catch((err) => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl, apiKey, currentPage, name, cardType, rarity, cardSet]);

  useEffect(() => {
    setIsInit(false);
  }, []);

  const loadMore = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    setIsAppend(true);
    setCurrentPage((old) => old + 1);
  }, []);

  const onCardSelect: OnSelectHandlerType = useCallback<OnSelectHandlerType>(
    (crd, selectType) => {
      if (selectType === "select") {
        setCartItems((old: PokemonCardModel[]) => [...old, { ...crd, count: 1 }]);
      } else {
        setCartItems((old: PokemonCardModel[]) => old.filter((el) => el.id !== crd.id));
      }
    },
    [setCartItems],
  );

  return (
    <PageLayout hideFooter={Boolean(cardsError)}>
      <Cart />
      {!cardsError ? (
        cards ? (
          <div className={classNames(styles.HomePage, styles.limitHeight)}>
            <Filter
              name={name}
              setName={setName}
              cardType={cardType}
              setCardType={setCardType}
              cardSet={cardSet}
              setCardSet={setCardSet}
              rarity={rarity}
              setRarity={setRarity}
              baseUrl={baseUrl}
              apiKey={apiKey}
              setIsAppend={setIsAppend}
              setCurrentPage={setCurrentPage}
            />
            {cards.length > 0 ? (
              <>
                <div className={classNames("row justify-content-evenly px-lg-5")}>
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
                        price={
                          card.cardmarket.prices.suggestedPrice ||
                          card.cardmarket.prices.averageSellPrice ||
                          card.cardmarket.prices.trendPrice ||
                          card.cardmarket.prices.avg1 ||
                          card.cardmarket.prices.lowPrice ||
                          0
                        }
                        total={card.set.total}
                        selected={Boolean(cartItems.find((el) => el.id === card.id))}
                        onSelect={onCardSelect}
                      />
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn letter-spacing-1" onClick={loadMore} disabled={loading}>
                    {loading && isAppend ? (
                      <div
                        className="spinner-grow text-secondary spinner-grow-sm me-2"
                        role="status"
                      ></div>
                    ) : (
                      <i className="bi bi-arrow-down me-2"></i>
                    )}
                    {loading && isAppend ? "Loading..." : "Load More"}
                  </button>
                </div>
              </>
            ) : (
              <NoDataAlert />
            )}
          </div>
        ) : (
          <NoDataAlert />
        )
      ) : (
        <ErrorAlert />
      )}
    </PageLayout>
  );
};

export default Home;
