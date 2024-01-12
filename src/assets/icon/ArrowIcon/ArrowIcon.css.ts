/** @jsxImportSource @emotion/react */
import { palette } from "../../../theme/palette";
import { css } from "@emotion/react";

export const arrowIconContainer = css`
  display: flex;
  height: 7px;
  align-items: center;
  justify-content: center;
  z-index: 1;

  svg {
    border: 5px solid ${palette.backgroundColor};
    border-radius: 15px;
    background-color: ${palette.boxColor};
    padding: 7px;
  }
`;
