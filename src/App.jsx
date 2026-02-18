import { useHealthCalculator } from "./hooks/useHealthCalculator";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import QuickResults from "./components/sections/QuickResults";
import UserInputForm from "./components/sections/UserInputForm";
import MacrosDisplay from "./components/sections/MacrosDisplay";
import WeeklyProgress from "./components/sections/WeeklyProgress";
import WeightTimeline from "./components/sections/WeightTimeline";
import SEOContent from "./components/sections/SEOContent";
import AdSlot from "./components/ui/AdSlot";
import AmazonAffiliate from "./components/ui/AmazonAffiliate";

export default function App() {
  const calc = useHealthCalculator();

  return (
    <>
      <Header />

      <main>
        <QuickResults
          bmi={calc.bmi}
          bmiCat={calc.bmiCat}
          bmr={calc.bmr}
          tdee={calc.tdee}
          goalCalories={calc.goalCalories}
        />

        <AdSlot slot="1234567890" className="app-section" />

        <div className="app-grid">
          <div className="app-col">
            <UserInputForm
              sex={calc.sex} setSex={calc.setSex}
              age={calc.age} setAge={calc.setAge}
              heightCm={calc.heightCm} setHeightCm={calc.setHeightCm}
              weightKg={calc.weightKg} setWeightKg={calc.setWeightKg}
              activityKey={calc.activityKey} setActivityKey={calc.setActivityKey}
              goalKey={calc.goalKey} setGoalKey={calc.setGoalKey}
              proteinMode={calc.proteinMode} setProteinMode={calc.setProteinMode}
              gPerKg={calc.gPerKg} setGPerKg={calc.setGPerKg}
            />
            <AmazonAffiliate />
          </div>

          <div className="app-col">
            <MacrosDisplay macros={calc.macros} goalCalories={calc.goalCalories} />
            <WeeklyProgress weeklyDelta={calc.weeklyDelta} />
            <WeightTimeline
              weeks={calc.weeks}
              timelinePounds={calc.timelinePounds}
              setTimelinePounds={calc.setTimelinePounds}
            />
            <AdSlot slot="9876543210" />
          </div>
        </div>

        <SEOContent />
      </main>

      <Footer />
    </>
  );
}
