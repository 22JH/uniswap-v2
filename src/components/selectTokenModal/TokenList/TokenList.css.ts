/** @jsxImportSource @emotion/react */
import { palette } from "../../../theme/palette";
import { css } from "@emotion/react";

export const tokenListContainer = css`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  border-top: 1px solid ${palette.boxSubColor};
  overflow-y: scroll;

  .tokenCard {
    padding: 5px 0 5px 0;
    &:hover {
      background-color: ${palette.boxSubColor};
    }
    .tokenSymbol {
      color: ${palette.fontColor};
    }
    .tokenName {
      color: ${palette.fontPaleColor};
    }
  }
`;
