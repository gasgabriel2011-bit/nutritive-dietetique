import PlanGate from '../../components/PlanGate';
import PlanWeeks from '../../components/plans/PlanWeeks';
import { FATIGUE_WEEKS } from '../../lib/antiFatigueData';
export default function FatigueWeeks() {
  return <PlanGate><PlanWeeks weeks={FATIGUE_WEEKS} backTo="/plans/anti-fatigue" title="4 semaines anti-fatigue" /></PlanGate>;
}