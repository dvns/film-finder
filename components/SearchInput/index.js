import { useEffect, useRef } from "react";
import { Input } from "./styles";

export default function SearchInput({
  value,
  active,
  handleChange,
  handleFocus,
  placeholder,
}) {
  const inputRef = useRef(null);
  useEffect(() => {
    const escHandler = (event) => {
      if (event.keyCode === 27) {
        handleFocus(false);
        inputRef.current.blur();
      }
    };
    window.addEventListener("keydown", escHandler);

    return () => {
      window.removeEventListener("keydown", escHandler);
    };
  }, []);

  return (
    <Input
      ref={inputRef}
      type="text"
      onChange={handleChange}
      onFocus={() => handleFocus(true)}
      value={value}
      placeholder={placeholder}
      active={active}
      spellCheck="false"
      autoComplete="off"
    />
  );
}
