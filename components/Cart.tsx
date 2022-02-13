import classNames from "classnames";
import React, { FC, useContext, useMemo } from "react";
import { CartItem } from ".";
import DataContext from "../context/DataContext";
import styles from "../styles/Cart.module.scss";
import { formatMoney } from "../utils/functions";

export const Cart: FC = () => {
  const { openCart, setOpenCart, cartItems, setCartItems } = useContext(DataContext);

  const totalCount = useMemo(() => {
    return cartItems.reduce((tot, el) => tot + (el.count || 1), 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((tot, el) => tot + el.price * (el.count || 1), 0);
  }, [cartItems]);

  return (
    <div
      className={classNames(
        "position-absolute",
        styles.cartOverlay,
        openCart ? "d-flex justify-content-center align-items-end" : "d-none",
      )}
      onClick={() => setOpenCart(false)}
    >
      <div
        className={classNames("bg-white d-flex flex-column position-relative", styles.Cart)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classNames("d-flex flex-column", styles.cartItemsWrapper)}>
          {cartItems.map((card) => (
            <CartItem key={card.id} {...card} />
          ))}
        </div>
        <div
          className={classNames(
            styles.clearAllBtnWrapper,
            "d-flex justify-content-center pt-3 pb-2 position-relative",
          )}
        >
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
          <div className="col-8">
            <div className="d-flex justify-content-between align-items-center my-2">
              <h6 className="my-0 text-nowrap">Total Cards</h6>
              <h6 className="my-0 text-nowrap text-danger">{totalCount}</h6>
            </div>
            <div className="d-flex justify-content-between align-items-center my-2">
              <h5 className="my-0 text-nowrap">Total Price</h5>
              <h5 className="my-0 text-nowrap text-danger">${formatMoney(totalPrice)}</h5>
            </div>
          </div>
        </div>
        <button
          className={classNames(styles.payNowBtn, "btn btn-primary px-5 my-2 align-self-center")}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};
