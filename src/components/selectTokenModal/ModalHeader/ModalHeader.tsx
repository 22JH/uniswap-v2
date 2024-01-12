/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { modalHeaderContainer } from "./ModalHeader.css";

interface ModalHeaderProps {
  setModalClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalHeader({ setModalClicked }: ModalHeaderProps) {
  return (
    <div css={modalHeaderContainer}>
      <span>토큰 선택</span>
      <button onClick={() => setModalClicked(() => false)}>X</button>
    </div>
  );
}
