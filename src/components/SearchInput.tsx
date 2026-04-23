

type SearchProps = {
  value: string;
  onChange: (val: string) => void;
};
function SearchInput({ value, onChange }: SearchProps) {
  return (
    <input
      type="text"
      placeholder="Search products"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchInput;
