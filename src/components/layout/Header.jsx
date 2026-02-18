export default function Header() {
  return (
    <header style={{ paddingTop: 40, paddingBottom: 8, textAlign: "center" }}>
      <h1 className="text-2xl font-semibold tracking-tight text-on-surface md:text-3xl">
        Free BMI, TDEE &amp; Macro Calculator
      </h1>
      <p className="mt-1 text-sm text-on-surface-muted">
        Calculate your daily calories, macros, and weight loss timeline — powered by the Mifflin-St Jeor equation
      </p>
    </header>
  );
}
