export function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  helper
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {helper ? <small className="field-help">{helper}</small> : null}
    </label>
  );
}
