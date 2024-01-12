/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { palette } from "./theme/palette";

export const globalStyle = css`
  html,
  body,
  input,
  div,
  p,
  button {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  body {
    background-color: ${palette.boxColor};
  }

  button {
    cursor: pointer;
    &:disabled {
      cursor: default;
    }
  }
`;
