/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { recentSearchedContainer } from "./RecentSearched.css";

import { ValueType } from "types/Value.type";

interface RecentSearch {
  setValue: React.Dispatch<React.SetStateAction<ValueType>>;
  setModalClicked: React.Dispatch<React.SetStateAction<boolean>>;
  value: ValueType;
  otherValue: ValueType;
}

export default function RecentSearched({
  setValue,
  setModalClicked,
  value,
  otherValue,
}: RecentSearch) {
  const searched: ValueType[] = JSON.parse(
    localStorage.getItem("recentSearched") || "[]"
  );

  const handleClickedToken = (token: ValueType) => {
    const _newSearched = [token, ...searched].slice(0, 7);
    localStorage.setItem("recentSearched", JSON.stringify(_newSearched));

    setValue((prev) => ({
      ...prev,
      tokenId: token.tokenId,
      tokenSymbol: token.tokenSymbol,
    }));

    setModalClicked(() => false);
  };

  return (
    <div css={recentSearchedContainer}>
      {searched &&
        searched.map((token, index) => {
          return (
            <button
              onClick={() => handleClickedToken(token)}
              disabled={
                token.tokenId === value.tokenId ||
                token.tokenId === otherValue.tokenId
              }
              key={token.tokenId + index}>
              {token.tokenSymbol}
            </button>
          );
        })}
    </div>
  );
}
