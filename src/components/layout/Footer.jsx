export default function Footer() {
  return (
    <footer style={{ paddingTop: 32, paddingBottom: 24, textAlign: "center" }}>
      <p className="text-xs leading-relaxed text-on-surface-muted">
        Calculations use the <strong>Mifflin-St Jeor equation</strong> (1990), recommended by the
        Academy of Nutrition and Dietetics. This tool provides estimates for informational purposes only.
        Not medical advice. Consult a healthcare professional before starting any diet or exercise program.
      </p>
      <p className="mt-2 text-xs text-on-surface-muted">
        &copy; {new Date().getFullYear()} Precision Health Tools &middot; Free &amp; open source &middot; No data collected
      </p>
    </footer>
  );
}
