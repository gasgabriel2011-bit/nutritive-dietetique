import PlanGate from '../../components/PlanGate';
import PlanSport from '../../components/plans/PlanSport';
import { FATIGUE_SPORT } from '../../lib/antiFatigueData';
export default function FatigueSport() {
  return <PlanGate><PlanSport tips={FATIGUE_SPORT} backTo="/plans/anti-fatigue" title="Activité & récupération" /></PlanGate>;
}