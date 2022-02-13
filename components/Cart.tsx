import classNames from "classnames";
import React, { FC, useContext } from "react";
import { CartItem } from ".";
import DataContext from "../context/DataContext";
import styles from "../styles/Cart.module.scss";

export const Cart: FC = () => {
  const { openCart, setOpenCart, cartItems, setCartItems } = useContext(DataContext);
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
          <CartItem key={card.id} {...card} />
        ))}
        <div className="d-flex justify-content-center pt-3 pb-2">
          <button
            className={classNames("text-danger", styles.clearAllBtn)}
            onClick={() => {
              setCartItems([]);
              setOpenCart(false);
            }}
          >
            <i className="bi bi-x-lg me-1"></i>Clear All
          </button>
        </div>
        <div className="row justify-content-center py-2">
          <div className="col-9">
            <div className="d-flex justify-content-between align-items-center my-2">
              <h6 className="my-0 text-nowrap">Total Cards</h6>
              <h6 className="my-0 text-nowrap text-danger">{cartItems.length}</h6>
            </div>
            <div className="d-flex justify-content-between align-items-center my-2">
              <h5 className="my-0 text-nowrap">Total Price</h5>
              <h5 className="my-0 text-nowrap text-danger">
                ${cartItems.reduce((prev, el) => prev + el.price, 0)}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
