/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Global } from "@emotion/react";
import { globalStyle } from "./global.css";
import { palette } from "./theme/palette";

import { useState } from "react";
import { ValueType } from "types/Value.type";
import { useQuery } from "react-query";
import { getTokenPrice } from "./api/getTokenPrice";
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
  width: 500px;
  height: 500px;
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

  useQuery(["price", inputValue.tokenId], getTokenPrice, {
    onSuccess: (data) => {
      const _price = data[inputValue.tokenId].usd;
      setInputValue((prev) => ({ ...prev, perDollar: _price }));
    },
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 24,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useQuery(["price", outputValue.tokenId], getTokenPrice, {
    onSuccess: (data) => {
      const _price = data[outputValue.tokenId].usd;
      setOutputValue((prev) => ({ ...prev, perDollar: _price }));
    },
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    retry: false,
  });
  return (
    <div css={uniswapContainer}>
      <Global styles={globalStyle} />
      <Header />
      <div></div>
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
