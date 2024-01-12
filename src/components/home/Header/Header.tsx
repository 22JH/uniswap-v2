/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { headerContainer } from "./Header.css";

import SettingIcon from "../../../assets/icon/SettingIcon";

export default function Header() {
  return (
    <div css={headerContainer}>
      <p>스왑</p>
      <SettingIcon />
    </div>
  );
}
