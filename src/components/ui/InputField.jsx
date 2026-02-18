export default function InputField({ label, helpText, ...props }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-on-surface-variant">{label}</label>
      <input
        {...props}
        className="m3-input w-full px-3.5 py-2.5 text-sm"
      />
      {helpText && <div className="mt-1 text-xs text-on-surface-muted">{helpText}</div>}
    </div>
  );
}
