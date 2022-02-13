import React, { Dispatch, SetStateAction } from "react";
import { PokemonCardModel } from "../components";

export interface DataContextType<T = PokemonCardModel> {
  cartItems: T[];
  setCartItems: Dispatch<SetStateAction<T[]>>;
  openCart: boolean;
  setOpenCart: Dispatch<SetStateAction<boolean>>;
}

const DataContext = React.createContext<DataContextType>({
  cartItems: [],
  setCartItems: () => {},
  openCart: false,
  setOpenCart: () => {},
});

export default DataContext;
