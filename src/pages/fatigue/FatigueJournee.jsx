import PlanGate from '../../components/PlanGate';
import PlanJournee from '../../components/plans/PlanJournee';
import { FATIGUE_DAY } from '../../lib/antiFatigueData';
export default function FatigueJournee() {
  return <PlanGate><PlanJournee day={FATIGUE_DAY} backTo="/plans/anti-fatigue" /></PlanGate>;
}