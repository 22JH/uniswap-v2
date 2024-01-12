/** @jsxImportSource @emotion/react */
import { palette } from "../../../theme/palette";
import { css } from "@emotion/react";

export const tokenListContainer = css`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${palette.boxSubColor};
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .tokenCard {
    padding: 5px 15px;
    background-color: transparent;
    display: flex;
    flex-direction: column;

    &:disabled {
      background-color: ${palette.boxSubColor};
      cursor: default;
    }
    &:hover {
      background-color: ${palette.boxSubColor};
    }
    .tokenSymbol {
      color: ${palette.fontColor};
    }
    .tokenName {
      color: ${palette.fontPaleColor};
    }
  }
  .target {
    height: 10px;
    margin-bottom: 50px;
    bottom: 0;
  }
`;
