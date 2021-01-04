import { Input } from './styles';

export default function SearchInput({value, handleChange, handleFocus, placeholder}) {

  return (
    <Input
      type="text"
      onChange={handleChange}
      onFocus={() => handleFocus(true)}
      value={value}
      placeholder={placeholder}
    />
  )
}