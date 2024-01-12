/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { palette } from "../../../theme/palette";

export const headerContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  color: ${palette.fontColor};
`;
