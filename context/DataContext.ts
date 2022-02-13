import React, { Dispatch, SetStateAction } from "react";
import { PokemonCardModel } from "../components";

export interface DataContextType<T = PokemonCardModel> {
  cartItems: T[];
  setCartItems: Dispatch<SetStateAction<T[]>>;
}

const DataContext = React.createContext<DataContextType>({
  cartItems: [],
  setCartItems: () => {},
});

export default DataContext;
