import axios, { AxiosRequestConfig } from "axios";
import classNames from "classnames";
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styles from "../styles/Filter.module.scss";

export type CardSetType = { id: string; name: string } | null;

interface FilterProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  cardType: string;
  setCardType: Dispatch<SetStateAction<string>>;
  rarity: string;
  setRarity: Dispatch<SetStateAction<string>>;
  cardSet: CardSetType;
  setCardSet: Dispatch<SetStateAction<CardSetType>>;
  baseUrl: string;
  apiKey: string;
}

export const Filter: FC<FilterProps> = ({
  name,
  setName,
  cardType,
  setCardType,
  cardSet,
  setCardSet,
  rarity,
  setRarity,
  baseUrl,
  apiKey,
}) => {
  const [_name, _setName] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [rarities, setRarities] = useState<string[]>([]);
  const [sets, setSets] = useState<CardSetType[]>([]);

  useEffect(() => {
    const reqOpt: AxiosRequestConfig = {
      headers: {
        "X-Api-Key": apiKey,
      },
    };

    axios
      .get(`${baseUrl}/types`, reqOpt)
      .then((res) => setTypes(res.data.data))
      .catch(() => setTypes([]));

    axios
      .get(`${baseUrl}/rarities`, reqOpt)
      .then((res) => setRarities(res.data.data))
      .catch(() => setRarities([]));

    axios
      .get(`${baseUrl}/sets`, reqOpt)
      .then((res) => setSets(res.data.data))
      .catch(() => setSets([]));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex justify-content-center py-2">
      <div
        className={classNames(
          styles.filterGroup,
          "d-flex justify-content-center align-items-center ps-2 pe-1",
        )}
      >
        <input
          className={classNames(styles.borderRight, "form-control text-secondary")}
          type="text"
          placeholder="Name..."
          value={_name}
          onChange={(e) => _setName(e.target.value)}
        />
        <select
          className={classNames(styles.borderRight, "form-select text-secondary")}
          placeholder="Type"
          value={cardType}
          onChange={(e) => setCardType(e.target.value)}
        >
          <option hidden selected disabled value="">
            Type
          </option>
          {types.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
        <select
          className={classNames(styles.borderRight, "form-select text-secondary")}
          placeholder="Rarity"
          value={rarity}
          onChange={(e) => setRarity(e.target.value)}
        >
          <option hidden selected disabled value="">
            Rarity
          </option>
          {rarities.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
        <select
          className="form-select text-secondary"
          placeholder="Set"
          value={cardSet?.id}
          onChange={(e) => setCardSet(sets.find((el) => el?.id === e.target.value) || null)}
        >
          <option hidden selected disabled value="null">
            Set
          </option>
          {sets.map((el) => (
            <option key={el?.id} value={el?.id}>
              {el?.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
