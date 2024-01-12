/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { arrowIconContainer } from "./ArrowIcon.css";

export default function ArrowIcon() {
  return (
    <div css={arrowIconContainer}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <polyline points="19 12 12 19 5 12"></polyline>
      </svg>
    </div>
  );
}
