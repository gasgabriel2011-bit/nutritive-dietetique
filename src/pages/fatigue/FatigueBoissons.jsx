import PlanGate from '../../components/PlanGate';
import PlanBoissons from '../../components/plans/PlanBoissons';
import { FATIGUE_DRINKS } from '../../lib/antiFatigueData';
export default function FatigueBoissons() {
  return <PlanGate><PlanBoissons drinks={FATIGUE_DRINKS} backTo="/plans/anti-fatigue" /></PlanGate>;
}