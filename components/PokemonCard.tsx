import classNames from "classnames";
import Image from "next/image";
import { FC } from "react";
import styles from "../styles/PokemonCard.module.scss";
import { formatMoney } from "../utils/functions";

type OnSelectHandlerType = (card: PokemonCardProps) => void;

interface PokemonCardProps {
  id: string;
  name: string;
  rarity: string;
  price: number;
  total: number;
  image: { small: string; large: string };
  className?: string | undefined;
  selected?: boolean;
  onSelect?: OnSelectHandlerType;
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
}) => {
  return (
    <div
      className={classNames(
        className,
        styles.PokemonCard,
        "d-flex flex-column align-items-center px-5",
      )}
    >
      <Image src={image.small} width={220} height={308} alt="Pokemon Card" />
      <h4 className="mt-3 mb-1">{name}</h4>
      <small className="text-primary mt-1 mb-3">{rarity}</small>
      <div
        className={classNames(styles.gapPT, "d-flex justify-content-center mb-3 text-secondary")}
      >
        <span>{`$${formatMoney(price)}`}</span>
        <span>{total} left</span>
      </div>
      {selected ? (
        <button className={classNames(styles.cardBtn, "btn btn-dark px-4")}>Selected</button>
      ) : (
        <button className={classNames(styles.cardBtn, "btn btn-warning px-4")}>Select Card</button>
      )}
    </div>
  );
};
