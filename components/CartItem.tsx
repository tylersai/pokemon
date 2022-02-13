import classNames from "classnames";
import Image from "next/image";
import React, { FC } from "react";
import { PokemonCardModel } from ".";
import { formatMoney } from "../utils/functions";
import styles from "../styles/CartItem.module.scss";

export const CartItem: FC<PokemonCardModel> = ({ name, image, price }) => {
  return (
    <div className="d-flex my-2">
      <Image src={image.small} className="text-center" alt="Card Image" width={61} height={86} />
      <div className="ps-3">
        <h5 className="opacity-75 mb-1">{name}</h5>
        <small className={styles.pricePerCard}>
          ${formatMoney(price)}&nbsp;&nbsp;<span className="text-secondary">per card</span>
        </small>
      </div>
    </div>
  );
};
