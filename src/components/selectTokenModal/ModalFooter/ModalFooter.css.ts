/** @jsxImportSource @emotion/react */
import { palette } from "../../../theme/palette";
import { css } from "@emotion/react";

export const modalFooterContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: ${palette.boxColor};
  color: ${palette.buttonActiveColor};
  width: 100%;
  border-radius: 10px;
  cursor: pointer;

  position: absolute;
  bottom: 0;
`;
