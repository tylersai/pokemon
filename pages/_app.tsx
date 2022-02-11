import "../styles/bootstrap-custom.scss";
import "../styles/globals.scss";
import type { AppProps } from "next/app";

const PokemonApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default PokemonApp;
