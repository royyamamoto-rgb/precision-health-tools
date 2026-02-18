import { ACTIVITY, GOALS } from "../../lib/calculators";
import GlassCard from "../ui/GlassCard";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";

export default function UserInputForm({
  sex, setSex, age, setAge, heightCm, setHeightCm, weightKg, setWeightKg,
  activityKey, setActivityKey, goalKey, setGoalKey,
  proteinMode, setProteinMode, gPerKg, setGPerKg,
}) {
  return (
    <div className="animate-card-enter" style={{ animationDelay: "100ms" }}>
      <GlassCard>
        <h2 className="mb-5 text-base font-semibold text-on-surface">Your Profile</h2>

        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <SelectField
              label="Sex"
              value={sex}
              onChange={e => setSex(e.target.value)}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
            <InputField
              label="Age"
              type="number"
              value={age}
              onChange={e => setAge(Number(e.target.value))}
              min="10"
              max="100"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <InputField
              label="Height (cm)"
              type="number"
              value={heightCm}
              onChange={e => setHeightCm(Number(e.target.value))}
              min="120"
              max="230"
            />
            <InputField
              label="Weight (kg)"
              type="number"
              value={weightKg}
              onChange={e => setWeightKg(Number(e.target.value))}
              min="30"
              max="250"
              step="0.1"
            />
          </div>

          <div className="border-t border-outline-variant pt-4">
            <SelectField
              label="Activity Level"
              value={activityKey}
              onChange={e => setActivityKey(e.target.value)}
              options={ACTIVITY.map(a => ({ value: a.k, label: a.label }))}
            />
          </div>

          <SelectField
            label="Goal"
            value={goalKey}
            onChange={e => setGoalKey(e.target.value)}
            options={GOALS.map(g => ({ value: g.k, label: g.label }))}
          />

          <div className="border-t border-outline-variant pt-4">
            <SelectField
              label="Protein Mode"
              value={proteinMode}
              onChange={e => setProteinMode(e.target.value)}
              options={[
                { value: "gkg", label: "Grams per kg (Recommended)" },
                { value: "pct", label: "Percentage of calories" },
              ]}
            />
            {proteinMode === "gkg" && (
              <div className="mt-3">
                <InputField
                  label="Protein (g/kg)"
                  type="number"
                  value={gPerKg}
                  onChange={e => setGPerKg(Number(e.target.value))}
                  min="1.2"
                  max="2.6"
                  step="0.1"
                  helpText="Grams of protein per kg body weight (1.2 - 2.6)"
                />
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
