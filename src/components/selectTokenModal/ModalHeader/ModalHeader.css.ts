/** @jsxImportSource @emotion/react */
import { palette } from "../../../theme/palette";
import { css } from "@emotion/react";

export const modalHeaderContainer = css`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  color: ${palette.fontColor};
  button {
    background-color: transparent;
    color: ${palette.fontColor};
  }
`;
