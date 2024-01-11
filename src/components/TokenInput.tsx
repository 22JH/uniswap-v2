interface TokenInputProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

export default function TokenInput({ value, setValue }: TokenInputProps) {
  return <input type="number" defaultValue={0.0} />;
}
