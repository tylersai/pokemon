import classNames from "classnames";
import Image from "next/image";
import React, { FC, useContext, useMemo } from "react";
import { PokemonCardModel } from ".";
import { formatMoney } from "../utils/functions";
import styles from "../styles/CartItem.module.scss";
import DataContext from "../context/DataContext";

export const CartItem: FC<PokemonCardModel> = ({ id, name, image, price, count = 1, total }) => {
  const { cartItems, setCartItems, setOpenCart } = useContext(DataContext);

  const toRemove = count === 1;

  const changeCount = (action: "increase" | "decrease") => {
    const idx = cartItems.findIndex((el) => el.id === id);
    const newItems = [...cartItems];
    const newItem = newItems[idx];
    if (action === "increase") {
      newItems.splice(idx, 1, { ...newItem, count: (newItem.count || 1) + 1 });
    } else {
      if (newItem.count === 1) {
        newItems.splice(idx, 1);
      } else {
        newItems.splice(idx, 1, { ...newItem, count: (newItem.count || 1) - 1 });
      }
    }
    setCartItems(newItems);
    if (newItems.length === 0) {
      setOpenCart(false);
    }
  };

  const subTotal = useMemo(() => count * price, [count, price]);

  return (
    <div className="d-flex align-items-start mt-2 mb-3">
      <Image src={image.small} className="text-center" alt="Card Image" width={61} height={86} />
      <div className="ps-3 flex-grow-1 align-self-stretch d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between">
          <div>
            <h5 className="opacity-75 mb-0">{name}</h5>
            <small className={styles.pricePerCard}>
              ${formatMoney(price)}&nbsp;&nbsp;<span className="text-secondary">per card</span>
            </small>
          </div>
          <div className="d-flex align-items-center">
            <h4 className="text-primary my-0 me-1">{count}</h4>
            <div className="d-flex flex-column">
              <button
                className={classNames(styles.upDownBtn, "text-primary")}
                disabled={count >= total}
                onClick={() => changeCount("increase")}
              >
                <i className="bi bi-chevron-up"></i>
              </button>
              <button
                className={classNames(styles.upDownBtn, toRemove ? "text-danger" : "text-primary")}
                onClick={() => changeCount("decrease")}
              >
                <i className={`bi bi-${toRemove ? "x" : "chevron-down"}`}></i>
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <p className={classNames(styles.stockCount, "my-0 text-secondary opacity-75")}>
            <span className="text-danger">{total}</span>&nbsp;&nbsp;cards left
          </p>
          <p className="my-0 text-primary letter-spacing-1">{`$${formatMoney(subTotal)}`}</p>
        </div>
      </div>
    </div>
  );
};
