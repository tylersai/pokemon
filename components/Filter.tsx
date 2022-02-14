import axios, { AxiosRequestConfig } from "axios";
import classNames from "classnames";
import React, {
  ChangeEventHandler,
  Dispatch,
  FC,
  KeyboardEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "../styles/Filter.module.scss";

export type CardSetType = { id: string; name: string };

interface FilterProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  cardType: string;
  setCardType: Dispatch<SetStateAction<string>>;
  rarity: string;
  setRarity: Dispatch<SetStateAction<string>>;
  cardSet: string;
  setCardSet: Dispatch<SetStateAction<string>>;
  baseUrl: string;
  apiKey: string;
  setIsAppend: Dispatch<SetStateAction<boolean>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
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
  setIsAppend,
  setCurrentPage,
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

  const onNameKeyUp = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.key === "Enter") {
        setIsAppend(false);
        setCurrentPage(1);
        setName(e.currentTarget.value);
      }
    },
    [setName, setCurrentPage, setIsAppend],
  );

  const onTypeChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => {
      setIsAppend(false);
      setCurrentPage(1);
      setCardType(e.target.value);
    },
    [setCardType, setCurrentPage, setIsAppend],
  );

  const onRarityChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => {
      setIsAppend(false);
      setCurrentPage(1);
      setRarity(e.target.value);
    },
    [setRarity, setCurrentPage, setIsAppend],
  );

  const onSetChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => {
      setIsAppend(false);
      setCurrentPage(1);
      setCardSet(e.target.value);
    },
    [setCardSet, setCurrentPage, setIsAppend],
  );

  return (
    <>
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
            onKeyUp={onNameKeyUp}
          />
          <select
            className={classNames(styles.borderRight, "form-select text-secondary")}
            placeholder="Type"
            value={cardType}
            onChange={onTypeChange}
          >
            <option value="">Type</option>
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
            onChange={onRarityChange}
          >
            <option value="">Rarity</option>
            {rarities.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
          <select
            className="form-select text-secondary"
            placeholder="Set"
            value={cardSet}
            onChange={onSetChange}
          >
            <option value="">Set</option>
            {sets.map((el) => (
              <option key={el?.id} value={el?.id}>
                {el?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {(name || cardType || cardSet || rarity) && (
        <div className="d-flex justify-content-center pb-2">
          <div
            className={classNames(
              styles.filterIndicatorWrapper,
              "d-flex align-items-center px-3 flex-wrap",
            )}
          >
            {name && name.trim() && (
              <span className="px-2 py-1 text-secondary text-nowrap letter-spacing-1">
                Name: {name.trim()}
              </span>
            )}
            {cardType && (
              <span className="px-2 py-1 text-secondary text-nowrap letter-spacing-1">
                Type: {cardType}
              </span>
            )}
            {rarity && (
              <span className="px-2 py-1 text-secondary text-nowrap letter-spacing-1">
                Rarity: {rarity}
              </span>
            )}
            {cardSet && (
              <span className="px-2 py-1 text-secondary text-nowrap letter-spacing-1">
                Set: {sets.find((el) => el.id === cardSet)?.name}
              </span>
            )}
            <span
              className="px-2 py-1 text-danger text-nowrap letter-spacing-1 text-uppercase"
              role="button"
              onClick={() => {
                _setName("");
                setName("");
                setCardType("");
                setRarity("");
                setCardSet("");
              }}
            >
              <i className="bi bi-x-lg"></i> Clear
            </span>
          </div>
        </div>
      )}
    </>
  );
};
