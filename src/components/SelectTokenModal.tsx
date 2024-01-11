/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

const selectTokenModalContainer = css`
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

const tokenList = css``;

export default function SelectTokenModal() {
  const [searchToken, setSearchText] = useState<string>("");

  return (
    <div css={selectTokenModalContainer}>
      <div css={modalHeader}>
        <span>토큰 선택</span>
        <button>X</button>
      </div>
      <div css={tokenSearch}>
        <input type="text" onChange={(e) => setSearchText(e.target.value)} />
      </div>
      <div css={recentSearch}></div>
      <div css={tokenList}></div>
    </div>
  );
}
