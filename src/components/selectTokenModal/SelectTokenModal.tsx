/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useState } from "react";
import TokenList from "./TokenList";
import { ValueType } from "types/Value.type";
import { useQuery } from "react-query";
import { getTokenPrice } from "../../api/getTokenPrice";
import { getSearchedToken } from "../../api/getSearchedToken";
import useDebounce from "../../hooks/useDebounce";

const selectTokenModalContainer = css`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;

  width: 35vw;
  height: 80vh;
  background-color: grey;
`;

const modalHeader = css`
  display: flex;
  justify-content: space-between;
`;

const tokenSearch = css``;

const recentSearch = css`
  width: 60px;
`;

interface SelectTokenModalProps {
  setModalClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<ValueType>>;
}

export default function SelectTokenModal({
  setModalClicked,
  setValue,
}: SelectTokenModalProps) {
  const [searchToken, setSearchText] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchToken, 500);

  const { data } = useQuery(["search-token", searchToken], getSearchedToken, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    enabled: !!(searchToken && debouncedSearchTerm),
  });

  return (
    <div css={selectTokenModalContainer}>
      <div css={modalHeader}>
        <span>토큰 선택</span>
        <button onClick={() => setModalClicked(() => false)}>X</button>
      </div>
      <div css={tokenSearch}>
        <input type="text" onChange={(e) => setSearchText(e.target.value)} />
      </div>
      <div css={recentSearch}></div>
      <TokenList
        searchedToken={data?.coins}
        setValue={setValue}
        setModalClicked={setModalClicked}
      />
    </div>
  );
}
