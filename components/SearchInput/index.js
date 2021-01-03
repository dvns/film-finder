import { Input } from './styles';

export default function SearchInput({value, handleChange, handleFocus}) {

  return (
    <Input
      type="text"
      onChange={handleChange}
      value={value}
      onFocus={() => handleFocus(true)}
    />
  )
}