/** @jsxImportSource @emotion/react */
import { palette } from "../../theme/palette";
import { css } from "@emotion/react";

export const selectTokenModalContainer = css`
  display: flex;
  flex-direction: column;

  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  z-index: 2;

  width: 35vw;
  min-width: 300px;
  height: 80vh;
  background-color: ${palette.backgroundColor};
  border: 1px solid ${palette.boxSubColor};
  border-radius: 10px;
`;
