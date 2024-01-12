/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { tokenSearchBarContainer } from "./TokenSearchBar.css";

interface TokenSearchBar {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export default function TokenSearchBar({ setSearchText }: TokenSearchBar) {
  return (
    <div css={tokenSearchBarContainer}>
      <input
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="이름 검색 또는 주소 붙여넣기"
      />
    </div>
  );
}
