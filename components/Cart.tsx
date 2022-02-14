import classNames from "classnames";
import React, { FC, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { CartItem } from ".";
import DataContext from "../context/DataContext";
import styles from "../styles/Cart.module.scss";
import { formatMoney } from "../utils/functions";

export const Cart: FC = () => {
  const { openCart, setOpenCart, cartItems, setCartItems } = useContext(DataContext);

  const [paid, setPaid] = useState<boolean>(false);
  const [showCheck, setShowCheck] = useState<boolean>(false);

  useLayoutEffect(() => {
    let t1: any = null;
    let t2: any = null;
    let t3: any = null;
    if (paid) {
      document.querySelectorAll(".Cart > *").forEach((el) => {
        el.classList.add("fadeOut");
      });
      t1 = setTimeout(() => {
        setShowCheck(true);
        setCartItems([]);
        t2 = setTimeout(() => {
          document.querySelector(".Cart")?.classList.add("fadeOut");
          t3 = setTimeout(() => {
            setOpenCart(false);
            setPaid(false);
            setShowCheck(false);
            document.querySelector(".Cart")?.classList.remove("fadeOut");
            document.querySelector(".Cart > button")?.classList.remove("fadeOut");
          }, 1050);
        }, 900);
      }, 350);
    }
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paid]);

  const totalCount = useMemo(() => {
    return cartItems.reduce((tot, el) => tot + (el.count || 1), 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((tot, el) => tot + el.price * (el.count || 1), 0);
  }, [cartItems]);

  return (
    <div
      className={classNames(
        styles.cartOverlay,
        "appear",
        openCart ? "d-flex justify-content-center align-items-end" : "d-none",
      )}
      onClick={() => setOpenCart(false)}
    >
      <div
        className={classNames("Cart bg-white d-flex flex-column position-relative", styles.Cart)}
        onClick={(e) => e.stopPropagation()}
      >
        {showCheck ? (
          <div className="d-flex flex-column justify-content-center align-items-center py-5 appear">
            <h1 className="text-center text-success">
              <i className="bi bi-check2-circle"></i>
            </h1>
            <p className="text-center text-success mb-0">Payment Success!</p>
          </div>
        ) : (
          <>
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
          </>
        )}
        <button
          className={classNames(styles.payNowBtn, "btn btn-primary px-5 my-2 align-self-center")}
          onClick={() => setPaid(true)}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};
