import classNames from "classnames";
import Image from "next/image";
import { FC, MouseEventHandler, useCallback } from "react";
import styles from "../styles/PokemonCard.module.scss";
import { formatMoney } from "../utils/functions";

export interface PokemonCardModel {
  id: string;
  name: string;
  rarity: string;
  price: number;
  total: number;
  image: { small: string; large: string };
  count?: number;
}

type SelectOrDeselect = "select" | "unselect";

export type OnSelectHandlerType = (card: PokemonCardModel, selectType: SelectOrDeselect) => void;

interface PokemonCardProps extends PokemonCardModel {
  className?: string | undefined;
  selected?: boolean | undefined;
  onSelect?: OnSelectHandlerType | undefined;
}

export const PokemonCard: FC<PokemonCardProps> = ({
  className,
  id,
  name,
  rarity,
  price,
  total,
  image,
  selected,
  onSelect,
}) => {
  const handleSelect = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      if (onSelect && typeof onSelect === "function") {
        onSelect({ id, name, rarity, price, image, total }, selected ? "unselect" : "select");
      }
    },
    [onSelect, selected, id, name, rarity, price, image, total],
  );

  return (
    <div
      className={classNames(
        className,
        styles.PokemonCard,
        "fadeIn d-flex flex-column align-items-center px-5",
      )}
    >
      <Image src={image.small} width={220} height={308} alt="Pokemon Card" />
      <h4 className="mt-3 mb-1 text-center">{name}</h4>
      <small className="text-primary mt-1 mb-3 text-center">{rarity}</small>
      <div
        className={classNames(styles.gapPT, "d-flex justify-content-center mb-3 text-secondary")}
      >
        <span>{`$${formatMoney(price)}`}</span>
        <span>{total} left</span>
      </div>
      {selected ? (
        <button
          className={classNames(styles.cardBtn, "btn btn-dark ps-3 pe-4")}
          onClick={handleSelect}
        >
          <i className="bi bi-check2 me-2"></i>Selected
        </button>
      ) : (
        <button
          className={classNames(styles.cardBtn, "btn btn-warning px-4")}
          onClick={handleSelect}
        >
          Select Card
        </button>
      )}
    </div>
  );
};
