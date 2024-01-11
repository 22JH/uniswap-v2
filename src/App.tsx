/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import TokenInput from "./components/TokenInput";
import SelectTokenModal from "./components/tokenSelectModal/SelectTokenModal";

const uniswapContainer = css`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const swapButton = css`
  height: 50px;
  background-color: grey;
`;

const App = () => {
  const [inputValue, setInputValue] = useState<number>(0.0);
  const [outputValue, setOutputValue] = useState<number>(0.0);
  const [modalClicked, setModalClicked] = useState<boolean>(false);
  return (
    <>
      <div css={uniswapContainer}>
        <TokenInput value={inputValue} setValue={setInputValue} />
        <TokenInput value={outputValue} setValue={setOutputValue} />
        <button css={swapButton} content="스왑" style={{ height: "20px" }} />
      </div>
      <SelectTokenModal />
    </>
  );
};

export default App;
