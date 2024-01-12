/** @jsxImportSource @emotion/react */
import { palette } from "../../../theme/palette";
import { css } from "@emotion/react";

export const tokenSearchBarContainer = css`
  padding: 0 15px;
  margin: 10px 0;
  input {
    width: 100%;
    font-size: 20px;
    background-color: transparent;
    border: 1px solid ${palette.boxSubColor};
    border-radius: 10px;
    padding: 10px;
    color: ${palette.fontColor};
    &:focus {
      border: 1.5px solid ${palette.buttonActiveColor};
      outline: none;
    }
  }
`;
