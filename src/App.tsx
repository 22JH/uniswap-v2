/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import TokenInput from "./components/TokenInput";
import SelectTokenModal from "./components/selectTokenModal/SelectTokenModal";
import { ValueType } from "types/Value.type";

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
    amount: 0,
    selectedToken: "DAI",
  });

  const [outputValue, setOutputValue] = useState<ValueType>({
    amount: 0,
    selectedToken: "USDC",
  });

  const buttonActive = !(inputValue.amount && outputValue.amount);

  return (
    <>
      <div css={uniswapContainer}>
        <TokenInput
          value={inputValue}
          setValue={setInputValue}
          setOtherValue={setOutputValue}
        />
        <TokenInput
          value={outputValue}
          setValue={setOutputValue}
          setOtherValue={setInputValue}
        />
        <p>{`1 ${outputValue.selectedToken} = 1 ${inputValue.selectedToken}`}</p>
        <button css={swapButton(buttonActive)} disabled={buttonActive}>
          {buttonActive ? "스왑" : "입력"}
        </button>
      </div>
    </>
  );
};

export default App;
