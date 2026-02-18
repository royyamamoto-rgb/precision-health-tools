export default function SelectField({ label, options, ...props }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-on-surface-variant">{label}</label>
      <select
        {...props}
        className="m3-input w-full appearance-none px-3.5 py-2.5 text-sm"
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
