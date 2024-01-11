interface TokenSearchBar {
  setSearchToken: React.Dispatch<React.SetStateAction<string>>;
}

export default function TokenSearchBar({ setSearchToken }: TokenSearchBar) {
  return (
    <div>
      <input type="text" onChange={(e) => setSearchToken(e.target.value)} />
    </div>
  );
}
