/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { selectTokenModalContainer } from "./SelectTokenModal.css";

import { useState } from "react";
import TokenList from "./TokenList/TokenList";
import { ValueType } from "types/Value.type";
import { useQuery } from "react-query";
import { getSearchedToken } from "../../api/getSearchedToken";
import useDebounce from "../../hooks/useDebounce";
import RecentSearch from "./RecentSearched/RecentSearched";
import ModalHeader from "./ModalHeader/ModalHeader";
import TokenSearchBar from "./TokenSearchBar/TokenSearchBar";
import ModalFooter from "./ModalFooter/ModalFooter";

interface SelectTokenModalProps {
  setModalClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<ValueType>>;
  value: ValueType;
}

export default function SelectTokenModal({
  setModalClicked,
  setValue,
  value,
}: SelectTokenModalProps) {
  const [searchToken, setSearchText] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchToken, 500);

  const { data } = useQuery(
    ["search-token", debouncedSearchTerm],
    getSearchedToken,
    {
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      enabled: !!(searchToken && debouncedSearchTerm),
    }
  );

  return (
    <div css={selectTokenModalContainer}>
      <ModalHeader setModalClicked={setModalClicked} />
      <TokenSearchBar setSearchText={setSearchText} />
      <RecentSearch
        value={value}
        setValue={setValue}
        setModalClicked={setModalClicked}
      />
      <TokenList
        value={value}
        searchedToken={data?.coins}
        setValue={setValue}
        setModalClicked={setModalClicked}
      />
      {/* <ModalFooter /> */}
    </div>
  );
}
