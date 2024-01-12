/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import TokenInput from "./components/TokenInput";
import { ValueType } from "types/Value.type";
import { useQuery } from "react-query";
import { getTokenPrice } from "./api/getTokenPrice";
import { transDivideDecimal } from "./util/transDecimal";

const uniswapContainer = css`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const swapButton = (buttonActive: boolean) => css`
  height: 50px;
  background-color: ${buttonActive ? "grey" : "yellow"};
`;

const App = () => {
  const [inputValue, setInputValue] = useState<ValueType>({
    amount: null,
    tokenSymbol: "DAI",
    tokenId: "dai",
    perDollar: 0.99,
  });

  const [outputValue, setOutputValue] = useState<ValueType>({
    amount: null,
    tokenSymbol: "USDC",
    tokenId: "usd-coin",
    perDollar: 0.87,
  });

  useQuery(["price", inputValue.tokenId], getTokenPrice, {
    onSuccess: (data) => {
      const _price = data[inputValue.tokenId].usd;
      setInputValue((prev) => ({ ...prev, perDollar: _price }));
    },
    retry: false,
  });

  useQuery(["price", outputValue.tokenId], getTokenPrice, {
    onSuccess: (data) => {
      const _price = data[outputValue.tokenId].usd;
      setOutputValue((prev) => ({ ...prev, perDollar: _price }));
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  const buttonActive = !(inputValue.amount && outputValue.amount);
  const tokenToOtherToken = transDivideDecimal(
    inputValue.perDollar!,
    outputValue.perDollar!
  );

  return (
    <>
      <div css={uniswapContainer}>
        <TokenInput
          value={inputValue}
          setValue={setInputValue}
          otherValue={outputValue}
          setOtherValue={setOutputValue}
        />
        <TokenInput
          value={outputValue}
          setValue={setOutputValue}
          otherValue={inputValue}
          setOtherValue={setInputValue}
        />
        <p>{`1 ${outputValue.tokenSymbol} = ${tokenToOtherToken} ${inputValue.tokenSymbol}`}</p>
        <button css={swapButton(buttonActive)} disabled={buttonActive}>
          {buttonActive ? "스왑" : "입력"}
        </button>
      </div>
    </>
  );
};

export default App;
