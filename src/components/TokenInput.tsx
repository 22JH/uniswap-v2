import { useState } from "react";
import { ValueType } from "types/Value.type";
import SelectTokenModal from "./selectTokenModal/SelectTokenModal";
import { useQuery } from "react-query";
import { getTokenPrice } from "api/getTokenPrice";

interface TokenInputProps {
  value: ValueType;
  setValue: React.Dispatch<React.SetStateAction<ValueType>>;
  setOtherValue: React.Dispatch<React.SetStateAction<ValueType>>;
}

export default function TokenInput({
  value,
  setValue,
  setOtherValue,
}: TokenInputProps) {
  const [modalClicked, setModalClicked] = useState<boolean>(false);

  // useQuery(['getTokenPrice',] ()=>getTokenPrice())
  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {};
  return (
    <>
      <div>
        <input
          type="number"
          placeholder="0.0"
          value={value.amount}
          onChange={(e) => handleAmount(e)}
        />
        <button onClick={() => setModalClicked((prev) => !prev)}>
          {value.selectedToken}
        </button>
      </div>
      {modalClicked && (
        <SelectTokenModal
          setModalClicked={setModalClicked}
          setValue={setValue}
        />
      )}
    </>
  );
}
