import { useRef, useState } from "react";
import { Autocomplete, Loader } from "@mantine/core";

export function AutocompleteLoading({ name, value, onChange, placeholder }) {
  const timeoutRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = (val) => {
    window.clearTimeout(timeoutRef.current);
    onChange({ target: { name, value: val } });
    setData([]);
    if (val.trim().length === 0 || val.includes("@")) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(["gmail.com", "outlook.com", "yahoo.com"].map((provider) => `${val}@${provider}`));
      }, 1000);
    }
  };

  return (
    <Autocomplete
      name={name}
      value={value}
      data={data}
      onChange={handleChange}
      rightSection={loading ? <Loader size={16} /> : null}
      placeholder={placeholder}
    />
  );
}
