/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useState } from "react";
import { ValueType } from "types/Value.type";
import SelectTokenModal from "../../selectTokenModal/SelectTokenModal";
import {
  transDivideDecimal,
  transMultiplyDecimal,
} from "../../../util/transDecimal";
import { TokenInputContainer } from "./TokenInput.css";
import { getTokenPrice } from "../../../api/getTokenPrice";
import { useQuery } from "react-query";

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
    if (Number(e.target.value) < 0) return;
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

  const { data, isLoading, isError } = useQuery(
    ["getPrice", value.tokenId],
    getTokenPrice,
    {
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
  useEffect(() => {
    if (data) {
      const _price = data[value.tokenId].usd;
      setValue((prev) => ({ ...prev, perDollar: _price }));

      if (value.amount) {
        const _newTransToDollar = transMultiplyDecimal(value.amount, _price);
        const _swapedOtherValue = transDivideDecimal(
          Number(_newTransToDollar),
          otherValue.perDollar!
        );
        setOtherValue((prev) => ({
          ...prev,
          amount: Number(_swapedOtherValue),
        }));
      }
    }
  }, [data]);
  return (
    <>
      <div css={TokenInputContainer}>
        <div className="inputButtonWrap">
          <input
            type="number"
            placeholder="0.0"
            value={value.amount || ""}
            onChange={(e) => handleAmount(e)}
          />
          <button onClick={() => setModalClicked(() => true)}>
            {value.tokenSymbol}
          </button>
        </div>
        {isLoading ? "로딩 중 입니다" : value.amount && <p>${transToDollar}</p>}
        {isError && (
          <p>API 요청 횟수가 초과했습니다. 1분뒤에 다시 시도해주세요</p>
        )}
      </div>
      {modalClicked && (
        <SelectTokenModal
          setModalClicked={setModalClicked}
          setValue={setValue}
          value={value}
          otherValue={otherValue}
        />
      )}
    </>
  );
}
