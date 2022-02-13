import "../styles/bootstrap-custom.scss";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import DataContext from "../context/DataContext";
import { useState } from "react";
import { PokemonCardModel } from "../components";

const PokemonApp = ({ Component, pageProps }: AppProps) => {
  const [cartItems, setCartItems] = useState<PokemonCardModel[]>([]);

  return (
    <DataContext.Provider value={{ cartItems, setCartItems }}>
      <Component {...pageProps} />
    </DataContext.Provider>
  );
};

export default PokemonApp;
