/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { swapButtonContainer } from "./SwapButton.css";

import { ValueType } from "types/Value.type";

interface SwapButtonProps {
  inputValue: ValueType;
  outputValue: ValueType;
}

export default function SwapButton({
  inputValue,
  outputValue,
}: SwapButtonProps) {
  /** 스왑 버튼 활성화 */
  const buttonActive = !(inputValue.amount && outputValue.amount);
  return (
    <button
      disabled={buttonActive}
      css={swapButtonContainer(buttonActive)}
      onClick={() => alert("준비 중 입니다")}>
      {buttonActive ? "금액을 입력해 주세요" : "스왑"}
    </button>
  );
}
