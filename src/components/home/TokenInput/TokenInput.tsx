/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { ValueType } from "types/Value.type";
import SelectTokenModal from "../../selectTokenModal/SelectTokenModal";
import {
  transDivideDecimal,
  transMultiplyDecimal,
} from "../../../util/transDecimal";
import { TokenInputContainer } from "./TokenInput.css";

interface TokenInputProps {
  value: ValueType;
  setValue: React.Dispatch<React.SetStateAction<ValueType>>;
  otherValue: ValueType;
  setOtherValue: React.Dispatch<React.SetStateAction<ValueType>>;
}

export default function TokenInput({
  value,
  setValue,
  otherValue,
  setOtherValue,
}: TokenInputProps) {
  const [modalClicked, setModalClicked] = useState<boolean>(false);

  const transToDollar = transMultiplyDecimal(value.amount!, value.perDollar!);

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _newAmount = Number(e.target.value);
    const _newTransToDollar = transMultiplyDecimal(
      _newAmount,
      value.perDollar!
    );
    setValue({ ...value, amount: _newAmount });

    const _swapedOtherValue = transDivideDecimal(
      Number(_newTransToDollar),
      otherValue.perDollar!
    );

    setOtherValue((prev) => ({ ...prev, amount: Number(_swapedOtherValue) }));
  };

  return (
    <>
      <div css={TokenInputContainer}>
        <div className="inputButtonWrap">
          <input
            type="number"
            placeholder="0.0"
            value={value.amount || ""}
            onChange={(e) => handleAmount(e)}
            min="0"></input>
          <button onClick={() => setModalClicked(() => true)}>
            {value.tokenSymbol}
          </button>
        </div>
        <p>{value.amount && `$${transToDollar}`}</p>
      </div>
      {modalClicked && (
        <SelectTokenModal
          setModalClicked={setModalClicked}
          setValue={setValue}
          value={value}
        />
      )}
    </>
  );
}
