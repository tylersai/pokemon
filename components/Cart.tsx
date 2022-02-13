import classNames from "classnames";
import Image from "next/image";
import React, { FC, useContext } from "react";
import DataContext from "../context/DataContext";
import styles from "../styles/Cart.module.scss";
import { formatMoney } from "../utils/functions";

export const Cart: FC = () => {
  const { openCart, cartItems } = useContext(DataContext);
  return (
    <div
      className={classNames(
        "position-absolute",
        styles.cartOverlay,
        openCart ? "d-flex justify-content-center align-items-end" : "d-none",
      )}
    >
      <div className={classNames("bg-white d-flex flex-column position-relative", styles.Cart)}>
        {cartItems.map((card) => (
          <div key={card.id} className="d-flex my-2">
            <Image
              src={card.image.small}
              className="text-center"
              alt="Card Image"
              width={61}
              height={86}
            />
            <div className="ps-3">
              <h5 className="opacity-75 mb-1">{card.name}</h5>
              <small className="text-secondary">{`$${formatMoney(card.price)} per card`}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
