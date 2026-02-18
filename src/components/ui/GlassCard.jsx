export default function GlassCard({ children, className = "", flat = false }) {
  const base = flat ? "m3-card-flat" : "m3-card";
  return (
    <div className={`${base} p-5 ${className}`}>
      {children}
    </div>
  );
}
