/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { palette } from "../../../theme/palette";

export const TokenInputContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${palette.boxColor};
  border-radius: 20px;
  padding: 20px;
  flex: 2;
  color: ${palette.fontColor};

  .inputButtonWrap {
    display: flex;
    input {
      background-color: transparent;
      color: ${palette.fontColor};
      border-color: transparent;
      font-size: 32px;
      width: 100%;
    }
    input:focus {
      border-color: transparent;
      outline: none;
    }
    button {
      color: ${palette.fontColor};
      width: 80px;
      height: 40px;
      border-radius: 20px;
      background-color: ${palette.boxSubColor};
      border-color: transparent;
    }
  }

  p {
    height: 21px;
  }
`;
