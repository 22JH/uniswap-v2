/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { palette } from "../../../theme/palette";

export const swapButtonContainer = (buttonActive: boolean) => css`
  flex: 1.5;
  background-color: ${buttonActive
    ? palette.boxColor
    : palette.buttonActiveColor};
  border-radius: 20px;
  font-weight: bold;
  color: ${buttonActive ? palette.fontPaleColor : palette.fontColor};
`;
