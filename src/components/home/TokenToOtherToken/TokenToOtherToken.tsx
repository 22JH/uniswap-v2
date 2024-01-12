/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { ValueType } from "types/Value.type";
import { transDivideDecimal } from "../../../util/transDecimal";
import { tokenToOtherTokenContainer } from "./TokenToOtherToken.css";

interface TokenToOtherTokenProps {
  inputValue: ValueType;
  outputValue: ValueType;
}

export default function TokenToOtherToken({
  inputValue,
  outputValue,
}: TokenToOtherTokenProps) {
  const tokenToOtherToken = transDivideDecimal(
    inputValue.perDollar!,
    outputValue.perDollar!
  );
  return (
    <p
      css={
        tokenToOtherTokenContainer
      }>{`1 ${outputValue.tokenSymbol} = ${tokenToOtherToken} ${inputValue.tokenSymbol}`}</p>
  );
}
