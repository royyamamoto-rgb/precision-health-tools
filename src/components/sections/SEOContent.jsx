const METHODS = [
  {
    title: "BMI Calculator — Body Mass Index",
    text: "BMI is calculated as weight (kg) divided by height (m) squared. A BMI of 18.5–24.9 is considered normal. This tool classifies results into underweight, normal, overweight, and obese categories instantly.",
  },
  {
    title: "BMR Calculator — Basal Metabolic Rate",
    text: "Your BMR is the number of calories your body burns at complete rest. We use the Mifflin-St Jeor equation (1990), recommended by the Academy of Nutrition and Dietetics as the most accurate predictive formula. Men: (10 × kg) + (6.25 × cm) − (5 × age) + 5. Women: same formula minus 161.",
  },
  {
    title: "TDEE Calculator — Total Daily Energy Expenditure",
    text: "TDEE multiplies your BMR by an activity factor (1.2 for sedentary up to 1.9 for athletes). This is the total calories you burn per day. Eating below TDEE creates a deficit for weight loss; eating above creates a surplus for muscle gain.",
  },
  {
    title: "Macro Calculator — Protein, Carbs & Fat",
    text: "Macros are calculated from your calorie goal. Protein is set at 1.6–2.2g per kg of body weight to preserve muscle. Fat is set at 25–30% of calories for hormonal health. Remaining calories are filled with carbohydrates for energy.",
  },
];

const FAQS = [
  {
    q: "How many calories should I eat to lose weight?",
    a: "Eat 500 calories below your TDEE for a safe deficit of about 1 pound (0.45 kg) per week. Calculate your TDEE first using this tool, then subtract 500. For faster loss, a 750-calorie deficit yields ~1.5 lb/week, but don't go below 1,200 (women) or 1,500 (men) calories without medical supervision.",
  },
  {
    q: "What is TDEE and why does it matter for weight loss?",
    a: "TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in a day, including exercise. It's the single most important number for weight management. Eat below your TDEE to lose weight, at your TDEE to maintain, or above to gain muscle. Our calculator uses the Mifflin-St Jeor equation multiplied by your activity level.",
  },
  {
    q: "How do I calculate my macros for fat loss?",
    a: "Start with your calorie goal (TDEE minus deficit). Set protein at 1.6–2.2g per kg body weight — higher protein preserves muscle during a cut. Set fat at 25–30% of total calories for hormonal health. Fill the rest with carbs. For a 75 kg person on 2,100 calories: approximately 135g protein, 234g carbs, and 70g fat.",
  },
  {
    q: "What is a healthy BMI range?",
    a: "A healthy BMI is 18.5–24.9. Below 18.5 is underweight, 25–29.9 is overweight, and 30+ is classified as obese. However, BMI doesn't distinguish between muscle and fat — a muscular person may have a high BMI while being healthy. Use BMI alongside other metrics like waist circumference and body fat percentage.",
  },
  {
    q: "How accurate is the Mifflin-St Jeor equation?",
    a: "The Mifflin-St Jeor equation is accurate to within ±10% for most adults, according to research in the Journal of the American Dietetic Association. It's more accurate than the older Harris-Benedict equation. Use the calculated values as a starting point, then adjust based on your real-world weight changes over 2–4 weeks.",
  },
  {
    q: "What is the best macro ratio for cutting (fat loss)?",
    a: "For fat loss (cutting), a proven macro split is 30% protein, 40% carbs, 20–30% fat. The key is keeping protein high (1.8–2.2g/kg) to minimize muscle loss while in a calorie deficit. This calculator automatically optimizes your macro split based on your goal selection.",
  },
];

export default function SEOContent() {
  return (
    <div style={{ marginTop: 32 }}>
      {/* Methodology */}
      <section className="m3-card p-5">
        <h2 className="text-lg font-semibold text-on-surface">
          How Our Calculators Work
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
          This free calculator suite uses peer-reviewed formulas trusted by dietitians and fitness professionals worldwide. All calculations run instantly in your browser — no data is stored or sent to any server.
        </p>
        <div className="mt-4 space-y-4">
          {METHODS.map((m) => (
            <div key={m.title}>
              <h3 className="text-sm font-semibold text-on-surface">{m.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="m3-card p-5" style={{ marginTop: 20 }}>
        <h2 className="text-lg font-semibold text-on-surface">
          Frequently Asked Questions
        </h2>
        <div className="mt-4 space-y-5">
          {FAQS.map((f) => (
            <div key={f.q}>
              <h3 className="text-sm font-semibold text-on-surface">{f.q}</h3>
              <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
