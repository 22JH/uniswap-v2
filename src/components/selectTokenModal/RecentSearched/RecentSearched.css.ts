/** @jsxImportSource @emotion/react */
import { palette } from "../../../theme/palette";
import { css } from "@emotion/react";

export const recentSearchedContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  padding: 15px;
  button {
    padding: 5px 10px;
    border: 1px solid ${palette.boxSubColor};
    border-radius: 10px;
    font-size: 20px;
    background-color: transparent;
    color: ${palette.fontColor};
    text-transform: uppercase;
    &:hover,
    &:disabled {
      background-color: ${palette.boxSubColor};
    }
  }
`;
