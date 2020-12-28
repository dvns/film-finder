import { Input } from './styles';

export default function SearchInput({value, handleChange}) {

  return (
    <Input
      type="text"
      onChange={handleChange}
      value={value}
    />
  )
}