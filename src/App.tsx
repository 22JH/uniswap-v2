/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Global } from "@emotion/react";
import { globalStyle } from "./global.css";
import { palette } from "./theme/palette";

import { useState } from "react";
import { ValueType } from "types/Value.type";
import TokenInput from "./components/home/TokenInput/TokenInput";
import TokenToOtherToken from "./components/home/TokenToOtherToken/TokenToOtherToken";
import SwapButton from "./components/home/SwapButton/SwapButton";
import Header from "./components/home/Header/Header";
import ArrowIcon from "./assets/icon/ArrowIcon/ArrowIcon";

const uniswapContainer = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  padding: 20px;
  background-color: ${palette.backgroundColor};
  display: flex;
  flex-direction: column;
  width: 50vw;
  max-width: 500px;
  min-width: 300px;
  height: 60dvh;
`;

const App = () => {
  const [inputValue, setInputValue] = useState<ValueType>({
    amount: null,
    tokenSymbol: "DAI",
    tokenId: "dai",
    perDollar: 0,
  });

  const [outputValue, setOutputValue] = useState<ValueType>({
    amount: null,
    tokenSymbol: "USDC",
    tokenId: "usd-coin",
    perDollar: 0,
  });

  return (
    <div css={uniswapContainer}>
      <Global styles={globalStyle} />
      <Header />
      <TokenInput
        value={inputValue}
        setValue={setInputValue}
        otherValue={outputValue}
        setOtherValue={setOutputValue}
      />
      <ArrowIcon />
      <TokenInput
        value={outputValue}
        setValue={setOutputValue}
        otherValue={inputValue}
        setOtherValue={setInputValue}
      />
      <TokenToOtherToken inputValue={inputValue} outputValue={outputValue} />
      <SwapButton inputValue={inputValue} outputValue={outputValue} />
    </div>
  );
};

export default App;
