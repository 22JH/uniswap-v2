/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { modalFooterContainer } from "./ModalFooter.css";

export default function ModalFooter() {
  return (
    <div css={modalFooterContainer}>
      <p onClick={() => alert("준비 중 입니다")}>토큰 목록 관리</p>
    </div>
  );
}
